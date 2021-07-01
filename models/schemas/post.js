const mongoose = require("mongoose");
const { refs, postTypes } = require("../../config/nett");
const commentSchema = require("./comment");
const fileSchema = require("./file");
const likeSchema = require("./like");

const postSchema = new mongoose.Schema({
	creationDate: { type: Date, default: Date.now },
	author: { type: mongoose.Types.ObjectId, ref: refs.user },
	_type: {
		type: String,
		enum: Object.values(postTypes),
		default: postTypes.normal,
	},
	text: { type: String, minlength: 5, maxlength: 3000 },
	likes: { type: [likeSchema], default: [] },
	comments: { type: [commentSchema], default: [] },
	file: fileSchema,
	tags: { type: [String], default: [] },
	haveSeen: { type: [mongoose.Types.ObjectId], ref: refs.user, default: [] },
});

module.exports = postSchema;
