import * as express from "express";
import * as socketio from "socket.io";
import * as path from "path";
import { Socket } from "socket.io";
import {
  NewQuestionSocketEvent,
  RegisterParticipantSocketEvent,
  StartGameSocketEvent,
  UpdateParticipantsSocketEvent,
  GiveAnswerSocketEvent,
  QuestionCompletedSocketEvent,
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
let questions: Array<
  NewQuestionSocketEvent["response"] & { validAnswers: string[] }
> = [
  {
    question: "Vraag 1",
    validAnswers: ["3"],
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
let currentQuestion: string;

// let answerTest = [{
//   question: "Vraag 1",
//   answers: [
//     {
//       participant: "Jan-Willem",
//       answer: "2",
//     }
//   ]
// }]

let answers: Array<{
  question: string;
  answers: Array<{
    participant: string;
    answer: string;
  }>;
}> = questions.map((question) => ({
  question: question.question,
  answers: [],
}));

io.on("connection", (socket: KapootSocket) => {
  onSocketEvent<RegisterParticipantSocketEvent>(
    socket,
    "RegisterParticipant",
    ({ name }) => {
      let success: boolean = false;

      if (!isGameStarted && participants.indexOf(name) == -1) {
        participants.push(name);
        socket.name = name;
        success = true;
        io.emit("ParticipantsUpdated", { participants });
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
      console.log("Game already started");
      return;
    }

    isGameStarted = true;
    io.emit("GameStarted");

    setTimeout(() => {
      const { question, answers } = questions[0];
      io.emit("NewQuestion", { question, answers });
      currentQuestion = question;
    }, 3000);
  });

  onSocketEvent<GiveAnswerSocketEvent>(socket, "GiveAnswer", ({ answerId }) => {
    if (!isGameStarted) {
      console.error("Start a game first!");
    }
    console.log("socket.name ", socket.name);

    answers
      .find((answer) => answer.question === currentQuestion)
      .answers.push({
        participant: socket.name,
        answer: answerId,
      });

    if (
      answers.find((answer) => answer.question === currentQuestion).answers
        .length === participants.length
    ) {
      const response: QuestionCompletedSocketEvent["response"] = {
        questionId: currentQuestion,
        validAnswersIds: questions.find((q) => q.question === currentQuestion)
          .validAnswers,
        // participants: answers.map(answer => ({
        //   name:
        //   score:
        // }))
      };
      io.emit("QuestionCompleted");
    }
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
