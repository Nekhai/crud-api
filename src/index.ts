import http from "http";
import "dotenv/config";

const db = [];

const server = http.createServer((req, res) => {});

const PORT = process.env.PORT;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
