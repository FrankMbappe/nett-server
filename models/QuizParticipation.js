const mongoose = require("mongoose");
const {
	quizParticipationSchema,
	quizParticipationValidator,
} = require("./validators/quiz");

// Input validation
function validate(quizParticipation) {
	return quizParticipationValidator.validate(quizParticipation);
}

const QuizParticipation = mongoose.model(
	"QuizParticipation",
	quizParticipationSchema
);

module.exports = { QuizParticipation, validate };
