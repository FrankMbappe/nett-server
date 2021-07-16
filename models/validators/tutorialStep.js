const mongoose = require("mongoose");
const Joi = require("joi");

// Joi
const tutorialStepValidator = Joi.object({
	position: Joi.number().required(),
	title: Joi.string().min(1).max(255).required(),
	description: Joi.string().max(255),
	videoUri: Joi.string(),
	videoCloudPublicId: Joi.string(),
	haveWatched: Joi.array().items(Joi.objectId()),
});

// Mongoose
const tutorialStepSchema = new mongoose.Schema({
	creationDate: { type: Date, default: Date.now },
	position: { type: Number, required: true },
	title: { type: String, minlength: 1, maxlength: 255, required: true },
	description: { type: String, maxlength: 255 },
	videoUri: { type: String, required: true },
	videoCloudPublicId: String,
	haveWatched: { type: [mongoose.Types.ObjectId], default: [] },
});

module.exports = {
	tutorialStepSchema,
	tutorialStepValidator,
};
