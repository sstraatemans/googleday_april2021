import React, { useEffect } from "react";
import { useSocket, useLastMessage } from "use-socketio";
import { useGameContextConsumer } from "../../context/GameContext";
import QuestionController from "../QuestionController";
import RegisterParticipant from "../RegisterParticipant";
import WaitingRoom from "../WaitingRoom";

const GameController = () => {
  const { state, setState } = useGameContextConsumer();
  const { data: gameStartedResponse } = useLastMessage("GameStarted");

  useSocket("ParticipantsUpdated", () => {
    console.log("ParticipantsUpdated!");
  });

  useEffect(() => {
    if (gameStartedResponse) {
      setState({ gameStarted: true });
    }
  }, [gameStartedResponse]);

  if (!state.registered) {
    return <RegisterParticipant />;
  }

  if (!state.gameStarted) {
    return <WaitingRoom />;
  }

  return <QuestionController />;
};

export default GameController;
