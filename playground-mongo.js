const mongoose = require("mongoose");
const debug = require("debug")("ns:mongo"); // Debugging startup

/* CONNECTION TO DB */
mongoose
	.connect("mongodb://localhost/playground", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		debug("Connected to MongoDB...");
	})
	.catch((err) => {
		debug("Could not connect to MongoDB...", err);
	});

/* SCHEMAS */
const userProfileSchema = new mongoose.Schema({
	picUri: String,
	firstName: String,
	lastName: String,
});
const userSchema = new mongoose.Schema({
	creationDate: { type: Date, default: Date.now },
	profile: {
		type: userProfileSchema,
	},
	phone: String,
});

/* MODELS */
const User = mongoose.model("User", userSchema);

/* SOME FUNCTIONS */
async function createUser() {
	const user = new User({
		profile: {
			picUri: "https://picsum.photos/id/237/300/300",
			firstName: "Marceline",
			lastName: "Ewube",
		},
		phone: "+237656895349",
	});

	const result = await user.save();
	debug(result);
}

async function getUser() {
	const users = await User
		//
		// MONGODB QUERIES
		//
		/* COMPARISON OPERATORS DESCRIPTION */
		// $eq (equal)
		// $ne (not equal)
		// $gt (greater than)
		// $gte (greater than or equal to)
		// $lt (less than)
		// $lte (less than or equal to)
		// $in
		// $nin (not in)
		//
		/* --- COMPARISON QUERY OPERATORS --- */
		// .find({ housePrice: { $gte: 10, $lte: 25 } }) // Users having 10 <= housePrice <= 25
		// .find({ housePrice: { $in: [10, 25, 50] } }) // Users having housePrice in [10, 25, 50]
		//
		/* --- LOGICAL QUERY OPERATORS --- */
		// .or([{ phone: "+237656895348"}, { phone: "+237656895347"}]) Or passing multiple other filters
		// .and([{ housePrice: { $in: [30, 45, 75] }}]) And passing multiple other filters
		//
		/* --- REGULAR EXPRESSIONS --- */
		// .find({ phone: /^\+237/}) // Phone numbers starting with "+237"
		// .find({ phone: /48$/}) // Phone numbers ending with "48"
		// .find({ firstName: /^Frank$/i}) // Users having only "Frank" as their firstName, case insensitive (i)
		// .find({ firstName: /.*Frank.*/i}) // Users with firstName containing "Frank", case insensitive (i)
		//
		.find({ phone: "+237656895349" }) // Users having phone number equal to value
		.limit(10) // Limit the number of results to 10
		.sort({ phone: -1 }) // Sorting results => 1: asc, -1: desc
		// .select({ phone: 1, creationDate: 1 }); // Each property with a value of 1 will be selected
		.countDocuments(); // Return only the number of results

	debug(users);
}

/* FUNCTIONS CALLS */
// createUser();
getUser();
