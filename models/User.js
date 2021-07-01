const mongoose = require("mongoose");
const Joi = require("joi");
const userSchema = require("./schemas/user");
const { userTypes } = require("../config/nett");

// Input validation
function validate(user) {
	const schema = Joi.object({
		_type: Joi.string()
			.valid(...Object.values(userTypes))
			.required(),
		phone: Joi.string().min(5).max(255).required(),
	});
	return schema.validate(user);
}

const User = mongoose.model("User", userSchema);

module.exports = { User, validate };
