const mongoose = require("mongoose");
const Joi = require("joi");
const classroomSchema = require("./schemas/classroom");
const { userTypes } = require("../config/nett");

// Input validation
function validate(classroom) {
	const participation = Joi.object({
		user: Joi.objectId().required(),
		role: Joi.string()
			.valid(...Object.values(userTypes).filter((t) => t != userTypes.teacher))
			.required(),
	});
	const schema = Joi.object({
		name: Joi.string().min(3).max(255).required(),
		description: Joi.string().max(255),
		teacher: Joi.objectId().required(),
		participations: Joi.array().items(participation),
		posts: Joi.array(),
		topics: Joi.array(),
	});
	return schema.validate(classroom);
}

const Classroom = mongoose.model("Classroom", classroomSchema);

module.exports = { Classroom, validate };
