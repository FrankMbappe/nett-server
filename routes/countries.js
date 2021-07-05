const express = require("express");
const Country = require("../models/Country");
const router = express.Router();
const Joi = require("joi");
const { escapeRegExp } = require("lodash");

router.get("/", async (req, res) => {
	// If there's nothing to search, returns the full list
	if (!req.body.search) {
		const countries = await Country.find().sort("name");
		return res.send(countries);
	}

	// Input validation
	const { error } = validate(req.body);

	if (error) return res.status(400).send("Invalid search value.");

	// Countries containing the given value
	const pattern = new RegExp(`^.*${escapeRegExp(req.body.search)}.*$`, "i");
	const countries = await Country.find({
		$or: [{ name: pattern }, { code: pattern }, { dialCode: pattern }],
	}).sort("name");

	res.send(countries);
});

function validate(req) {
	const schema = Joi.object({
		search: Joi.string().regex(/^[\+\w\-\s]+$/),
	});
	return schema.validate(req);
}

module.exports = router;
