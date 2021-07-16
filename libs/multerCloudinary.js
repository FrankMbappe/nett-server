const multer = require("multer");
const path = require("path");

// Multer for cloudinary config
module.exports = multer({
	storage: multer.diskStorage({}),
	fileFilter: (req, file, cb) => {
		if (file.mimetype.includes("image") || file.mimetype.includes("video"))
			return cb(null, true);
		else return cb(null, false);
	},
});
