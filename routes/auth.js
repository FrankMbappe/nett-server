const express = require("express"); // Server
const debug = require("debug")("ns:routes::users"); // Debugger
const router = express.Router(); // Instead of creating a new server
const { User } = require("../models/User"); // Validating input
const Joi = require("joi");

//
// GETs
router.get("/", async (_, res) => {
	const users = await User.find().sort("creationDate");
	res.send(users);
});
router.get("/:id", async (req, res) => {
	User.findById(req.params.id, (err, user) => {
		if (err) return res.status(400).send(err.message);

		if (!user)
			return res
				.status(404)
				.send(`User with ID '${req.params.id}' does not exist.`);

		res.send(user);
	});
});

//
// POSTs
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

//
// PUTs
router.put("/:id", async (req, res) => {
	// If invalid, return 400 - Bad request
	const { error } = validate(req.body);

	if (error) return res.status(400).send(error.details[0].message);

	// Else, try to update
	const user = await User.findById(req.params.id);

	if (!user)
		return res
			.status(400)
			.send(`No existing user with the ID '${req.params.id}'.`);

	// Updating the user here
	User.findByIdAndUpdate(
		req.params.id,
		{ $set: req.body },
		{ new: true },
		(err, user, _) => {
			if (err) return res.status(500).send(err.message);

			debug(`A User has been updated: ${user}`);
			res.send(user);
		}
	);
});

//
// DELETEs
router.delete("/:id", async (req, res) => {
	const user = await User.findById(req.params.id);

	if (!user)
		return res
			.status(400)
			.send(`No existing user with the ID '${req.params.id}'.`);

	// Deleting the user here
	User.findByIdAndDelete(req.params.id, (err, user, _) => {
		if (err) return res.status(500).send(err.message);

		debug(`A User has been deleted: ${user}`);
		res.send(user);
	});
});

// Custom validation
function validate(req) {
	const schema = Joi.object({
		phone: Joi.string().min(5).max(255).required(),
	});
	return schema.validate(req);
}

module.exports = router;