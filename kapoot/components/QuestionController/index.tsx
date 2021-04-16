import React, { FC, useState } from "react";
import { useSocket } from "use-socketio";
import {
  GiveAnswerSocketEvent,
  NewQuestionSocketEvent,
  Question,
} from "../../../types/sockets.types";
import { socketEmit } from "../../utils/socketEmit";
import { useLastMessage } from "../../utils/useLastMessage";
import Answer from "../Answer";
import styles from "../../styles/Game.module.css";

interface IQuestion {}

const QuestionController: FC = () => {
  const [question, setQuestion] = useState<Question>();
  const [answerGiven, setAnswerGiven] = useState<string | undefined>();
  const { socket } = useSocket();

  useLastMessage<NewQuestionSocketEvent>("NewQuestion", (data) => {
    setQuestion(data.value);
  });

  const answerQuestion = (id: string) => {
    setAnswerGiven(id);
    socketEmit<GiveAnswerSocketEvent>(socket, "GiveAnswer", {
      answerId: answerGiven,
    });
  };

  if (!question) {
    return (
      <div>
        <h1 className={styles.pageheader}>Waiting for question..</h1>
      </div>
    );
  }
  return (
    <div>
      <h1 className={styles.pageheader}>{question.question}</h1>

      {question.answers.map((answer) => (
        <Answer
          id={answer.id}
          label={answer.displayValue}
          key={answer.id}
          answerGiven={answer.id === answerGiven}
          onClick={answerQuestion}
          disabled={!!answerGiven}
        />
      ))}
    </div>
  );
};

export default QuestionController;
