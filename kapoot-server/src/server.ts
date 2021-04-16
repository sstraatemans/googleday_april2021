import * as express from "express";
import * as socketio from "socket.io";
import * as path from "path";

const app = express();
app.set("port", process.env.PORT || 3000);

let http = require("http").Server(app);
let io = require("socket.io")(http);

app.get("/", (req: any, res: any) => {
  res.sendFile(path.resolve("./index.html"));
});

// simple '/' endpoint sending a Hello World
// response
app.get("/hello-world", (req: any, res: any) => {
  res.send("hello world");
});

io.on("connection", function(socket: any) {
  console.log("a user connected");

  socket.on("message", function(message: any) {
    console.log(message);

    socket.emit("message", message + "<-- your message")
  });
});

// start our simple server up on localhost:3000
const server = http.listen(3000, function() {
  console.log("listening on *:3000");
});