const mongoose = require("mongoose");
const Joi = require("joi");

// Joi
const topicValidator = Joi.object({
	name: Joi.string().min(3).max(255).required(),
});

// Mongoose
const topicSchema = new mongoose.Schema({
	name: { type: String, minlength: 3, maxlength: 500, required: true },
});

module.exports = { topicValidator, topicSchema };
