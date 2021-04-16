import React, { useEffect } from "react";
import { useSocket } from "use-socketio";
import {
  GameEndedSocketEvent,
  GameStartedSocketEvent,
} from "../../../types/sockets.types";
import {
  INITIAL_GAME_STATE,
  useGameContextConsumer,
} from "../../context/GameContext";
import { useLastMessage } from "../../utils/useLastMessage";
import QuestionController from "../QuestionController";
import RegisterParticipant from "../RegisterParticipant";
import WaitingRoom from "../WaitingRoom";

const GameController = () => {
  const { state, setState } = useGameContextConsumer();

  useLastMessage<GameStartedSocketEvent>("GameStarted", () => {
    setState({ gameStarted: true });
  });

  useLastMessage<GameEndedSocketEvent>("GameEnded", () => {
    setState(INITIAL_GAME_STATE);
  });

  useSocket("ParticipantsUpdated", () => {
    console.log("ParticipantsUpdated!");
  });

  if (!state.registered) {
    return <RegisterParticipant />;
  }

  if (!state.gameStarted) {
    return <WaitingRoom />;
  }

  return <QuestionController />;
};

export default GameController;
