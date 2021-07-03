const mongoose = require("mongoose");
const {
	classroomValidator,
	classroomSchema,
} = require("./validators/classroom");

// Input validation
function validate(classroom) {
	return classroomValidator.validate(classroom);
}

const Classroom = mongoose.model("Classroom", classroomSchema);

module.exports = { Classroom, validate };
