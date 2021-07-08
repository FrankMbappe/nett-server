const Joi = require("joi");
const { userTypes } = require("../../../config/nett");
const { userProfileValidator } = require("../userProfile");

const user = Joi.object({
	_type: Joi.string()
		.valid(...Object.values(userTypes))
		.required(),
	phone: Joi.string().min(5).max(255).required(),
	classrooms: Joi.array().items(Joi.objectId().required()),
	profile: userProfileValidator,

	// Student
	studentProps: Joi.object({
		field: Joi.string().min(3).max(255).required(),
	}).when("_type", {
		is: userTypes.student,
		then: Joi.required(),
	}),

	// Consultant
	consultantProps: Joi.object({
		company: Joi.string(),
		proPhone: Joi.string().max(255),
		proEmail: Joi.string().email(),
		mainDomain: Joi.string().min(3).max(255).required(),
		additDomains: Joi.array().items(Joi.string().min(3).max(255)),
		yearsOfExperience: Joi.number().positive().max(100).required(),
	}).when("_type", {
		is: userTypes.consultant,
		then: Joi.required(),
	}),

	// Teacher
	teacherProps: Joi.object({
		lectures: Joi.array().required(),
	}).when("_type", {
		is: userTypes.teacher,
		then: Joi.required(),
	}),
});

module.exports = user;
