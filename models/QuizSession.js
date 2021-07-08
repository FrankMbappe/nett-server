const mongoose = require("mongoose");
const {
	quizSessionSchema,
	quizSessionValidator,
} = require("./validators/quiz");

// Input validation
function validate(quizSession) {
	return quizSessionValidator.validate(quizSession);
}

const QuizSession = mongoose.model("QuizSession", quizSessionSchema);

module.exports = { QuizSession, validate };
