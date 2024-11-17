import app from "@/app";
import request from "supertest";

describe("Delete Todo", () => {
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
    const res = await request(app).delete(`/api/v1/todos/9999999`);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message");
  });

  it("should delete a todo", async () => {
    const res = await request(app).delete(`/api/v1/todos/${todoId}`);

    expect(res.status).toBe(204);
  });
});
