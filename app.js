// ES5 (commonJS from 2009)
// const ws = new require("ws");
// const wsServer = new ws.Server({ port: 5000 });

// ES6 (from 2015)
import { WebSocketServer } from "ws";

// Creating The Web Socket Server simultaneously run it.
const wss = new WebSocketServer({
  port: 5000, // The WebSocketServer will run on this port
});

// For send messages to all frontend connections:
const socketList = [];

// listen event "connection"
wss.on(
  "connection",
  // This function will process each time when will new frontend connection
  function connection(currentSocket) {
    console.log("New frontend connected");

    socketList.push(currentSocket);

    // Object currentSocket - it is unique object for each separate frontend
    currentSocket.on("error", console.error);

    setTimeout(() => {
      // send message to new frontend connection after 1sec:
      currentSocket.send("Welcome  to web-socket server");
    }, 1000);

    currentSocket.on("message", function message(data) {
      console.log("received: %s", data);
    });

    // Method send() can send or string or file
    currentSocket.send("something");

    // send message to other frontend connections
    socketList.forEach(socket => {
      if (socket !== currentSocket) {
        socket.send("New member connected");
      }
    });
  },
);
