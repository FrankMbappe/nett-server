const mongoose = require("mongoose");
const {
	classroom: validator,
	classroomSchema,
} = require("./validators/classroom");

// Input validation
function validate(classroom) {
	return validator.validate(classroom);
}

const Classroom = mongoose.model("Classroom", classroomSchema);

module.exports = { Classroom, validate };
