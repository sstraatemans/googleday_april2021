import React, { useEffect, useState } from "react";

export interface ParticipantsUpdatedSocketEvent {
  eventName: "ParticipantsUpdated";
  response: {
    participants: string[];
  };
}

export interface NewQuestion {
  eventName: "NewQuestion";
  response: {
    question: string;
    answers: Array<{
      id: string;
      displayValue: string;
    }>;
  };
}

export type SocketEvent = ParticipantsUpdatedSocketEvent | NewQuestion;

export function useLastMessage<T extends SocketEvent>(
  eventName: T["eventName"]
) {
  const [state, setState] = useState<T["response"] | undefined>(undefined);

  useEffect(() => {
    const EVENT_NAME = `MOCK_${eventName}`;
    const onEvent = () => {
      setState(({ participants: ["Jaap", "Jan"] } as unknown) as T["response"]);
    };

    window.addEventListener(EVENT_NAME, onEvent);

    return () => {
      window.removeEventListener(EVENT_NAME, onEvent);
    };
  }, []);

  return state;
}
