import { ServerResponse } from "http";

import { checkIfValidId } from "./utils";
import { IUser } from "../interfaces";

export const userIdErrorHandler = (
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
