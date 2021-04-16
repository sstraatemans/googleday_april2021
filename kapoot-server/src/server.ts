import * as express from "express";
import * as socketio from "socket.io";
import * as path from "path";
import { Socket } from "socket.io";
import {
  NewQuestionSocketEvent,
  RegisterParticipantSocketEvent,
  StartGameSocketEvent,
  UpdateParticipantsSocketEvent,
} from "../../types/sockets.types";
import { onSocketEvent } from "./handleSocketEvent";
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

  onSocketEvent<RegisterParticipantSocketEvent>(
    socket,
    "RegisterParticipant",
    ({ name }) => {
      let success: boolean = false;

      if (!isGameStarted && participants.indexOf(name) == -1) {
        participants.push(name);
        socket.name = name;
        success = true;
      }

      socket.emit("ParticipantRegistered", {
        success,
      });
    }
  );

  onSocketEvent<UpdateParticipantsSocketEvent>(
    socket,
    "UpdateParticipants",
    () => {
      io.emit("ParticipantsUpdated", { participants });
    }
  );

  onSocketEvent<StartGameSocketEvent>(socket, "StartGame", () => {
    if (isGameStarted) {
      return;
    }

    isGameStarted = true;
    io.emit("GameStarted");

    setTimeout(() => {
      console.log("questions", questions);
      io.emit("NewQuestion", questions[0]);
    }, 3000);
  });

  socket.on("ResetServer", () => {
    isGameStarted = false;
    participants = [];
    io.emit("GameEnded");
  });
});

const server = http.listen(8080, function () {
  console.log("listening on *:8080");
});
