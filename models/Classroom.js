const mongoose = require("mongoose");
const Joi = require("joi");
const classroomSchema = require("./schemas/classroom");

// Input validation
function validate(classroom) {
	const schema = Joi.object({
		name: Joi.string().min(3).max(255).required(),
		description: Joi.string().max(255),
		teacher: Joi.string().required(),
		participations: Joi.array(),
		posts: Joi.array(),
		topics: Joi.array(),
	});
	return schema.validate(classroom);
}

const Classroom = mongoose.model("Classroom", classroomSchema);

module.exports = { Classroom, validate };
