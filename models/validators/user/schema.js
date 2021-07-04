const mongoose = require("mongoose");
const config = require("config");
const debug = require("debug")("ns:validators::user");
const { refs, userTypes, userGenders } = require("../../../config/nett");

// PHONE NUMBER API
const client = require("twilio")(
	config.get("twilioAccountSid"),
	config.get("twilioAuthToken")
);

//* PROPERTIES
//@ Basic user properties
const basicProps = {
	creationDate: { type: Date, default: Date.now },
	phone: {
		type: String,
		required: true,
		trim: true,
		unique: true,
		validate: {
			validator: (value) =>
				/* Checking if the phone number is valid, using Twilio Lookup API */
				client.lookups.v1
					.phoneNumbers(value)
					.fetch({ type: ["carrier"] })
					.then((phone_number) =>
						Promise.resolve(phone_number.countryCode != null)
					)
					.catch((error) => {
						debug(error);
						return Promise.reject(
							new Error(`The input '${value}' is not a valid phone number`)
						);
					}),
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
	profile: {
		type: {
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
			birthDate: Date,
			email: { type: String, unique: true },
			gender: {
				type: String,
				required: true,
				enum: Object.values(userGenders),
				lowercase: true,
			},
			picUri: String,
		},
		pocket: {
			posts: [{ type: mongoose.Types.ObjectId, ref: refs.post }],
			// TODO: notes: [],
		},
		required: false,
	},
};
//@ Student
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
//@ Consultant
const consultantProps = {
	company: String,
	proPhone: {
		type: String,
		trim: true,
		validate: {
			validator: (value) =>
				/* Checking if the phone number is valid, using Twilio Lookup API */
				client.lookups.v1
					.phoneNumbers(value)
					.fetch({ type: ["carrier"] })
					.then((phone_number) =>
						Promise.resolve(phone_number.countryCode != null)
					)
					.catch((error) => {
						debug(error);
						return Promise.reject(
							new Error(`The input '${value}' is not a valid phone number`)
						);
					}),
		},
	},
	proEmail: { type: String },
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
//@ Teacher
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

//* SCHEMA
const userSchema = new mongoose.Schema({
	...basicProps,
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

module.exports = userSchema;
