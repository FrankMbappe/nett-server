const mongoose = require("mongoose");
const Joi = require("joi");
const { refs } = require("../../config/nett");
const {
	participationValidator,
	participationSchema,
} = require("./participation");
const { postValidator, postSchema } = require("./post");
const { topicValidator, topicSchema } = require("./topic");
const { tutorialValidator, tutorialSchema } = require("./tutorial");
const { quizValidator, quizSchema } = require("./quiz");

// Joi
const classroomValidator = Joi.object({
	name: Joi.string().min(3).max(255).required(),
	description: Joi.string().max(255),
	teacher: Joi.objectId().required(),
	participations: Joi.array().items(participationValidator),
	posts: Joi.array().items(postValidator),
	posts: Joi.array().items(postValidator),
	quizzes: Joi.array().items(quizValidator),
	tutorials: Joi.array().items(tutorialValidator),
	topics: Joi.array().items(topicValidator),
});

// Mongoose
const classroomSchema = new mongoose.Schema({
	name: {
		type: String,
		minlength: 3,
		maxlength: 255,
		trim: true,
		required: true,
	},
	description: {
		type: String,
		maxlength: 255,
		trim: true,
	},
	teacher: { type: mongoose.Types.ObjectId, ref: refs.user },
	participations: { type: [participationSchema], default: [] },
	posts: { type: [postSchema], default: [] },
	quizzes: { type: [quizSchema], default: [] },
	tutorials: { type: [tutorialSchema], default: [] },
	topics: { type: [topicSchema], default: [] },
});

module.exports = { classroomValidator, classroomSchema };
