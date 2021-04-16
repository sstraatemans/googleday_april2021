import React from "react";
import { useGameContextConsumer } from "../../context/GameContext";

const RegisterParticipant = () => {
  const { setState } = useGameContextConsumer();

  const onSubmit = (e) => {
    e.preventDefault();

    setState({
      registered: true,
      name: "asd",
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <input />
      <button>Register</button>
    </form>
  );
};

export default RegisterParticipant;
