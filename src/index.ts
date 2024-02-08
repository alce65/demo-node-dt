import { createServer } from "http";
import { app } from "./app.js";
import "dotenv/config";

const PORT = process.env.PORT || 3300;

const server = createServer(app);
server.listen(PORT, () => {
    console.log(
        `Server is running on port ${PORT} from ${process.env.NODE_ENV} environment`
    );
});
