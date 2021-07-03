const mongoose = require("mongoose");
const Joi = require("joi");
const { refs } = require("../../config/nett");

// Joi
const likeValidator = Joi.object({
	author: Joi.objectId().required(),
});

// Mongoose
const likeSchema = new mongoose.Schema({
	creationDate: { type: Date, default: Date.now },
	author: { type: mongoose.Types.ObjectId, ref: refs.user },
});

module.exports = { likeValidator, likeSchema };
