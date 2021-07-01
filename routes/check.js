const express = require("express");
const { User } = require("../models/User");
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
		.then(async ({ countryCode, phoneNumber, nationalFormat }) => {
			try {
				const phoneNumberExists =
					(await User.findOne({
						phone: phoneNumber,
					}).countDocuments()) > 0;

				res.send({
					countryCode,
					phoneNumber,
					nationalFormat,
					phoneNumberExists,
				});
			} catch (error) {
				debug(error);
				return res
					.status(500)
					.send(
						`An internal error occured while verifying if '${req.params.phone}' already exists.`
					);
			}
		})
		.catch((error) => {
			debug(error);
			return res
				.status(404)
				.send(`'${req.params.phone}' does not match any valid phone number.`);
		});
});

module.exports = router;
