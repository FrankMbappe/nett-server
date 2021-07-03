const mongoose = require("mongoose");
const Joi = require("joi");
const { refs, postTypes } = require("../../config/nett");
const { comment, commentSchema } = require("./comment");
const { file, fileSchema } = require("./file");
const { like, likeSchema } = require("./like");
const { topic, topicSchema } = require("./topic");

// Joi
const post = Joi.object({
	author: Joi.objectId().required(),
	_type: Joi.string()
		.valid(...Object.values(postTypes))
		.required(),
	text: Joi.string().min(3).max(500),
	likes: Joi.array().items(like),
	comments: Joi.array().items(comment),
	file: Joi.array().items(file),
	topics: Joi.array().items(topic),
	haveSeen: Joi.array().items(Joi.objectId().required()),
});

// Mongoose
const postSchema = new mongoose.Schema({
	creationDate: { type: Date, default: Date.now },
	author: { type: mongoose.Types.ObjectId, ref: refs.user },
	_type: {
		type: String,
		enum: Object.values(postTypes),
		default: postTypes.normal,
	},
	text: { type: String, minlength: 5, maxlength: 500 },
	likes: { type: [likeSchema], default: [] },
	comments: { type: [commentSchema], default: [] },
	file: fileSchema,
	topics: { type: [topicSchema], default: [] },
	haveSeen: { type: [mongoose.Types.ObjectId], ref: refs.user, default: [] },
});

module.exports = { post, postSchema };
