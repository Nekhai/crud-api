import request from "supertest";
import { server } from "../server";

const user = {
  username: "Din",
  age: 30,
  hobbies: ["driving"],
};

const invalidUser = {
  username: "Din",
  age: 30,
};

const invalidTypeUser = {
  username: "Din",
  age: "30",
  hobbies: ["driving"],
};

const bedRequest = { message: "Not Found" };
const invalidID = { message: "Invalid ID" };
const userNotFound = { message: "User Not Found" };
const notAllFields = { message: "Not Contain Required Fields" };
const badType = { message: "Invalid Data Type" };

let id = "";

afterAll(() => {
  server.close();
});

describe("test response messages and status code", () => {
  test("should return message and code on not exist path", async () => {
    const res = await request(server).get("/api/persons").send();

    expect(res.body).toEqual(bedRequest);
    expect(res.statusCode).toBe(404);
  });

  test("should return message and code on invalid id (not uuid)", async () => {
    const resAddUser = await request(server).post("/api/users").send(user);
    id = resAddUser.body.id;

    const res = await request(server)
      .get(`/api/users/${id + "1"}`)
      .send();

    expect(res.body).toEqual(invalidID);
    expect(res.statusCode).toBe(400);
  });

  test("should return message and code on not exist user", async () => {
    const badId = 19 + id.slice(2);
    const res = await request(server).get(`/api/users/${badId}`).send();

    expect(res.body).toEqual(userNotFound);
    expect(res.statusCode).toBe(404);
  });

  test("should return message and code on not contain required fields", async () => {
    const res = await request(server).post("/api/users").send(invalidUser);

    expect(res.body).toEqual(notAllFields);
    expect(res.statusCode).toBe(400);
  });

  test("should return message and code on invalid type in fields", async () => {
    const res = await request(server).post("/api/users").send(invalidTypeUser);

    expect(res.body).toEqual(badType);
    expect(res.statusCode).toBe(400);
  });
});
