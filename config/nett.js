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
const userHonorifics = {
	dr: "Dr.",
	professor: "Professor",
	mr: "Mr.",
	mrs: "Mrs.",
	miss: "Miss",
	ms: "Ms.",
};

/* POST CONFIGS */
const postTypes = {
	normal: "normal",
	tutorial: "tutorial",
	quiz: "quiz",
};
const eventStatuses = {
	pending: "pending",
	opened: "opened",
	closed: "closed",
};

/* FILE CONFIGS */
const MAX_FILE_SIZE = 1e8;

module.exports = {
	refs,
	userTypes,
	userGenders,
	userHonorifics,
	postTypes,
	eventStatuses,
	MAX_FILE_SIZE,
};
