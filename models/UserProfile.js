const mongoose = require("mongoose");
const {
	userProfileSchema,
	userProfileValidator,
} = require("./validators/userProfile");

// Input validation
function validate(userProfile) {
	return userProfileValidator.validate(userProfile);
}

const UserProfile = mongoose.model("UserProfile", userProfileSchema);

module.exports = { UserProfile, validate };
