import app from "@/app";
import request from "supertest";

describe("Create Todo", () => {
  it("should validate req body", async () => {
    const res = await request(app).post("/api/v1/todos").send();

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body).toHaveProperty("message");
    expect(res.body.errors[0]).toHaveProperty("name");
    expect(res.body.errors[1]).toHaveProperty("shortDescription");
  });

  it("should create a todo", async () => {
    const res = await request(app).post("/api/v1/todos").send({
      name: "Todo 1",
      shortDescription: "This is a todo",
      date: "2021-09-01T00:00:00.000Z",
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("name");
    expect(res.body.data).toHaveProperty("shortDescription");
  });
});
