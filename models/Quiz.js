const mongoose = require("mongoose");
const { quizSchema, quizValidator } = require("./validators/quiz");

// Input validation
function validate(quiz) {
	return quizValidator.validate(quiz);
}

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = { Quiz, validate };
