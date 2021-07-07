const express = require("express");
const auth = require("../middleware/auth"); // Protecting the routes
const teacher = require("../middleware/teacher");
const debug = require("debug")("ns:routes::classrooms");
const router = express.Router();
const { Classroom, validate } = require("../models/Classroom");
const { Post, validate: validatePost } = require("../models/Post");
const { Comment, validate: validateComment } = require("../models/Comment");
const { File } = require("../models/File");
const { User } = require("../models/User");

//£ Saving file in the server

const { MAX_FILE_SIZE } = require("../config/nett");
const path = require("path");
const multer = require("multer");
const fileStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		const base = "uploads";
		if (/^image.*$/.test(file.mimetype)) return cb(null, base + "/images/");
		if (/^video.*$/.test(file.mimetype)) return cb(null, base + "/videos/");
		cb(null, base);
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
const fileFilter = (req, file, cb) => {
	// If the file uploaded is an image or a video, accept.
	if (/^(image|video).*$/.test(file.mimetype)) cb(null, true);
	else cb(null, false); // Otherwise, reject.
};
const upload = multer({
	storage: fileStorage,
	limits: { fileSize: MAX_FILE_SIZE },
	fileFilter: fileFilter,
});
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

//£ CLASSROOMS

router.get("/", auth, async (req, res) => {
	const classrooms = await Classroom.find({});
	res.send(classrooms);
});
router.get("/:id", auth, async (req, res) => {
	try {
		const classroom = await Classroom.findById(req.params.id);

		debug("A Classroom has been retrieved: " + JSON.stringify(classroom));

		res.send(classroom);
	} catch (exception) {
		for (field in exception.errors) {
			debug(exception.errors[field].message, "\n");
		}
		return res
			.status(404)
			.send(`No existing classroom with the given ID '${req.params.id}'`);
	}
});

router.post("/", [auth, teacher], async (req, res) => {
	const classroomToCreate = { ...req.body, teacher: req.user._id };

	// Input validation
	const { error } = validate(classroomToCreate);

	if (error)
		return res.status(400).send(error.details.map(({ message }) => message));

	/* Starting a transaction to save the classroom and add 
	   its '_id' to the user's 'classrooms' property */

	const session = await Classroom.startSession();

	await session.withTransaction(async () => {
		try {
			const classroom = new Classroom(classroomToCreate);

			await classroom.save();

			const newUser = await User.findByIdAndUpdate(
				req.user._id,
				{
					$push: { classrooms: classroom._id },
				},
				{ new: true }
			);

			return Promise.resolve(
				res.send({ classroom: classroom, userClassrooms: newUser.classrooms })
			);
		} catch (ex) {
			return Promise.reject(
				res
					.status(500)
					.send("Something went wrong while executing your request.")
			);
		}
	});

	session.endSession();
});

router.put("/:id", auth, async (req, res) => {
	//! Might be a problem here with the 'teacher' property not set
	// If invalid, return 400 - Bad request
	const { error } = validate(req.body);

	if (error)
		return res.status(400).send(error.details.map(({ message }) => message));

	// Else, try to update
	try {
		const classroom = await Classroom.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);

		res.send(classroom);
	} catch (exception) {
		for (field in exception.errors) {
			debug(exception.errors[field], "\n");
		}
		return res
			.status(404)
			.send(`No existing classroom with the given ID '${req.params.id}'`);
	}
});
router.put("/quit/:id", auth, async (req, res) => {
	/* Starting a transaction to update the user's 'classrooms' prop 
	   and the classroom's 'participants' prop */

	const session = await Classroom.startSession();

	await session.withTransaction(async () => {
		try {
			const classroom = await Classroom.findById(req.params.id);

			if (!classroom)
				return Promise.reject(
					res.status(404).send("No classroom with the given ID.")
				);

			// Removing user from classroom's participants
			const newClassroom = await Classroom.findByIdAndUpdate(
				classroom._id,
				{
					$pull: { participants: req.user._id },
				},
				{ new: true }
			);

			// Removing classroom from user's classroom list
			const newUser = await User.findByIdAndUpdate(
				req.user._id,
				{
					$pull: { classrooms: classroom._id },
				},
				{ new: true }
			);

			return Promise.resolve(
				res.send({
					classroomParticipants: newClassroom.participants,
					userClassrooms: newUser.classrooms,
				})
			);
		} catch (ex) {
			return Promise.reject(
				res
					.status(500)
					.send("Something went wrong while executing your request.")
			);
		}
	});

	session.endSession();
});

router.delete("/:id", [auth, teacher], async (req, res) => {
	/* Starting a transaction to update the user's 'classrooms' prop 
	and the classroom's 'participants' prop */

	const session = await Classroom.startSession();

	await session.withTransaction(async () => {
		try {
			const classroom = await Classroom.findById(req.params.id);

			if (!classroom)
				return Promise.reject(
					res.status(404).send("No classroom with the given ID.")
				);

			// Removing classroom ID from every participant's classroom list
			let usersUpdated = 0;
			classroom.participations.forEach(async (participantId) => {
				await User.findByIdAndUpdate(participantId, {
					$pull: { classrooms: classroom._id },
				});
				usersUpdated++;
			});

			// Deleting classroom
			await Classroom.findByIdAndDelete(classroom._id);

			return Promise.resolve(
				res.send({ deleted: classroom, usersUpdated: usersUpdated })
			);
		} catch (ex) {
			debug(ex);
			return Promise.reject(
				res
					.status(500)
					.send("Something went wrong while executing your request.")
			);
		}
	});

	session.endSession();
});

