const express = require("express"); // Server
const debug = require("debug")("ns:routes::users"); // Debugger
const router = express.Router(); // Instead of creating a new server
const { User } = require("../models/User"); // Validating input
const Joi = require("joi");

router.post("/", async (req, res) => {
	// Input validation
	const { error } = validate(req.body);

	if (error) return res.status(400).send(error.details[0].message);

	const user = await User.findOne({ phone: req.body.phone });
	if (!user)
		return res
			.status(400)
			.send(`No user with the phone number '${req.body.phone}'`);

	const token = user.generateAuthToken();

	res.send(token);
});

// Custom validation
function validate(req) {
	const schema = Joi.object({
		phone: Joi.string().min(5).max(255).required(),
	});
	return schema.validate(req);
}

module.exports = router;
