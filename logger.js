const EventEmitter = require("events");

const KEVY_JUST_WENT_HOME = "KEVY_JUST_WENT_HOME";

class Logger extends EventEmitter {
	log(message) {
		console.log(message);
		// Raise an event
		this.emit(KEVY_JUST_WENT_HOME, { date: new Date(), hasAPresent: true });
	}
}

module.exports.Logger = Logger;
module.exports.KEVY_JUST_WENT_HOME = KEVY_JUST_WENT_HOME;
