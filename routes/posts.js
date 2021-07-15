const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth");
const { Post, validate } = require("../models/Post");
const { Classroom } = require("../models/Classroom");
const { upload, formatFile } = require("../libs/multer"); // Saving upcoming files

// Get
router.get("/", async (req, res) => {
	console.log(JSON.stringify(req.params));
	// Get post list from classroom
	const { posts, quizzes, tutorials } = await Classroom.findById(
		req.params.id,
		{
			posts: 1,
			quizzes: 1,
			tutorials: 1,
		}
	).populate(
		"posts.author posts.comments.author" +
			" quizzes.author quizzes.comments.author" +
			" tutorials.author tutorials.comments.author"
	);
	if (!(posts || quizzes || tutorials))
		return res
			.status(400)
			.send(`No classroom found with the ID '${req.params.id}'.`);
	console.log(quizzes);
	// Return OK
	res.send([...posts, ...quizzes, ...tutorials]);
});
router.get("/:postId", async (req, res) => {
	// Get particular post from post list of a classroom
	const { posts, quizzes, tutorials } = await Classroom.findById(
		req.params.id,
		{ posts: 1, quizzes: 1, tutorials: 1 }
	);
	const allPosts = [...posts, ...quizzes, ...tutorials];
	const post = allPosts.find(
		(post) => String(post._id) === String(req.params.postId)
	);
	const path = `classroom:${req.params.id}/post:${req.params.postId}`;
	if (!post)
		return res.status(400).send(`No post found with the path '${path}'.`);

	// Return OK
	res.send(post);
});

// Create
router.post("/", [auth, upload.single("_file")], async (req, res) => {
	// Getting classroom by ID
	const classroom = await Classroom.findById(req.params.id);
	if (!classroom)
		return res
			.status(400)
			.send(`No classroom found with the given ID '${req.params.id}'.`);

	// Checking if the post includes a file
	let file = null;
	if (req.file) {
		// Upload file to S3 bucket
		// const uploadResult = await uploadFile(req.file);

		// TODO: It returns something like below, set file.uri to the 'Location' property
		// {
		// 	ETag: '"e822c8031345dd06420cfcac4acde9fe"',
		// 	Location: 'https://nett-server-b0.s3.us-east-2.amazonaws.com/60e10bea426b882fd4e97531_1626301063882.jpg',
		// 	key: '60e10bea426b882fd4e97531_1626301063882.jpg',
		// 	Key: '60e10bea426b882fd4e97531_1626301063882.jpg',
		// 	Bucket: 'nett-server-b0'
		// }

		// Format file to save
		file = formatFile(req.file);
	}

	// Then validating post input
	const postToCreate = {
		author: req.user._id,
		...(file && { file }),
		...req.body,
	};
	const { error } = validate(postToCreate);
	if (error) {
		console.log(error);
		return res.status(400).send(error.details.map(({ message }) => message));
	}

	// Pushing post to classroom post list
	const post = new Post(postToCreate);
	classroom.posts.push(post);
	classroom.save();

	// Return OK
	res.send(post);
});

// Update
router.put("/:postId", auth, async (req, res) => {
	// Input validation
	const update = { author: req.user._id, ...req.body };
	const { error } = validate(update);
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
router.delete("/:postId", auth, async (req, res) => {
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

module.exports = router;
