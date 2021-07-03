const mongoose = require("mongoose");
const Joi = require("joi");
const { refs } = require("../../config/nett");
const { likeSchema, like } = require("./like");

// Joi
const comment = Joi.object({
	author: Joi.objectId().required(),
	text: Joi.string().min(3).max(500).required(),
	likes: Joi.array().items(like),
});

// Mongoose
const commentSchema = new mongoose.Schema({
	creationDate: { type: Date, default: Date.now },
	author: { type: mongoose.Types.ObjectId, ref: refs.user },
	text: { type: String, minlength: 5, maxlength: 3000, required: true },
	likes: { type: [likeSchema], default: [] },
});

module.exports = { comment, commentSchema };
