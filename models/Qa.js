const mongoose = require("mongoose");
const { qaSchema, qaValidator } = require("./validators/qa");

// Input validation
function validate(qa) {
	return qaValidator.validate(qa);
}

const Qa = mongoose.model("Qa", qaSchema);

module.exports = { Qa, validate };
