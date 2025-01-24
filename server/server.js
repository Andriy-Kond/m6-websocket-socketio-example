import { createServer } from "http"; // Built-in in Node.js http-server. Not suitable for create real working server, but in this case is OK and enough.
import { Server } from "socket.io";

// The Socket.io is built in such a way that requires you build the own web-socket server based on http-server. So first of all you must create http-server.
// No needs any other requirements for http-server (any routes, etc.), so you don't need to use express, simple http-server will be enough.
const httpServer = createServer();

const options = {
  cors: {
    origin: "*", // Allows connects from any other ports
    // origin: process.env.NODE_ENV === "production" ? false : ["http://localhost:3000"]
  },
};

// Creating new web-socket server, based on http-server:
const io = new Server(httpServer, options);

io.on("connection", socket => {
  console.log("New frontend connection");
});

httpServer.listen(3001); // run http-server

// // Other way
// import express from "express";
// import { createServer } from "node:http";
// import { fileURLToPath } from "node:url";
// import { dirname, join } from "node:path";

// const app = express();
// const server = createServer(app);

// const __dirname = dirname(fileURLToPath(import.meta.url));

// // or:
// app.get("/", (req, res) => {
//   res.send("<h1>Hello world</h1>");
// });
// // or:
// app.get("/", (req, res) => {
//   res.sendFile(join(__dirname, "index.html"));
// });

// server.listen(3000, () => {
//   console.log("server running at http://localhost:3000");
// });
