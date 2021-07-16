const multer = require("multer");
const path  = require("path");

// Multer for cloudinary config
module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => cb(null, true),
})