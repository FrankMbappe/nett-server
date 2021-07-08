const mongoose = require("mongoose");
const {
	tutorialStepSchema,
	tutorialStepValidator,
} = require("./validators/tutorialStep");

// Input validation
function validate(tutorialStep) {
	return tutorialStepValidator.validate(tutorialStep);
}

const TutorialStep = mongoose.model("TutorialStep", tutorialStepSchema);

module.exports = { TutorialStep, validate };
