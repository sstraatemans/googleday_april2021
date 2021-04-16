import React, { useEffect, useRef, useState } from "react";
import { useSocket, useLastMessage } from "use-socketio";
import { RegisterParticipantSocketEvent } from "../../../types/sockets.types";
import { useGameContextConsumer } from "../../context/GameContext";
import { socketEmit } from "../../utils/socketEmit";

const RegisterParticipant = () => {
  const [error, setError] = useState(null);
  const [name, setName] = useState(null);
  const inputRef = useRef<HTMLInputElement>();
  const { setState } = useGameContextConsumer();
  const { socket } = useSocket();

  const { data: participantRegisteredResponse } = useLastMessage(
    "ParticipantRegistered"
  );

  useEffect(() => {
    if (participantRegisteredResponse) {
      if (participantRegisteredResponse.success) {
        console.log("ParticipantRegistered->success");
        setState({
          registered: true,
          name,
        });
      } else {
        console.log("ParticipantRegistered->failed");
        setError("Register failed, choose a different name!");
      }
    }
  }, [participantRegisteredResponse, name]);

  const onSubmit = (e) => {
    e.preventDefault();
    const name = inputRef.current.value;

    if (!name) {
      inputRef.current.focus();
    } else {
      setName(name);
      socketEmit<RegisterParticipantSocketEvent>(
        socket,
        "RegisterParticipant",
        { name }
      );
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
