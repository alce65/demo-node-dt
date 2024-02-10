import { createServer } from "http";
import { app } from "./app.js";
import "dotenv/config";

const PORT = process.env.PORT || 3300;

// app.listen(PORT, () => {
//     console.log(
//         `Server is running on port ${PORT} from ${process.env.NODE_ENV} environment`
//     );
// });

const server = createServer(app);

try {
    server.listen(PORT, () => {
        console.log(
            `Server is running on port ${PORT} from ${process.env.NODE_ENV} environment`
        );
    });
} catch (error) {
    server.emit("error", error);
}

server.on("error", (error) => {
    console.log(`Error ${error.message}`);
});
