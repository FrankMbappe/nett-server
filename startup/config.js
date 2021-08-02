const dotenv = require("dotenv").config();
const config = require("config");

module.exports = function () {
    if (
        (!dotenv.error && !config.get("jwtPrivateKey")) ||
        !config.get("twilioAccountSid") ||
        !config.get("twilioAuthToken") ||
        !config.get("twilioServiceId") ||
        !config.get("cloudinaryCloudName") ||
        !config.get("cloudinaryApiKey") ||
        !config.get("cloudinaryApiSecret")
    ) {
        throw new Error(
            "FATAL ERROR: Some of the required the environment variables are not set."
        );
    }
};
