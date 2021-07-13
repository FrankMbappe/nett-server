const mongoose = require("mongoose");
const Joi = require("joi");
const { postSchema, postValidator } = require("./post");
const { tutorialStepSchema, tutorialStepValidator } = require("./tutorialStep");

// Joi
// Inheriting from Joi postValidator schema as a tutorial is a kind of post.
const tutorialValidator = postValidator.keys({
	title: Joi.string().min(1).max(255).required(),
	description: Joi.string().max(255),
	steps: Joi.array().items(tutorialStepValidator).min(2),
});

// Mongoose
// Inheriting from Mongoose postSchema as well.
const tutorialSchema = new mongoose.Schema({
	...postSchema.obj,
	title: { type: String, minlength: 1, maxlength: 255, required: true },
	description: { type: String, maxlength: 255 },
	steps: { type: [tutorialStepSchema], required: true },
});

module.exports = { tutorialSchema, tutorialValidator };
