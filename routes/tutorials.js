const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth");
const { Tutorial, validate } = require("../models/Tutorial");
const { Classroom } = require("../models/Classroom");
const { upload } = require("../libs/multer"); // Save files

// Create
router.post("/", [auth, upload.array("steps[video]")], async (req, res) => {
	// Then validating the input
	const tutorialToCreate = {
		author: req.user._id,
		...req.body,
	};
	const { error } = validate(tutorialToCreate);
	if (error) {
		console.log(error);
		return res.status(400).send(error.details.map(({ message }) => message));
	}

	// Pushing quiz to classroom post list
	const tutorial = new Tutorial(tutorialToCreate);
	console.log(tutorial);
	await Classroom.findOneAndUpdate(
		{ _id: req.params.id },
		{ $push: { tutorials: tutorial } }
	);

	// Return OK
	res.send(tutorial);
});

module.exports = router;
