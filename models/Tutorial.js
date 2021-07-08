const mongoose = require("mongoose");
const { tutorialSchema, tutorialValidator } = require("./validators/tutorial");

// Input validation
function validate(tutorial) {
	return tutorialValidator.validate(tutorial);
}

const Tutorial = mongoose.model("Tutorial", tutorialSchema);

module.exports = { Tutorial, validate };
