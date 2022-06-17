import { IncomingMessage, ServerResponse } from "http";
import { IUser } from "./interfaces";
import {
  checkIfValidId,
  getBody,
  createNewUser,
  checkIfRequestValid,
  findUserById,
  upgradeUser,
  getUserIndex,
  checkIfFieldsRequired,
} from "./utils";

export const getAllUsers = (res: ServerResponse, db: IUser[]) => {
  try {
    res.writeHead(200, { "Content-type": "aplication/json" });
    res.end(JSON.stringify(db));
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = (res: ServerResponse, db: IUser[], id: string) => {
  try {
    const user = findUserById(id, db);

    if (!checkIfValidId(id)) {
      res.writeHead(400, { "Content-type": "aplication/json" });
      res.end(JSON.stringify({ message: "Invalid ID" }));
    } else if (!user) {
      res.writeHead(404, { "Content-type": "aplication/json" });
      res.end(JSON.stringify({ message: "User Not Found" }));
    } else {
      res.writeHead(200, { "Content-type": "aplication/json" });
      res.end(JSON.stringify(user));
    }
  } catch (error) {
    console.log(error);
  }
};

export const addUser = async (
  req: IncomingMessage,
  res: ServerResponse,
  db: IUser[]
) => {
  try {
    const body = await getBody(req);

    // if (!JSON.parse(body)) {
    //   res.writeHead(400, { "Content-type": "aplication/json" });
    //   res.end(JSON.stringify({ message: " Invalid Data Type" }));
    // }

    const newUser = await createNewUser(body);

    if (!checkIfFieldsRequired(newUser)) {
      res.writeHead(400, { "Content-type": "aplication/json" });
      res.end(JSON.stringify({ message: "Not Contain Required Fields" }));
    } else if (!checkIfRequestValid(newUser)) {
      res.writeHead(400, { "Content-type": "aplication/json" });
      res.end(JSON.stringify({ message: " Invalid Data Type" }));
    } else {
      db.push(newUser);

      res.writeHead(201, { "Content-type": "aplication/json" });
      res.end(JSON.stringify(newUser));
    }
  } catch (error) {
    console.log(error);
    // res.writeHead(400, { "Content-type": "aplication/json" });
    // res.end(JSON.stringify({ message: " Invalid Data Type" }));
  }
};
