const mongoose = require("mongoose");
const Joi = require("Joi");

// Joi
const answerValidator = Joi.object({
	id: Joi.number().required(),
	value: Joi.string().min(1).max(255).required(),
});
const qaValidator = Joi.object({
	position: Joi.number().required(),
	topic: Joi.string().max(255),
	question: Joi.string().min(1).max(255).required(),
	answers: Joi.array().items(answerValidator).min(2).required(),
	rightAnswers: Joi.array().items(Joi.number()).required(),
	timer: Joi.number().min(10),
});

// Mongoose
const answerSchema = new mongoose.Schema({
	id: { type: Number, required: true },
	value: { type: String, maxlength: 255, required: true },
});
const qaSchema = new mongoose.Schema({
	position: { type: Number, required: true },
	topic: { type: String, minlength: 1, maxlength: 255 },
	question: { type: String, minlength: 1, maxlength: 255, required: true },
	answers: { type: [answerSchema], required: true },
	rightAnswers: { type: [Number], required: true },
	timer: { type: Number, min: 5 },
});

module.exports = { qaSchema, answerSchema, qaValidator, answerValidator };
