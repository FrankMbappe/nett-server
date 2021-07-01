const express = require("express");
const debug = require("debug")("ns:routes::check");
const router = express.Router();

//* PHONE NUMBER API
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

//
// GET
router.get("/:phone", async (req, res) => {
	client.lookups.v1
		.phoneNumbers(req.params.phone)
		.fetch({ type: ["carrier"] })
		.then((phone_number) => res.send(phone_number))
		.catch((error) => {
			debug(error);
			res
				.status(404)
				.send(`'${req.params.phone}' does not match any valid phone number.`);
		});
});

module.exports = router;
