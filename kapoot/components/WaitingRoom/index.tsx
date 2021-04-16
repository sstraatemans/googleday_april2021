import React, { FC, useEffect, useState } from "react";
import { useSocket } from "use-socketio";
import {
  ParticipantsUpdatedSocketEvent,
  UpdateParticipantsSocketEvent,
} from "../../../types/sockets.types";
import { socketEmit } from "../../utils/socketEmit";
import { useLastMessage } from "../../utils/useLastMessage";
import styles from "../../styles/Game.module.css";

const WaitingRoom: FC = () => {
  const { socket } = useSocket();
  const [participants, setParticipants] = useState([]);
  useLastMessage<ParticipantsUpdatedSocketEvent>(
    "ParticipantsUpdated",
    (response) => {
      response.value && setParticipants(response.value.participants);
    }
  );

  useEffect(() => {
    socketEmit<UpdateParticipantsSocketEvent>(
      socket,
      "UpdateParticipants",
      null
    );
  }, []);

  return (
    <div>
      <h1 className={styles.pageheader}>You're in!</h1>
      <div>
        {participants.map((p) => (
          <span className={styles.participantLabel}>{p}</span>
        ))}
      </div>
    </div>
  );
};

export default WaitingRoom;
