import http from "http";

import { db } from "./db";
import { getIdFromUrl } from "./utils/utils";
import {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
} from "./controller";
import { badUrlRes } from "./utils/bedReqHandlers";

export const server = http.createServer((req, res) => {
  try {
    if (req.url === "/api/users") {
      if (req.method === "GET") {
        getAllUsers(res, db);
      } else if (req.method === "POST") {
        addUser(req, res, db);
      } else {
        badUrlRes(res);
      }
    } else if (req.url?.startsWith("/api/users/")) {
      const id = getIdFromUrl(req.url);
      if (req.method === "GET") {
        getUserById(res, db, id);
      } else if (req.method === "PUT") {
        updateUser(req, res, db, id);
      } else if (req.method === "DELETE") {
        deleteUser(res, db, id);
      } else {
        badUrlRes(res);
      }
    } else {
      badUrlRes(res);
    }
  } catch (error) {
    res.writeHead(500, { "Content-type": "aplication/json" });
    res.end(JSON.stringify({ message: "Server Error" }));
  }
});
