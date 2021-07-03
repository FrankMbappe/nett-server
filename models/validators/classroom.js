const mongoose = require("mongoose");
const Joi = require("joi");
const { refs } = require("../../config/nett");
const { participation, participationSchema } = require("./participation");
const { post, postSchema } = require("./post");
const { topic, topicSchema } = require("./topic");

// Joi
const classroom = Joi.object({
	name: Joi.string().min(3).max(255).required(),
	description: Joi.string().max(255),
	teacher: Joi.objectId().required(),
	participations: Joi.array().items(participation),
	posts: Joi.array().items(post),
	topics: Joi.array().items(topic),
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
		minlength: 3,
		maxlength: 255,
		trim: true,
	},
	teacher: { type: mongoose.Types.ObjectId, ref: refs.user },
	participations: { type: [participationSchema], default: [] },
	posts: { type: [postSchema], default: [] },
	topics: { type: [topicSchema], default: [] },
});

module.exports = { classroom, classroomSchema };
