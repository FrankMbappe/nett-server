/* Nett-Server configurations */

/* DATABASE REFERENCES */
const refs = {
	user: "User",
	classroom: "Classroom",
	post: "Post",
};

/* USER CONFIGS */
const userTypes = {
	teacher: "teacher",
	student: "student",
	consultant: "consultant",
};
const userGenders = {
	female: "female",
	male: "male",
	other: "other",
};

/* POST CONFIGS */
const postTypes = {
	normal: "normal",
	tutorial: "tutorial",
	quiz: "quiz",
};

/* FILE CONFIGS */
const fileTypes = {
	image: "image",
	video: "video",
	other: "other",
};
const MAX_FILE_SIZE = 5e8;

module.exports = {
	refs,
	userTypes,
	postTypes,
	userGenders,
	fileTypes,
	MAX_FILE_SIZE,
};
