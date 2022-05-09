const supertest = require("supertest");

const app = require("../app");
const apiTitle = require("../constants/apiTitle");

describe("GET /api/v1", () => {
  it("should respond with an array of book", async () => {
    const response = await supertest(app)
      .get("/api/v1")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body.message).toEqual(apiTitle.message);
  });
});
