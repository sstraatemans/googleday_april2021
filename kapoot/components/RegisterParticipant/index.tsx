import React, { useEffect, useRef, useState } from "react";
import { useSocket } from "use-socketio";
import { ParticipantRegisteredSocketEvent } from "../../../types/sockets.types";
import { useGameContextConsumer } from "../../context/GameContext";
import { useLastMessage } from "../../context/MockSocket";

const RegisterParticipant = () => {
  const [error, setError] = useState(null);
  const inputRef = useRef<HTMLInputElement>();
  const { setState } = useGameContextConsumer();
  const { socket } = useSocket();

  const {
    data: participantRegisteredResponse,
  } = useLastMessage<ParticipantRegisteredSocketEvent>("ParticipantRegistered");

  useEffect(() => {
    if (participantRegisteredResponse) {
      if (participantRegisteredResponse.success) {
        console.log("ParticipantRegistered->success");
        setState({
          registered: true,
          name: "asd",
        });
      } else {
        console.log("ParticipantRegistered->failed");
        setError("Register failed, choose a different name!");
      }
    }
  }, [participantRegisteredResponse]);

  const onSubmit = (e) => {
    e.preventDefault();
    const name = inputRef.current.value;

    if (!name) {
      inputRef.current.focus();
    } else {
      socket.emit("RegisterParticipant", { name });
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input ref={inputRef} />
      {error}
      <button>Register</button>
    </form>
  );
};

export default RegisterParticipant;
