import * as express from "express";
import * as socketio from "socket.io";
import * as path from "path";
import { Socket } from "socket.io";

const app = express();
app.set("port", process.env.PORT || 8080);

let http = require("http").Server(app);
let io = require("socket.io")(http);

app.get("/", (req: any, res: any) => {
  res.sendFile(path.resolve("./index.html"));
});

let participants: string[] = [];

// simple '/' endpoint sending a Hello World
// response
app.get("/hello-world", (req: any, res: any) => {
  res.send("hello world");
});

io.use((socket: any, next: any) => {
  const username = socket.handshake.auth.username;
  console.log('username middleware', username)
  if (!username) {
    return next(new Error("invalid username"));
  }
  socket.username = username;
  next();
});

io.on("connection", (socket: Socket) => {
  socket.onAny((event, ...args) => {
    console.log(event, args);
  });

  socket.on("RegisterParticipant", (participantName: string) => {
    participants.push(participantName);
    // TODO: filter double names
    io.emit('PartipantsUpdated', { participants })
  })

  socket.on("GameStarted", () => {
      console.log('Game has started');
      io.emit('NewQuestion', { participants })
  })
});

// start our simple server up on localhost:3000
const server = http.listen(3000, function () {
  console.log("listening on *:3000");
});