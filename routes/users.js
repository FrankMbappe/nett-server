const express = require("express"); // Server
const auth = require("../middleware/auth"); // Protecting the routes
const router = express.Router(); // Instead of creating a new server
const { User, validate, validateUserType } = require("../models/User"); // Validating input
const {
	UserProfile,
	validate: validateProfile,
} = require("../models/UserProfile"); // Validating input

//
// FILE STORAGE
const cloudinary = require("../libs/cloudinary");
const upload = require("../libs/multerCloudinary");

//
// GETs
router.get("/", async (_, res) => {
	const users = await User.find().sort("creationDate");
	res.send(users);
});
router.get("/:id", async (req, res) => {
	User.findById(req.params.id, (err, user) => {
		if (err) return res.status(400).send(err.message);

		if (!user)
			return res
				.status(404)
				.send(`User with ID '${req.params.id}' does not exist.`);

		res.send(user);
	});
});
router.get("/me", auth, async (req, res) => {
	const user = await User.findById(req.user._id);
	res.send(user);
});

//
// POSTs
router.post(
	"/me/profile",
	[auth, upload.single("picUri")],
	async (req, res) => {
		const user = await User.findById(req.user._id);

		// Checking if the profile includes a picture
		let picUri,
			picCloudPublicId = null;
		if (req.file) {
			// If it does I push it to cloudinary
			try {
				const { secure_url, public_id } = await cloudinary.uploader.upload(
					req.file.path
				);
				picUri = secure_url;
				picCloudPublicId = public_id;
			} catch (error) {
				console.log(error);
				return res
					.status(500)
					.send("Something went wrong while uploading your file.");
			}
		}

		// I define the shape of the profile
		const profileToSet = { ...req.body, picUri, picCloudPublicId };

		// If invalid, return 400 - Bad request
		const { error } = validateProfile(profileToSet);
		if (error) return res.status(400).send(error.details[0].message);

		// Success
		user.profile = new UserProfile(profileToSet);
		user.save();

		// I generate a new token
		const token = user.generateAuthToken();

		res.send({ user, token });
	}
);

//
// PUTs
router.put("/", auth, async (req, res) => {
	// If data is invalid, return 400 - Bad request
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// Otherwise, update
	User.findByIdAndUpdate(
		req.user._id,
		{ $set: req.body },
		{ new: true },
		(err, user, _) => {
			if (err) return res.status(500).send(err.message);

			res.send(user);
		}
	);
});
router.put("/type", auth, async (req, res) => {
	// Validating the type input
	const { error } = validateUserType(req.query._type);
	if (error) return res.status(400).send(error.details[0].message);

	// Updating the user here
	User.findByIdAndUpdate(
		req.user._id,
		{ $set: { _type: req.query._type } },
		{ new: true },
		(err, user, _) => {
			if (err) return res.status(500).send(err.message);

			res.send(user);
		}
	);
});

//
// DELETEs
router.delete("/:id", auth, async (req, res) => {
	const user = await User.findById(req.params.id);
	if (!user)
		return res
			.status(400)
			.send(`No existing user with the ID '${req.params.id}'.`);

	// Deleting the user here
	User.findByIdAndDelete(req.params.id, (err, user, _) => {
		if (err) return res.status(500).send(err.message);

		res.send(user);
	});
});

module.exports = router;
