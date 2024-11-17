import app from "@/app";
import request from "supertest";

describe("Get Todos", () => {
  it("should get all todos", async () => {
    const res = await request(app).get("/api/v1/todos");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
  });
});
