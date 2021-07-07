const mongoose = require("mongoose");
const { postSchema, postValidator } = require("./validators/post");

// Input validation
function validate(post) {
	return postValidator.validate(post);
}

const Post = mongoose.model("Post", postSchema);

module.exports = { Post, validate };
