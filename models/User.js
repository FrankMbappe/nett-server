const mongoose = require("mongoose");
const Joi = require("joi");
const userSchema = require("./schemas/user");
const { userTypes, userGenders } = require("../config/nett");

// Input validation
function validate(user) {
	const schema = Joi.object({
		_type: Joi.string()
			.valid(...Object.values(userTypes))
			.required(),
		phone: Joi.string().min(5).max(255).required(),
		classrooms: Joi.array(),
		profile: Joi.object({
			nomination: Joi.string().alphanum().max(25),
			firstName: Joi.string().alphanum().min(3).max(255).required(),
			lastName: Joi.string().alphanum().min(3).max(255).required(),
			birthDate: Joi.date().less("now"),
			email: Joi.string().email(),
			gender: Joi.string().valid(...Object.values(userGenders)),
			picUri: Joi.string().uri(),
		}),

		studentProps: Joi.object({
			field: Joi.string().min(3).max(255).alphanum().required(),
		}).when("_type", {
			is: userTypes.student,
			then: Joi.required(),
		}),

		consultantProps: Joi.object({
			company: Joi.string(),
			proPhone: Joi.string().alphanum().max(255),
			proEmail: Joi.string().email(),
			mainDomain: Joi.string().alphanum().min(3).max(255).required(),
			additDomains: Joi.array(),
			yearsOfExperience: Joi.number().positive().max(150).required(),
		}).when("_type", {
			is: userTypes.consultant,
			then: Joi.required(),
		}),

		teacherProps: Joi.object({
			lectures: Joi.array().required(),
		}).when("_type", {
			is: userTypes.teacher,
			then: Joi.required(),
		}),
	});
	return schema.validate(user);
}

const User = mongoose.model("User", userSchema);

module.exports = { User, validate };
