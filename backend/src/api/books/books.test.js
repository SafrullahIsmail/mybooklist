const supertest = require("supertest");

const app = require("../../app");

describe("GET /api/v1/books", () => {
  it("should respond with an array of book", async () => {
    const response = await supertest(app)
      .get("/api/v1/books")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should respond with an individual book", async () => {
    const response = await supertest(app)
      .get("/api/v1/books/1")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body.id).toBe(1);
  });

  it("should respond with a 404 for a not found book", async () => {
    await supertest(app)
      .get("/api/v1/books/4200")
      .expect("Content-Type", /json/)
      .expect(404);
  });
});
