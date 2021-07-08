const mongoose = require("mongoose");
const Joi = require("joi");
const { isBefore } = require("date-fns");
const { refs, eventStatuses } = require("../../config/nett");
const {
	qaSchema,
	answerSchema,
	qaValidator,
	answerValidator,
} = require("./qa");

// Joi
const quizSessionValidator = Joi.object({
	isCorrect: Joi.boolean().required(),
	submittedAnswers: Joi.array().items(answerValidator),
	remainingTime: Joi.number(),
});
const quizParticipationValidator = Joi.object({
	author: Joi.objectId().required(),
	quizSessions: Joi.array().items(quizSessionValidator),
});
const quizValidator = Joi.object({
	title: Joi.string().min(3).max(255).required(),
	status: Joi.string().valid(...Object.values(eventStatuses)),
	dateOpening: Joi.date().less(Joi.ref("dateClosing")),
	dateClosing: Joi.date(),
	qas: Joi.array().items(qaValidator).required(),
	participations: Joi.array().items(quizParticipationValidator),
	isDeterministic: Joi.boolean(),
});

// Mongoose
const quizSessionSchema = new mongoose.Schema({
	isCorrect: { type: Boolean, required: true, default: false },
	submittedAnswers: { type: [answerSchema], default: [] },
	remainingTime: Number,
});
const quizParticipationSchema = new mongoose.Schema({
	author: { type: mongoose.Types.ObjectId, ref: refs.user },
	quizSessions: { type: [quizSessionSchema], default: [] },
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

module.exports = {
	quizSchema,
	quizParticipationSchema,
	quizSessionSchema,
	quizValidator,
	quizParticipationValidator,
	quizSessionValidator,
};
