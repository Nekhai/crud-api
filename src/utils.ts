import { IncomingMessage } from "http";

import { IUser } from "./interfaces";

export const getIdFromUrl = (url: string) => {
  return url.split("/")[3];
};

export const checkIfValidId = (id: string) => {
  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

  return regexExp.test(id);
};

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

export const getBody = (req: IncomingMessage): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        resolve(body);
      });
    } catch (error) {
      console.log("ERROR2");
      reject(error);
    }
  });
};
