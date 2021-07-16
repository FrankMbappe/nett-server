const mongoose = require("mongoose");
const Joi = require("joi");
const { MAX_FILE_SIZE } = require("../../config/nett");

// Joi
const fileValidator = Joi.object({
	mimetype: Joi.string().required(),
	uri: Joi.string().required(),
	name: Joi.string().max(255).required(),
	size: Joi.number().max(MAX_FILE_SIZE).required(),
	extension: Joi.string().required(),
	cloudPublicId: Joi.string(),
});

// Mongoose
const fileSchema = new mongoose.Schema({
	mimetype: { type: String, required: true },
	uri: { type: String, required: true },
	name: { type: String, maxlength: 255, required: true },
	size: { type: Number, max: MAX_FILE_SIZE, required: true },
	extension: { type: String, required: true },
	cloudPublicId: String,
});

module.exports = { fileValidator, fileSchema };
