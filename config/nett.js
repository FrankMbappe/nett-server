const mongoUri = "mongodb://localhost";

const refs = {
	user: "User",
	classroom: "Classroom",
	post: "Post",
};

const patterns = {
	email:
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
};

const userTypes = {
	teacher: "teacher",
	student: "student",
	consultant: "consultant",
};

module.exports = { mongoUri, refs, patterns, userTypes };
