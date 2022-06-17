import http from "http";
import "dotenv/config";
import { db } from "./db";
import { getIdFromUrl } from "./utils";
import { getAllUsers, getUserById, addUser } from "./controller";

const server = http.createServer((req, res) => {
  try {
    if (req.url === "/api/users" && req.method === "GET") {
      getAllUsers(res, db);
    } else if (req.url?.startsWith("/api/users/") && req.method === "GET") {
      const id = getIdFromUrl(req.url);
      getUserById(res, db, id);
    } else if (req.url === "/api/users" && req.method === "POST") {
      addUser(req, res, db);
    } else {
      res.writeHead(404, { "Content-type": "aplication/json" });
      res.end(JSON.stringify({ message: "Not Found" }));
    }
  } catch (error) {
    res.writeHead(500, { "Content-type": "aplication/json" });
    res.end(JSON.stringify({ message: "Server Error" }));
  }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
