import cluster from "cluster";
import os from "os";

import "dotenv/config";
import { server } from "./server";

const numCpus = os.cpus().length;
const PORT = process.env.PORT || 3001;

const startServer = () => {
  server.listen(PORT, () =>
    console.log(`Server ${process.pid} started on port ${PORT}`)
  );
};

if (numCpus > 1) {
  if (cluster.isPrimary) {
    for (let i = 0; i < numCpus; i++) {
      cluster.fork();
    }
    cluster.on("exit", (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
      cluster.fork();
    });
  } else {
    startServer();
  }
} else {
  startServer();
}
