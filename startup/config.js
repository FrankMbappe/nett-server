const config = require("config");

module.exports = function () {
	if (
		!config.get("jwtPrivateKey") ||
		!config.get("twilioAccountSid") ||
		!config.get("twilioAuthToken")
	) {
		throw new Error(
			"FATAL ERROR: Some of the required the environment variables are not set."
		);
	}
};
