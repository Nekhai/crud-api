import { IncomingMessage } from "http";
import { validate } from "uuid";

import { IUser } from "../interfaces";

export const getIdFromUrl = (url: string) => url.split("/")[3];

export const checkIfValidId = (id: string) => validate(id);

export const checkIfFieldsRequired = (reqBody: IUser) => {
  const { username, age, hobbies } = reqBody;

  if (username && age && hobbies) return true;
};

export const checkIfRequestValid = (reqBody: IUser) => {
  if (
    typeof reqBody?.username === "string" &&
    typeof reqBody?.age === "number" &&
    !isNaN(reqBody?.age) &&
    Array.isArray(reqBody?.hobbies)
  ) {
    return true;
  }
};
