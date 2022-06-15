import { ServerResponse } from "http";
import { IUser } from "./interfaces";
import { checkIfValidId } from "./utils";

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
    const user = db.find((account) => account.id === id);

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
