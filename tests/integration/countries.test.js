const request = require("supertest");
const Country = require("../../models/Country");
let server;

describe("/api/countries", () => {
    beforeEach(() => {
        server = require("../../App");
    });
    afterEach(async () => {
        server.close();
        await Country.deleteMany({});
    });

    describe("GET /", () => {
        it("should return all countries", async () => {
            const res = await request(server).get("/api/countries");

            expect(res.status).toBe(200);
        });
    });
});
