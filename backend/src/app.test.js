const supertest = require("supertest");

const app = require("./app");

const apiTitle = require("./constants/apiTitle");

describe("GET /", () => {
  it("should respond with a message", async () => {
    const response = await supertest(app)
      .get("/")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body.message).toEqual(apiTitle.message);
  });
});
