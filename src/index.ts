import * as http from "http";
import app from "./app";
import { PersonResolver } from "./models/PersonResolver";

const server = http.createServer(app);
const port = normalizePort(process.env.PORT || 3000);

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function normalizePort(val: number | string): number | string | boolean {
    val = (typeof val === "string") ? parseInt(val, 10) : val;
    if (isNaN(val)) {
        return val;
    } else if (val >= 0) {
        return val;
    } else {
        return false;
    }
}

function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== "listen") {
        throw error;
    }
    switch (error.code) {
        case "EACCES":
            process.exit(1);
            break;
        case "EADDRINUSE":
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening(): void {
    const addr = server.address();
}

app.get("/persons", async (req, res) => {
    const personResolver = new PersonResolver();
    res.json(await personResolver.getPersons());
});
