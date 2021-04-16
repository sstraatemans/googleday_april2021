import React, { FC } from 'react';

interface IProps {
  label: string;
  id: string;
  onClick: (id: string) => void;
  answerGiven: boolean;
}
const Answer: FC<IProps> = ({ label, id, onClick, answerGiven }) => {
  return (
    <button
      style={{ backgroundColor: answerGiven ? 'green' : 'grey' }}
      type='button'
      onClick={() => onClick(id)}
    >
      {label}
    </button>
  );
};

export default Answer;
