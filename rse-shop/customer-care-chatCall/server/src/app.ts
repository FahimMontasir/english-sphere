import express, { Application } from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

const app: Application = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});

// socket endpoint
io.on("connection", (socket) => {
  console.log("user connected", socket.id);

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
    console.log("message", msg);
  });

  socket.on("disconnect", () => {
    console.log("user leaved");
  });
});
// parse data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// rest endpoints
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

export default httpServer;
