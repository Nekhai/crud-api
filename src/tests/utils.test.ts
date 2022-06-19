import * as utils from "../utils/utils";

const id = "123456789";

const user = {
  username: "Din",
  age: 30,
  hobbies: ["driving"],
};

describe("test utils", () => {
  test("should return id from path", async () => {
    const getId = utils.getIdFromUrl(`/api/users/${id}`);

    expect(getId).toBe(id);
  });

  test("should return false on invalid id", async () => {
    const invalidId = utils.checkIfValidId(id);

    expect(invalidId).toBe(false);
  });

  test("should return true if all fields exist", async () => {
    const userWithAllFields = utils.checkIfFieldsRequired(user);

    expect(userWithAllFields).toBe(true);
  });

  test("should return true if all fields have valid types", async () => {
    const userWithValidFields = utils.checkIfRequestValid(user);

    expect(userWithValidFields).toBe(true);
  });
});
