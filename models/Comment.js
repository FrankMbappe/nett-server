const mongoose = require("mongoose");
const { commentSchema, commentValidator } = require("./validators/comment");

// Input validation
function validate(comment) {
	return commentValidator.validate(comment);
}

const Comment = mongoose.model("Comment", commentSchema);

module.exports = { Comment, validate };
