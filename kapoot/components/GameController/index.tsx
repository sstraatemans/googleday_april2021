import React from "react";
import { useGameContextConsumer } from "../../context/GameContext";
import RegisterParticipant from "../RegisterParticipant";

const GameController = () => {
  const { state } = useGameContextConsumer();
  if (!state.registered) {
    return <RegisterParticipant />;
  }

  return <div>let the game begin!</div>;
};

export default GameController;
