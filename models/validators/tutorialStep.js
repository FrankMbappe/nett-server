const mongoose = require("mongoose");
const Joi = require("joi");

// Joi
const tutorialStepVideoValidator = Joi.object({
	mimetype: Joi.string(),
	uri: Joi.string().required(),
	duration: Joi.number().positive(),
});
const tutorialStepValidator = Joi.object({
	position: Joi.number().positive().required(),
	title: Joi.string().min(3).max(255).required(),
	description: Joi.string().min(3).max(255),
	video: tutorialStepVideoValidator,
	haveWatched: Joi.array().items(Joi.string()),
});

// Mongoose
const tutorialStepVideoSchema = new mongoose.Schema({
	mimetype: String,
	uri: { type: String, required: true },
	duration: { type: Number, min: 1, required: true },
});
const tutorialStepSchema = new mongoose.Schema({
	creationDate: { type: Date, default: Date.now },
	position: { type: Number, min: 1, required: true },
	title: { type: String, minlength: 3, maxlength: 255, required: true },
	description: { type: String, maxlength: 255 },
	video: { type: tutorialStepVideoSchema, required: true },
	haveWatched: { type: [mongoose.Types.ObjectId], default: [] },
});

module.exports = {
	tutorialStepSchema,
	tutorialStepVideoSchema,
	tutorialStepValidator,
	tutorialStepVideoValidator,
};
