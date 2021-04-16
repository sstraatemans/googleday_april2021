import React, { FC, useState } from 'react';
import { useSocket } from 'use-socketio';
import {
  GiveAnswerSocketEvent,
  NewQuestionSocketEvent,
  Question,
} from '../../../types/sockets.types';
import { socketEmit } from '../../utils/socketEmit';
import { useLastMessage } from '../../utils/useLastMessage';

interface IQuestion {}

const QuestionController: FC = () => {
  const [question, setQuestion] = useState<Question>();
  const [answerGiven, setAnswerGiven] = useState<string | undefined>();
  const { socket } = useSocket();

  useLastMessage<NewQuestionSocketEvent>('NewQuestion', (data) => {
    setQuestion(data.value);
  });

  const answerQuestion = (id: string) => {
    setAnswerGiven(id);

    socketEmit<GiveAnswerSocketEvent>(socket, 'GiveAnswer', { answerId: answerGiven });
  };

  if (!question) return <div>waiting for question</div>;
  return (
    <div>
      <h1>{question.question}</h1>

      {question.answers.map((answer) => (
        <button
          style={{ backgroundColor: answer.id === answerGiven ? 'green' : 'grey' }}
          type='button'
          onClick={() => answerQuestion(answer.id)}
        >
          {answer.displayValue}
        </button>
      ))}
    </div>
  );
};

export default QuestionController;
