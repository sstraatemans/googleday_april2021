import React, { FC } from "react";
import { ParticipantsUpdatedSocketEvent } from "../../../types/sockets.types";
import { useLastMessage } from "../../context/MockSocket";

const WaitingRoom: FC = () => {
  const {
    data: participantResponse,
  } = useLastMessage<ParticipantsUpdatedSocketEvent>("ParticipantsUpdated");

  return <div>Waiting room {JSON.stringify(participantResponse)}</div>;
};

export default WaitingRoom;
