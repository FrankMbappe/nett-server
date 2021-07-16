const { MAX_FILE_SIZE } = require("../config/nett");
const path = require("path");
const multer = require("multer");

// Storage
const fileStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		const base = "uploads";
		console.log(file);
		if (String(file.mimetype).includes("image"))
			return cb(null, base + "/images/");
		if (String(file.mimetype).includes("video"))
			return cb(null, base + "/videos/");
		cb(null, base + "/documents/");
	},
	filename: function (req, file, cb) {
		const fileName =
			req.user._id +
			"_" +
			new Date().getTime() +
			path.extname(file.originalname);
		cb(null, fileName);
	},
});

// Object which will serve as a middleware
const upload = multer({
	storage: fileStorage,
	fileFilter: (req, file, cb) => {
		if (file.mimetype.includes("image") || file.mimetype.includes("video"))
			return cb(null, true);
		return cb(null, false);
	},
	limits: { fileSize: MAX_FILE_SIZE },
});

// Formatting a file before adding it to the DB
const formatFile = (file) => {
	if (!file) return null;
	return {
		mimetype: file.mimetype,
		uri: file.path,
		name: file.originalname,
		size: file.size,
		extension: path.extname(file.originalname),
	};
};

module.exports = { upload, formatFile };
