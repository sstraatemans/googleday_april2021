import * as express from "express";
import * as socketio from "socket.io";
import * as path from "path";
import { Socket } from "socket.io";
import { NewQuestionSocketEvent } from "../../types/sockets.types";
interface KapootSocket extends Socket {
  name?: string;
}

const app = express();
app.set("port", process.env.PORT || 8080);

let http = require("http").Server(app);
let io = new socketio.Server(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.get("/", (_req, res) => {
  res.sendFile(path.resolve("./index.html"));
});

let participants: string[] = [];
let isGameStarted: boolean = false;
let questions: Array<NewQuestionSocketEvent["response"]> = [
  {
    question: "Vraag 1",
    answers: [
      {
        displayValue: "Antwoord 1",
        id: "1",
      },
      {
        displayValue: "Antwoord 2",
        id: "2",
      },
      {
        displayValue: "Antwoord 3",
        id: "3",
      },
    ],
  },
];

io.on("connection", (socket: KapootSocket) => {
  socket.onAny((event, ...args) => {
    console.log(event, args);
  });

  socket.on("RegisterParticipant", (participant: string) => {
    let success: boolean = false;
    console.log("isGameStarted", isGameStarted);

    if (!isGameStarted && participants.indexOf(participant) == -1) {
      participants.push(participant);
      socket.name = participant;
      success = true;
      io.emit("ParticipantsUpdated", { participants });
    }

    socket.emit("ParticipantRegistered", {
      success,
    });
  });

  socket.on("GameStarted", () => {
    console.log("Game has started", participants);
    isGameStarted = true;
    console.log("questions", questions);
    io.emit("NewQuestion", questions[0]);
  });
});

const server = http.listen(8080, function () {
  console.log("listening on *:8080");
});
