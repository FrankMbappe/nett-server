const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth");
const { Tutorial, validate } = require("../models/Tutorial");
const { Classroom } = require("../models/Classroom");

//
// FILE STORAGE
const upload = require("../libs/multerCloudinary");
const cloudinary = require("../libs/cloudinary");

// Create
router.post("/", [auth, upload.array("videos", 10)], async (req, res) => {
	// If no files provided, exit
	if (!req.files) return res.status(400).send("No video files provided.");
	console.log(req.body);

	// Check if the tutorial is valid + Steps
	const tutorialToCreate = {
		author: req.user._id,
		...req.body,
	};
	const { error } = validate(tutorialToCreate);
	if (error) {
		console.log(error);
		return res.status(400).send(error.details.map(({ message }) => message));
	}

	// If everything is fine, I start uploading the videos
	const steps = req.body.steps;
	try {
		for (let i = 0; i < req.files.length; i++) {
			const file = req.files[i];

			// I upload the video
			const { secure_url, public_id } = await cloudinary.uploader.upload(
				file.path,
				{ resource_type: "video" }
			);
			// Then update the corresponding step
			steps[i] = {
				...steps[i],
				videoUri: secure_url,
				videoCloudPublicId: public_id,
			};
		}
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.send("Something went wrong while uploading the step videos.");
	}

	// Then I push the complete tutorial to classroom tutorial list
	const tutorial = new Tutorial({ ...tutorialToCreate, steps });
	console.log(tutorial);
	await Classroom.findOneAndUpdate(
		{ _id: req.params.id },
		{ $push: { tutorials: tutorial } }
	);

	// Return OK
	res.send(tutorial);
});

module.exports = router;
