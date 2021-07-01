const mongoose = require("mongoose");
const { refs, userTypes } = require("../../config/nett");

const participationSchema = new mongoose.Schema({
	joiningDate: { type: Date, default: Date.now },
	user: { type: mongoose.Types.ObjectId, ref: refs.user, required: true },
	role: {
		type: String,
		enum: {
			values: Object.values(userTypes).filter((t) => t != userTypes.teacher), // Any other type except Teacher
			message:
				"A classroom can only have one teacher. {VALUE} is not supported.",
		},
		required: true,
	},
});

module.exports = participationSchema;
