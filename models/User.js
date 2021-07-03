const mongoose = require("mongoose");
const { userValidator, userSchema } = require("./validators/user");

// Input validation
function validate(user) {
	return userValidator.validate(user);
}

const User = mongoose.model("User", userSchema);

module.exports = { User, validate };
