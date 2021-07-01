const express = require("express"); // Server
const debug = require("debug")("ns:routes::users"); // Debugger
const router = express.Router(); // Instead of creating a new server
const { User, validate } = require("../models/User"); // Validating input

//
// GETs
router.get("/", async (_, res) => {
	const users = await User.find().sort("creationDate");
	res.send(users);
});
router.get("/:id", async (req, res) => {
	try {
		const user = await User.findById(req.params.id);

		debug("A User has been retrieved: " + JSON.stringify(user));

		res.send(user);
	} catch (exception) {
		for (field in exception.errors) {
			debug(exception.errors[field].message, "\n");
		}
		return res
			.status(404)
			.send(`No existing user with the given ID '${req.params.id}'`);
	}
});

//
// POSTs
router.post("/", async (req, res) => {
	// Input validation
	const { error } = validate(req.body);

	if (error)
		return res.status(400).send(error.details.map(({ message }) => message));

	// Saving the user
	User.create(req.body, (err, user) => {
		if (err) return res.status(400).send(err);

		debug(`A User has been added: ${user}`);
		res.send(user);
	});
});

//
// PUTs
router.put("/:id", async (req, res) => {
	// If invalid, return 400 - Bad request
	const { error } = validate(req.body);
	if (error)
		return res.status(400).send(error.details.map(({ message }) => message));

	// Else, try to update
	try {
		const user = await User.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);

		res.send(user);
	} catch (exception) {
		for (field in exception.errors) {
			debug(exception.errors[field], "\n");
		}
		return res
			.status(404)
			.send(`No existing user with the given ID '${req.params.id}'`);
	}
});

//
// DELETEs
router.delete("/:id", async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id);

		res.send(user);
	} catch (exception) {
		for (field in exception.errors) {
			debug(exception.errors[field], "\n");
		}
		return res
			.status(404)
			.send(`No existing user with the given ID '${req.params.id}'`);
	}
});

module.exports = router;
