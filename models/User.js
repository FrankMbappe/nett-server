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
			...(this.profile && {
				profile: {
					firstName: this.profile.firstName,
					lastName: this.profile.lastName,
					fullName: startCase(
						`${this.profile.honorific ?? ""} ${this.profile.firstName} ${
							this.profile.lastName
						}`.trim()
					),
					picUri: this.profile.picUri,
					birthDate: this.profile.birthDate,
					gender: this.profile.gender,
				},
			}),
		},
		config.get("jwtPrivateKey")
	);
	return token;
};

const User = mongoose.model("User", userSchema);

module.exports = { User, validate, validateUserType };
