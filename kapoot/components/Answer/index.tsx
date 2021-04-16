import React, { FC } from "react";

interface IProps {
  label: string;
  id: string;
  onClick: (id: string) => void;
  answerGiven: boolean;
  disabled: boolean;
}
const Answer: FC<IProps> = ({ label, id, onClick, answerGiven, disabled }) => {
  return (
    <button
      style={{ backgroundColor: answerGiven ? "green" : "grey" }}
      type="button"
      disabled={disabled}
      onClick={() => onClick(id)}
    >
      {label}
    </button>
  );
};

export default Answer;
