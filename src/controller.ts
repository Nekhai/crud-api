import { IncomingMessage, ServerResponse } from "http";

import { IUser } from "./interfaces";
import {
  checkIfValidId,
  checkIfRequestValid,
  checkIfFieldsRequired,
} from "./utils";
import {
  createNewUser,
  findUserById,
  upgradeUser,
  getUserIndex,
  deleteUserById,
} from "./models";

export const getAllUsers = (res: ServerResponse, db: IUser[]) => {
  try {
    res.writeHead(200, { "Content-type": "aplication/json" });
    res.end(JSON.stringify(db));
  } catch (error) {
    throw error;
  }
};

export const getUserById = (res: ServerResponse, db: IUser[], id: string) => {
  try {
    const user = findUserById(id, db);

    userIdErrorHandler(res, id, user);

    res.writeHead(200, { "Content-type": "aplication/json" });
    res.end(JSON.stringify(user));
  } catch (error) {
    throw error;
  }
};

export const addUser = async (
  req: IncomingMessage,
  res: ServerResponse,
  db: IUser[]
) => {
  try {
    const body = await getBody(req);
    const newUser = await createNewUser(body);

    if (!checkIfFieldsRequired(newUser)) {
      res.writeHead(400, { "Content-type": "aplication/json" });
      res.end(JSON.stringify({ message: "Not Contain Required Fields" }));
    } else if (!checkIfRequestValid(newUser)) {
      res.writeHead(400, { "Content-type": "aplication/json" });
      res.end(JSON.stringify({ message: "Invalid Data Type" }));
    } else {
      db.push(newUser);

      res.writeHead(201, { "Content-type": "aplication/json" });
      res.end(JSON.stringify(newUser));
    }
  } catch (error) {
    res.writeHead(400, { "Content-type": "aplication/json" });
    res.end(JSON.stringify({ message: "Invalid request" }));
  }
};

export const updateUser = async (
  req: IncomingMessage,
  res: ServerResponse,
  db: IUser[],
  id: string
) => {
  try {
    const user = findUserById(id, db);

    userIdErrorHandler(res, id, user);

    const body = await getBody(req);
    const updatedUser = await upgradeUser(body, user);

    if (!checkIfRequestValid(updatedUser)) {
      res.writeHead(400, { "Content-type": "aplication/json" });
      res.end(JSON.stringify({ message: "Invalid Data Type" }));
    } else {
      const index = getUserIndex(id, db);
      db[index] = updatedUser;

      res.writeHead(200, { "Content-type": "aplication/json" });
      return res.end(JSON.stringify(updatedUser));
    }
  } catch (error) {
    res.writeHead(400, { "Content-type": "aplication/json" });
    res.end(JSON.stringify({ message: "Invalid request" }));
  }
};

export const deleteUser = async (
  res: ServerResponse,
  db: IUser[],
  id: string
) => {
  try {
    const user = findUserById(id, db);

    userIdErrorHandler(res, id, user);

    deleteUserById(id, db);

    res.writeHead(204, { "Content-type": "aplication/json" });
    res.end();
  } catch (error) {
    throw error;
  }
};

const userIdErrorHandler = (
  res: ServerResponse,
  id: string,
  user: IUser | undefined
) => {
  if (!checkIfValidId(id)) {
    res.writeHead(400, { "Content-type": "aplication/json" });
    return res.end(JSON.stringify({ message: "Invalid ID" }));
  } else if (!user) {
    res.writeHead(404, { "Content-type": "aplication/json" });
    return res.end(JSON.stringify({ message: "User Not Found" }));
  }
};

export const badUrlRes = (res: ServerResponse) => {
  res.writeHead(404, { "Content-type": "aplication/json" });
  res.end(JSON.stringify({ message: "Not Found" }));
};

const getBody = (req: IncomingMessage): Promise<string> => {
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
      reject(error);
    }
  });
};
