const mongoose = require("mongoose");
const Joi = require("joi");
const { fileValidator, fileSchema } = require("./file");

// Joi
const tutorialStepValidator = Joi.object({
	position: Joi.number().positive().required(),
	title: Joi.string().min(3).max(255).required(),
	description: Joi.string().min(3).max(255),
	video: fileValidator,
	haveWatched: Joi.array().items(Joi.string()),
});

// Mongoose
const tutorialStepSchema = new mongoose.Schema({
	creationDate: { type: Date, default: Date.now },
	position: { type: Number, min: 1, required: true },
	title: { type: String, minlength: 3, maxlength: 255, required: true },
	description: { type: String, maxlength: 255 },
	video: { type: fileSchema, required: true },
	haveWatched: { type: [mongoose.Types.ObjectId], default: [] },
});

module.exports = {
	tutorialStepSchema,
	tutorialStepValidator,
};
