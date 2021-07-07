const mongoose = require("mongoose");
const { fileSchema, fileValidator } = require("./validators/file");

// Input validation
function validate(file) {
	return fileValidator.validate(file);
}

const File = mongoose.model("File", fileSchema);

module.exports = { File, validate };
