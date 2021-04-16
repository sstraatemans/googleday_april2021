import React from "react";
import { useGameContextConsumer } from "../../context/GameContext";
import {
  ParticipantsUpdatedSocketEvent,
  useLastMessage,
} from "../../context/MockSocket";
import RegisterParticipant from "../RegisterParticipant";

const GameController = () => {
  const { state } = useGameContextConsumer();
  const { participants } = useLastMessage<ParticipantsUpdatedSocketEvent>(
    "ParticipantsUpdated"
  );

  if (!state.registered) {
    return <RegisterParticipant />;
  }

  return <div>let the game begin! {JSON.stringify(participants)}</div>;
};

export default GameController;
