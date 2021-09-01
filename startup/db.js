const mongoose = require("mongoose"); // Database
const winston = require("winston");
const config = require("config");

module.exports = async () => {
    const db = config.get("db");

    await mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    });
    winston.info(`✔️ Successfully connected to ${db}...`, new Date().getTime());
};
