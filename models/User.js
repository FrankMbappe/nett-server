const mongoose = require("mongoose");
const { refs, patterns, userTypes } = require("../config/nett");
const Schema = mongoose.Schema;
const debug = require("debug")("ns:models"); // Debugging models

// Twilio API config
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

// Attributes
const userProps = {
	creationDate: { type: Date, default: Date.now },
	phone: {
		type: String,
		required: true,
		trim: true,
		validator: {
			isAsync: true,
			validate: function (value, callback) {
				/* Checking if the phone number is valid, using Twilio Lookup API */
				client.lookups.v1
					.phoneNumbers(value)
					.fetch({ type: ["carrier"] })
					.then((phone_number) => callback(phone_number.countryCode != null))
					.catch((error) => {
						debug(error);
						callback(false);
					});
			},
		},
	},
	_type: {
		type: String,
		required: true,
		enum: Object.values(userTypes),
		lowercase: true,
		trim: true,
	},
	classrooms: [{ type: mongoose.Types.ObjectId, ref: refs.classroom }],
	// lastTimeConnected: Date,
	profile: {
		nomination: {
			type: String,
			enum: ["Dr", "Mr", "Mrs", "Miss"],
			lowercase: true,
		},
		firstName: {
			type: String,
			required: true,
			minlength: 1,
			maxlength: 255,
			lowercase: true,
			trim: true,
		},
		lastName: {
			type: String,
			required: true,
			minlength: 1,
			maxlength: 255,
			lowercase: true,
			trim: true,
		},
		birthday: Date,
		email: { type: String, matches: patterns.email },
		gender: {
			type: String,
			required: true,
			enum: ["female", "male", "other"],
			lowercase: true,
		},
		picUri: String,
	},
	pocket: {
		posts: [{ type: mongoose.Types.ObjectId, ref: refs.post }],
		// TODO: notes: [],
	},
};
const studentProps = {
	field: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 255,
		trim: true,
	},
	// TODO: reportCard: [{ Results }]
};
const consultantProps = {
	company: String,
	proPhone: {
		type: String,
		trim: true,
		validator: {
			isAsync: true,
			validate: function (value, callback) {
				/* Checking if the phone number is valid, using Twilio Lookup API */
				client.lookups.v1
					.phoneNumbers(value)
					.fetch({ type: ["carrier"] })
					.then((phone_number) => callback(phone_number.countryCode != null))
					.catch((error) => {
						debug(error);
						callback(false);
					});
			},
		},
	},
	proEmail: { type: String, matches: patterns.email },
	mainDomain: {
		type: String,
		required: true,
		trim: true,
		minlength: 3,
		maxlength: 255,
	},
	additDomains: [
		{
			type: String,
			trim: true,
			minlength: 3,
			maxlength: 255,
		},
	],
	yearsOfExperience: { type: Number, default: 0 },
};
const teacherProps = {
	lectures: [
		{
			type: String,
			trim: true,
			minlength: 3,
			maxlength: 255,
		},
	],
	// TODO: schools or lecturesAt: []
};

// Schema
const userSchema = new Schema({
	...userProps,
	studentProps: {
		type: { ...studentProps },
		required: function () {
			return this._type === userTypes.student;
		},
	},
	consultantProps: {
		type: { ...consultantProps },
		required: function () {
			return this._type === userTypes.consultant;
		},
	},
	teacherProps: {
		type: { ...teacherProps },
		required: function () {
			return this._type === userTypes.teacher;
		},
	},
});

const User = mongoose.model("User", userSchema);

module.exports = User;
