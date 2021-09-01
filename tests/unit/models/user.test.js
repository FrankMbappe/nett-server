const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi); // Required to validate object IDs
const { User } = require("../../../models/User");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const config = require("config");

describe("user.generateAuthToken()", () => {
    it("should return a valid JWT", () => {
        const payload = {
            _id: new mongoose.Types.ObjectId().toHexString(),
            _type: "foo",
            phone: "+000",
            profile: {
                firstName: "Jane",
                lastName: "Doe",
                honorific: "mrs",
                fullName: "Mrs. Jane Doe",
                picUri: "foo",
                birthDate: "1899-12-31T23:46:25.000Z",
                gender: "female",
            },
        };
        const user = new User(payload);

        const token = user.generateAuthToken();
        const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
        expect(decoded).toMatchObject(payload);
    });

    it("should return a valid JWT without a profile", () => {
        const payload = {
            _id: new mongoose.Types.ObjectId().toHexString(),
            _type: "foo",
            phone: "+000",
        };
        const user = new User(payload);

        const token = user.generateAuthToken();
        const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
        expect(decoded).toMatchObject(payload);
    });
});
