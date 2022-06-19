import { server } from "./server";
import "dotenv/config";

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
