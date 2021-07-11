const morgan = require("morgan"); // Incoming requests logging
const debug = require("debug")("ns:startup");

module.exports = function (app) {
	/* If we are in development mode */
	if (app.get("env") === "development") {
		app.use(morgan("combined", { skip: false, immediate: true }));
		if (!process.env.DEBUG)
			console.log(
				"'DEBUG' environment variable is not yet set. Debugger logs cannot be displayed."
			);
	}
};
