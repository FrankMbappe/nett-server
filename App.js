const { Logger, KEVY_JUST_WENT_HOME } = require("./logger");

const logger = new Logger();

// Register a listerner
logger.on(KEVY_JUST_WENT_HOME, ({ date }) => {
	console.log(date.toISOString() + " Yeaaaahh!!!");
});

logger.log("Day after day... Seems like I push against the clouds");
