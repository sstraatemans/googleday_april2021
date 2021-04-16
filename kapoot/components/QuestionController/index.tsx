import React, { FC, useState } from 'react';
import { NewQuestionSocketEvent, Question } from '../../../types/sockets.types';
import { useLastMessage } from '../../utils/useLastMessage';

interface IQuestion {}

const QuestionController: FC = () => {
  const [question, setQuestion] = useState<Question>();
  useLastMessage<NewQuestionSocketEvent>('NewQuestion', (data) => {
    //setQuestion(data.response);
  });

  return <div>(GAME STARTED!) question controller {JSON.stringify(question)}</div>;
};

export default QuestionController;
