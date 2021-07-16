const express = require("express"); // Server
const config = require("config"); // Config
const router = express.Router(); // Instead of creating a new server
const Joi = require("joi");

const { User } = require("../models/User"); // Validating input
const { userTypes } = require("../config/nett");

// Phone number API
const client = require("twilio")(
	config.get("twilioAccountSid"),
	config.get("twilioAuthToken")
);

// Phone number verification
router.get("/", async (req, res) => {
	// Input validation
	const { error } = validate(req.query);
	if (error) return res.status(400).send(error.details[0].message);

	/* We proceed to phone number verification */
	await client.verify
		.services(config.get("twilioServiceId"))
		.verifications.create({ to: req.query.phone, channel: "sms" })
		.then(({ to, channel, status }) => res.send({ to, channel, status }))
		.catch((err) => res.status(400).send(err));
});

// Phone number confirmation
router.get("/confirm", async (req, res) => {
	// Input validation
	const { error } = validate(req.query);
	if (error) return res.status(400).send(error.details[0].message);

	/* We proceed to phone number confirmation */
	await client.verify
		.services(config.get("twilioServiceId"))
		.verificationChecks.create({ to: req.query.phone, code: req.query.code })
		.then(async ({ dateCreated, status, to }) => {
			/* We define the shape of the response */
			const twilioRes = {
				createdOn: dateCreated.toDateString(),
				isApproved: status === "approved",
				phone: to,
			};

			/* If request has not been approved (ex: Wrong code), we directly exit */
			if (!twilioRes.isApproved) return res.status(400).send(twilioRes);

			/* We check if a user already exists with this phone number */
			const user = await User.findOne({ phone: twilioRes.phone });

			if (!user) {
				/* If there's no such user, we create a new one */
				const newUser = new User({
					_type: userTypes.student,
					phone: twilioRes.phone,
				});
				await newUser.save();

				/* Then we generate a token accordingly */
				const token = newUser.generateAuthToken();

				/* Finally, we send the final response to the client */
				return res.send({
					res: twilioRes,
					authToken: token,
					isNew: true,
				});
			} else {
				/* If the user actually exists, we generate the token */
				const token = user.generateAuthToken();

				/* Finally, we send the final response to the client */
				return res.send({
					res: twilioRes,
					authToken: token,
					isNew: false,
				});
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(400).send(err);
		});
});

// Validation
function validate(req) {
	const schema = Joi.object({
		phone: Joi.string().min(5).max(255).required(),
		code: Joi.string().min(4).max(255),
	});
	return schema.validate(req);
}

module.exports = router;
