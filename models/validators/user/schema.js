const mongoose = require("mongoose");
const { refs, userTypes, userGenders } = require("../../../config/nett");
const { userProfileSchema } = require("../userProfile");

//* PROPERTIES
//@ Basic user properties
const basicProps = {
    creationDate: { type: Date, default: Date.now },
    phone: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    _type: {
        type: String,
        required: true,
        enum: Object.values(userTypes),
        lowercase: true,
        trim: true,
    },
    classrooms: [{ type: mongoose.Types.ObjectId, ref: refs.classroom }],
    profile: userProfileSchema,
};
//@ Student
const studentProps = {
    field: {
        type: String,
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
    },
    consultantProps: {
        type: { ...consultantProps },
    },
    teacherProps: {
        type: { ...teacherProps },
    },
});

module.exports = userSchema;
