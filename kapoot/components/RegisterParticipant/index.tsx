import React, { useEffect, useState } from "react";
import { PartipantRegisteredSocketEvent } from "../../../types/sockets.types";
import { useGameContextConsumer } from "../../context/GameContext";
import { useLastMessage } from "../../context/MockSocket";

const RegisterParticipant = () => {
  const [error, setError] = useState(null);
  const { setState } = useGameContextConsumer();

  const {
    data: participantRegisteredResponse,
  } = useLastMessage<PartipantRegisteredSocketEvent>("PartipantRegistered");

  useEffect(() => {
    if (participantRegisteredResponse) {
      if (participantRegisteredResponse.success) {
        setState({
          registered: true,
          name: "asd",
        });
      } else {
        setError("Register failed, choose a different name!");
      }
    }
  }, [participantRegisteredResponse]);

  const onSubmit = (e) => {
    e.preventDefault();

    // RegisterParticipantSocketEvent { name }
  };

  return (
    <form onSubmit={onSubmit}>
      <input />
      {error}
      <button>Register</button>
    </form>
  );
};

export default RegisterParticipant;
