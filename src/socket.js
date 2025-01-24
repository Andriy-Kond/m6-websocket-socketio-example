// Option for React app

import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === "production" ? undefined : "http://localhost:4000";

export const socket = io(URL);

// By default, the Socket.IO client opens a connection to the server right away. You can prevent this behavior with the autoConnect option:
// export const socket = io(URL, {
//   autoConnect: false
// });
// In that case, you will need to call socket.connect() to make the Socket.IO client connect. This can be useful for example when the user must provide some kind of credentials before connecting.

// During development, you need to enable CORS on your server:

const io = new Server({
  cors: {
    origin: "http://localhost:3000",
  },
});

io.listen(4000);
