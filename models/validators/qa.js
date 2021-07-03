const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
	id: { type: Number, required: true },
	value: { type: String, maxlength: 255, required: true },
});
const qaSchema = new mongoose.Schema({
	position: { type: Number, min: 1, required: true },
	topic: { type: String, minlength: 3, maxlength: 255 },
	question: { type: String, minlength: 3, maxlength: 255, required: true },
	answers: { type: [answerSchema], required: true },
	rightAnswers: { type: [Number], required: true },
	timer: { type: Number, min: 5 },
});

module.exports = { qaSchema, answerSchema };
