const mongoose = require("mongoose");
const Joi = require("joi");
const { refs, postTypes } = require("../../config/nett");
const { commentValidator, commentSchema } = require("./comment");
const { fileValidator, fileSchema } = require("./file");
const { likeValidator, likeSchema } = require("./like");
const { topicValidator, topicSchema } = require("./topic");

// Joi
const postValidator = Joi.object({
	author: Joi.objectId().required(),
	_type: Joi.string()
		.valid(...Object.values(postTypes))
		.required(),
	text: Joi.string().max(3000).when("file", {
		is: null,
		then: Joi.string().required(),
	}),
	likes: Joi.array().items(likeValidator),
	comments: Joi.array().items(commentValidator),
	file: fileValidator,
	topics: Joi.array().items(topicValidator),
	haveSeen: Joi.array().items(Joi.objectId()),
});

// Mongoose
const postSchema = new mongoose.Schema({
	creationDate: { type: Date, default: Date.now },
	author: { type: mongoose.Types.ObjectId, ref: refs.user, required: true },
	_type: {
		type: String,
		enum: Object.values(postTypes),
		default: postTypes.normal,
	},
	text: { type: String, maxlength: 3000 },
	likes: { type: [likeSchema], default: [] },
	comments: { type: [commentSchema], default: [] },
	file: fileSchema,
	topics: { type: [topicSchema], default: [] },
	haveSeen: { type: [mongoose.Types.ObjectId], ref: refs.user, default: [] },
});

module.exports = { postValidator, postSchema };
