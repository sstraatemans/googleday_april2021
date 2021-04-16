import React, { useEffect, useRef, useState } from "react";
import { useSocket, useLastMessage } from "use-socketio";
import { RegisterParticipantSocketEvent } from "../../../types/sockets.types";
import { useGameContextConsumer } from "../../context/GameContext";
import { socketEmit } from "../../utils/socketEmit";
import styles from "../../styles/Game.module.css";

const RegisterParticipant = () => {
  const [error, setError] = useState(null);
  const [name, setName] = useState(null);
  const inputRef = useRef<HTMLInputElement>();
  const { setState } = useGameContextConsumer();
  const { socket } = useSocket();

  const { data: participantRegisteredResponse } = useLastMessage(
    "ParticipantRegistered"
  );

  const onInputChange = () => {
    setError(null);
  };

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
      <input ref={inputRef} onChange={onInputChange} />
      <button>Register</button>
      {error && (
        <div>
          <p className={styles.errorMessage}>{error}</p>
        </div>
      )}
    </form>
  );
};

export default RegisterParticipant;
