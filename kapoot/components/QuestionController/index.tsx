import React, { FC } from "react";
import { NewQuestionSocketEvent } from "../../../types/sockets.types";
import { useLastMessage } from "../../context/MockSocket";

const QuestionController: FC = () => {
  const { data: newQuestionResponse } = useLastMessage<NewQuestionSocketEvent>(
    "NewQuestion"
  );

  return (
    <div>
      (GAME STARTED!) question controller {JSON.stringify(newQuestionResponse)}
    </div>
  );
};

export default QuestionController;
