const mongoose = require("mongoose");
const debug = require("debug")("ns:mongo"); // Debugging startup

/* CONNECTION TO DB */
mongoose
	.connect("mongodb://localhost/playground", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => debug("Connected to MongoDB..."))
	.catch((err) => debug("Could not connect to MongoDB...", err));

/* SCHEMAS AND VALIDATORS */
const userProfileSchema = new mongoose.Schema({
	picUri: String,
	firstName: {
		type: String, // All the properties down here are only available when using Strings
		required: true, // Apart from this
		minlength: 5,
		maxlength: 255,
		lowercase: true, // Converts automatically input to lowercase
		trim: true, // Removes trailing spaces at the begining & end of the input
	},
	lastName: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 255,
		lowercase: true, // Converts automatically input to lowercase
	},
	type: {
		type: String,
		required: true,
		enum: ["teacher", "student", "consultant"], //* Input must match one of these values
	},
});
const userSchema = new mongoose.Schema({
	creationDate: { type: Date, default: Date.now },
	profile: userProfileSchema,
	phone: { type: String, required: true },
	housePrice: {
		type: Number,
		required: function () {
			return this.profile != null;
		},
		min: 10,
		max: 2000,
		validate: {
			isAsync: false, // If validator does some async work, we set this to true
			// validator: function (value, callback) {
			// 	@ Do some async work... then
			// 	callback(result); //@ We call callback with the result
			// },
			validator: function (value) {
				//* Custom validator
				return value && value.length > 0;
			},
			message: "A house price should be greater than zero", //* Error message
		},
	},
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
	});

	try {
		// We can trigger validation using: user.validate((err) => debug(err));
		const result = await user.save();
		debug(result);
	} catch (exception) {
		for (field in exception.errors) {
			debug(exception.errors[field], "\n");
		}
	}
}

async function getUser() {
	const users = await User
		//
		//£ MONGODB QUERIES
		//
		//$ COMPARISON OPERATORS DESCRIPTION $/
		// - $eq //@(equal)
		// - $ne //@(not equal)
		// - $gt //@(greater than)
		// - $gte //@(greater than or equal to)
		// - $lt //@(less than)
		// - $lte //@(less than or equal to)
		// - $in
		// - $nin //@(not in)
		//
		//$ --- COMPARISON QUERY OPERATORS --- $/
		// .find({ housePrice: { $gte: 10, $lte: 25 } }) //@ Users having 10 <= housePrice <= 25
		// .find({ housePrice: { $in: [10, 25, 50] } }) //@ Users having housePrice in [10, 25, 50]
		//
		//$ --- LOGICAL QUERY OPERATORS --- $/
		// .or([{ phone: "+237656895348"}, { phone: "+237656895347"}]) //@ Or passing multiple other filters
		// .and([{ housePrice: { $in: [30, 45, 75] }}]) //@ And passing multiple other filters
		//
		//$ --- REGULAR EXPRESSIONS --- $/
		// .find({ phone: /^\+237/}) //@ Phone numbers starting with "+237"
		// .find({ phone: /48$/}) //@ Phone numbers ending with "48"
		// .find({ firstName: /^Frank$/i}) //@ Users having only "Frank" as their firstName, case insensitive (i)
		// .find({ firstName: /.*Frank.*/i}) //@ Users with firstName containing "Frank", case insensitive (i)
		//
		.find({ phone: "+237656895349" }) //@ Users having phone number equal to value
		.limit(10) //@ Limit the number of results to 10
		.sort({ phone: -1 }) //@ Sorting results => 1: asc, -1: desc
		// .sort('-phone') //* Another way to sort => phone: asc, -phone: desc
		// .select({ phone: 1, creationDate: 1 }); //@ Each property with a value of 1 will be selected
		// .select('phone creationDate'); //* Another way select => select(col1 col2)
		.countDocuments(); //@ Return only the number of results

	debug(users);
}

async function updateUser(id, value) {
	// There are two approaches:
	//$ I. Query first
	// 1. findById()
	// 2. Modify result properties
	// 3. save()

	//*1
	const userToUpdate1 = User.findById(id);
	if (!userToUpdate1) return;

	//*2
	// We can put Business rules here like: if (user.hasBeenBlocked) return;
	userToUpdate1.phone = value;
	//@ OR
	userToUpdate1.set({
		phone: value,
	});

	//*3
	const result1 = await userToUpdate1.save();
	debug(result1);

	//$ II. Update first
	// 1. Update directly
	//@ 2. Optionally: Get the updated document
	//* 1
	const result2 = await User.updateOne(
		{ _id: id }, // Filter
		{
			$set: {
				//? Check MongoDB update operators for more information.
				phone: value,
			},
		}
	);
	//@ Optional: Get the updated document
	const userToUpdate2 = await User.findOneAndUpdate(
		{ _id: id }, // Filter
		{
			//? Check MongoDB update operators for more information.
			$set: {
				phone: value,
			},
		},
		{ new: true } // Without this, it would return the previous value.
	);
	debug(userToUpdate2);
}

async function removeUser(id) {
	const result = User.deleteOne({ _id: id });
	debug(result);

	//@ Optionally we can get the deleted user
	const user = User.findOneAndRemove({ _id: id });
	debug(user);
}

/* FUNCTIONS CALLS */
// createUser();
// getUser();
// updateUser();
// removeUser();
