const { isBefore } = require("date-fns");
const mongoose = require("mongoose");
const { refs } = require("../../config/nett");
const { qaSchema, answerSchema } = require("./qa");

const sessionSchema = new mongoose.Schema({
	isCorrect: { type: Boolean, required: true },
	submittedAnswers: { type: [answerSchema], default: [] },
	remainingTime: Number,
});
const quizParticipationSchema = new mongoose.Schema({
	author: { type: mongoose.Types.ObjectId, ref: refs.user },
	sessions: { type: [sessionSchema], default: [] },
});
const quizSchema = new mongoose.Schema({
	creationDate: { type: Date, default: Date.now },
	title: { type: String, minlength: 3, maxlength: 255, required: true },
	dateOpening: Date,
	dateClosing: {
		type: Date,
		validator: {
			validate: function (value) {
				return this.dateOpening && isBefore(this.dateOpening, value);
			},
		},
	},
	qas: { type: [qaSchema], required: true },
	participations: { type: [quizParticipationSchema], default: [] },
	isDeterministic: { type: Boolean, default: false },
});

module.exports = quizSchema;
