const mongoose = require("mongoose");
const config = require("config");
const jwt = require("jsonwebtoken");
const {
	userValidator,
	userTypeValidator,
	userSchema,
} = require("./validators/user");
const { startCase } = require("lodash");

// Input validation
function validate(user) {
	return userValidator.validate(user);
}
function validateUserType(userType) {
	return userTypeValidator.validate(userType);
}

// Adds the token generation directly to the User object
userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign(
		{
			_id: this._id,
			_type: this._type,
			phone: this.phone,
			profile: {
				firstName: this.firstName,
				lastName: this.lastName,
				fullName: startCase(
					`${this.honorific ?? ""} ${this.firstName} ${this.lastName}`.trim()
				),
				picUri: this.picUri,
				birthDate: this.birthDate,
			},
		},
		config.get("jwtPrivateKey")
	);
	return token;
};

const User = mongoose.model("User", userSchema);

module.exports = { User, validate, validateUserType };