//£ POSTS

const postEndpoint = "/:id/posts";

// Get
router.get(postEndpoint, async (req, res) => {
	// Get post list from classroom
	const { posts } = await Classroom.findById(req.params.id, { posts: 1 });
	if (!posts)
		return res
			.status(400)
			.send(`No classroom found with the ID '${req.params.id}'.`);

	// Return OK
	res.send(posts);
});
router.get(`${postEndpoint}/:postId`, async (req, res) => {
	// Get particular post from post list of a classroom
	const { posts } = await Classroom.findById(req.params.id, { posts: 1 });
	const post = posts.find(
		(post) => String(post._id) === String(req.params.postId)
	);
	const path = `classroom:${req.params.id}/post:${req.params.postId}`;
	if (!post)
		return res.status(400).send(`No post found with the path '${path}'.`);

	// Return OK
	res.send(post);
});

// Create
router.post(postEndpoint, [auth, upload.single("_file")], async (req, res) => {
	// Getting classroom by ID
	const classroom = await Classroom.findById(req.params.id);
	if (!classroom)
		return res
			.status(400)
			.send(`No classroom found with the given ID '${req.params.id}'.`);

	// Checking if the post includes a file
	let file = null;
	if (req.file) file = new File(formatFile(req.file));

	// Then validating post input
	const postToCreate = {
		author: req.user._id,
		file: file,
		...req.body,
	};
	const { error } = validatePost(postToCreate);
	if (error)
		return res.status(400).send(error.details.map(({ message }) => message));

	// Pushing post to classroom post list
	const post = new Post(postToCreate);
	classroom.posts.push(post);
	classroom.save();

	// Return OK
	res.send(post);
});

// Update
router.put(`${postEndpoint}/:postId`, auth, async (req, res) => {
	// Input validation
	const update = { author: req.user._id, ...req.body };
	const { error } = validatePost(update);
	if (error)
		return res.status(400).send(error.details.map(({ message }) => message));

	const result = await Classroom.updateOne(
		{ _id: req.params.id, "posts._id": req.params.postId },
		{ $set: { "posts.$": update } }
	);
	const path = `classroom:${req.params.id}/post:${req.params.postId}`;
	if (!result)
		return res.status(400).send(`No post found with the path '${path}'.`);

	res.send(result);
});

// Delete
router.delete(`${postEndpoint}/:postId`, auth, async (req, res) => {
	// Deleting post
	const result = await Classroom.updateOne(
		{
			_id: req.params.id,
			"posts._id": req.params.postId,
		},
		{
			$pull: { posts: { _id: req.params.postId } },
		}
	);
	const path = `classroom:${req.params.id}/post:${req.params.postId}`;
	if (!result)
		return res.status(400).send(`No post found with the path '${path}'.`);

	// Return OK
	res.send(result);
});

//£ COMMENT

const commentEndpoint = `${postEndpoint}/:postId/comments`;

// Get
router.get(commentEndpoint, auth, async (req, res) => {
	// Get comment list from the post of a classroom
	const { posts } = await Classroom.findById(req.params.id, { posts: 1 });
	const { comments } = posts.find(
		(post) => String(post._id) === String(req.params.postId)
	);
	const path = `classroom:${req.params.id}/post:${req.params.postId}`;
	if (!comments)
		return res.status(400).send(`No post found with the path '${path}'.`);

	// Return OK
	res.send(comments);
});
router.get(`${commentEndpoint}/:commentId`, auth, async (req, res) => {
	// Get comment list from the post of a classroom
	const { posts } = await Classroom.findById(req.params.id, { posts: 1 });
	const comment = posts
		.flatMap((x) => x.comments)
		.find((comment) => String(comment._id) === String(req.params.commentId));
	const path = `classroom:${req.params.id}/post:${req.params.postId}/comment:${req.params.commentId}`;
	if (!comment)
		return res.status(400).send(`No comment found with the path '${path}'.`);

	// Return OK
	res.send(comment);
});

// Add
router.post(commentEndpoint, auth, async (req, res) => {
	// Input validation
	const commentToAdd = { author: req.user._id, ...req.body };
	const { error } = validateComment(commentToAdd);
	if (error)
		return res.status(400).send(error.details.map(({ message }) => message));

	// Adding comment
	const comment = new Comment(commentToAdd);
	const result = await Classroom.updateOne(
		{ _id: req.params.id, "posts._id": req.params.postId },
		{ $push: { "posts.$.comments": comment } }
	);
	const path = `classroom:${req.params.id}/post:${req.params.postId}`;
	if (!result)
		return res.status(400).send(`No post found with the path '${path}'.`);

	// Return OK
	res.send(result);
});

// Delete
router.delete(`${commentEndpoint}/:commentId`, auth, async (req, res) => {
	// Removing comment
	const result = await Classroom.updateOne(
		{ _id: req.params.id, "posts._id": req.params.postId },
		{ $pull: { "posts.$.comments": { _id: req.params.commentId } } }
	);
	const path = `classroom:${req.params.id}/post:${req.params.postId}/comment:${req.params.commentId}`;
	if (!result)
		return res
			.status(400)
			.send(`No comment found with the given path '${path}'.`);

	// Return OK
	res.send(result);
});

module.exports = router;
