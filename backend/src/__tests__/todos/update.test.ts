import app from "@/app";
import request from "supertest";

describe("Update Todo", () => {
  let todoId: string;

  beforeAll(async () => {
    const res = await request(app).post("/api/v1/todos").send({
      name: "Todo 1",
      shortDescription: "This is a todo",
      date: "2021-09-01T00:00:00.000Z",
    });

    todoId = res.body.data.id;
  });

  it("should validate validId", async () => {
    const res = await request(app).put(`/api/v1/todos/9999999`).send({
      name: "Todo 1 Updated",
      shortDescription: "This is a todo updated",
      date: "2021-09-01T00:00:00.000Z",
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message");
  });

  it("should update a todo", async () => {
    const res = await request(app).put(`/api/v1/todos/${todoId}`).send({
      name: "Todo 1 Updated",
      shortDescription: "This is a todo updated",
      date: "2021-09-01T00:00:00.000Z",
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("name");
    expect(res.body.data).toHaveProperty("shortDescription");
  });
});
