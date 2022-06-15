import http from "http";
import "dotenv/config";
import { db } from "./db";
import { getIdFromUrl } from "./utils";
import { getAllUsers, getUserById } from "./controller";

const server = http.createServer((req, res) => {
  if (req.url === "/api/users" && req.method === "GET") {
    getAllUsers(res, db);
  } else if (req.url?.startsWith("/api/users/") && req.method === "GET") {
    const id = getIdFromUrl(req.url);

    getUserById(res, db, id);
  } else {
    res.writeHead(404, { "Content-type": "aplication/json" });
    res.end(JSON.stringify({ message: "Not Found" }));
  }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
