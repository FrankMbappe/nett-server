const mongoose = require("mongoose");
const Joi = require("joi");
const { fileTypes, MAX_FILE_SIZE } = require("../../config/nett");

// Joi
const file = Joi.object({
	_type: Joi.string()
		.valid(...Object.values(fileTypes))
		.required(),
	uri: Joi.string().uri().required(),
	name: Joi.string().min(3).max(255).required(),
	size: Joi.number().positive().max(MAX_FILE_SIZE).required(),
	extension: Joi.string().required(),
});

// Mongoose
const fileSchema = new mongoose.Schema({
	_type: { type: String, enum: Object.values(fileTypes), required: true },
	uri: { type: String, required: true },
	name: { type: String, minlength: 3, maxlength: 255, required: true },
	size: { type: Number, max: MAX_FILE_SIZE, required: true },
	extension: { type: String, required: true },
});

module.exports = { file, fileSchema };
