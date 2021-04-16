import React, { FC } from 'react';
import { NewQuestionSocketEvent, useLastMessage } from '../../context/MockSocket';

const QuestionController: FC = () => {
  const { data: newQuestionResponse } = useLastMessage<NewQuestionSocketEvent>('NewQuestion');

  return <div>question controller {JSON.stringify(newQuestionResponse)}</div>;
};

export default QuestionController;
