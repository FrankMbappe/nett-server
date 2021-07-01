const mongoose = require("mongoose");
const { refs } = require("../../config/nett");
const participationSchema = require("./participation");
const postSchema = require("./post");

const classroomSchema = new mongoose.Schema({
	name: {
		type: String,
		minlength: 3,
		maxlength: 255,
		trim: true,
		required: true,
	},
	description: {
		type: String,
		minlength: 3,
		maxlength: 255,
		trim: true,
	},
	teacher: { type: mongoose.Types.ObjectId, ref: refs.user },
	participations: { type: [participationSchema], default: [] },
	posts: { type: [postSchema], default: [] },
	topics: { type: [String], default: [] },
});

module.exports = classroomSchema;
