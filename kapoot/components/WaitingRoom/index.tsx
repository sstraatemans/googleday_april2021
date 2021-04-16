import React, { FC, useEffect } from "react";
import { useSocket, useLastMessage } from "use-socketio";
import { UpdateParticipantsSocketEvent } from "../../../types/sockets.types";
import { socketEmit } from "../../utils/socketEmit";

const WaitingRoom: FC = () => {
  const { socket } = useSocket();
  const { data: participantResponse } = useLastMessage("ParticipantsUpdated");

  useEffect(() => {
    socketEmit<UpdateParticipantsSocketEvent>(
      socket,
      "UpdateParticipants",
      null
    );
  }, []);

  return <div>Waiting room {JSON.stringify(participantResponse)}</div>;
};

export default WaitingRoom;
