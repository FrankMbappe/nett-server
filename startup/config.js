const config = require("config");

module.exports = function () {
	if (
		!config.get("jwtPrivateKey") ||
		!config.get("twilioAccountSid") ||
		!config.get("twilioAuthToken") ||
		!config.get("awsAccessKeyId") ||
		!config.get("awsBucketName") ||
		!config.get("awsBucketRegion") ||
		!config.get("awsSecretAccessKey")
	) {
		throw new Error(
			"FATAL ERROR: Some of the required the environment variables are not set."
		);
	}
};
