const mongoose = require("mongoose");
const Joi = require("joi");
const { refs } = require("../../config/nett");
const { likeValidator, likeSchema } = require("./like");

// Joi
const commentValidator = Joi.object({
	author: Joi.objectId().required(),
	text: Joi.string().min(1).max(500).required(),
	likes: Joi.array().items(likeValidator),
});

// Mongoose
const commentSchema = new mongoose.Schema({
	creationDate: { type: Date, default: Date.now },
	author: { type: mongoose.Types.ObjectId, ref: refs.user },
	text: { type: String, maxlength: 3000, required: true },
	likes: { type: [likeSchema], default: [] },
});

module.exports = { commentValidator, commentSchema };
