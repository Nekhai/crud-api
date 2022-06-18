import request from "supertest";
import { server } from "../server";

const user = {
  username: "Din",
  age: 30,
  hobbies: ["driving"],
};
const updatedUser = {
  username: "Alex",
  age: 40,
};

const message = { message: "User Not Found" };

let id = "";

afterAll(() => {
  server.close();
});

describe("test requests to server", () => {
  test("should return an empty array", async () => {
    const res = await request(server).get("/api/users").send();

    expect(res.body).toEqual([]);
  });

  test("should return created object", async () => {
    const res = await request(server).post("/api/users").send(user);
    id = res.body.id;

    expect(res.body).toMatchObject(user);
  });

  test("should return object with test id", async () => {
    const res = await request(server).get(`/api/users/${id}`).send();

    expect(res.body).toMatchObject(user);
  });

  test("should return updated object", async () => {
    const res = await request(server).put(`/api/users/${id}`).send(updatedUser);

    expect(res.body).toMatchObject(updatedUser);
    expect(res.body).toMatchObject({ id });
  });

  test("should return empty body and status code 204", async () => {
    const res = await request(server).delete(`/api/users/${id}`).send();

    expect(res.body).toEqual("");
    expect(res.statusCode).toBe(204);
  });

  test("should return message", async () => {
    const res = await request(server).delete(`/api/users/${id}`).send();

    expect(res.body).toEqual(message);
  });
});
