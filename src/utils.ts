import { IncomingMessage } from "http";
import { v4 as uuidv4 } from "uuid";

import { IUser } from "./interfaces";

export const getIdFromUrl = (url: string) => {
  return url.split("/")[3];
};

export const checkIfValidId = (id: string) => {
  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

  return regexExp.test(id);
};

export const findUserById = (id: string, db: IUser[]) =>
  db.find((account) => account.id === id);

export const checkIfFieldsRequired = (reqBody: IUser) => {
  const { username, age, hobbies } = reqBody;

  if (username && age && hobbies) return true;
};

export const checkIfRequestValid = (reqBody: IUser) => {
  // const { username, age, hobbies } = reqBody;

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
        try {
          resolve(body);
        } catch (error) {
          reject(error);
        }
        // const userBody = JSON.parse(body);
        // resolve(userBody);
      });
    } catch (error) {
      console.log("ERROR");
      reject(error);
    }
  });
};

export const createNewUser = async (body: string): Promise<IUser> => {
  const userBody = await JSON.parse(body);

  return { id: uuidv4(), ...userBody };
};
