import React, { useEffect, useState } from 'react';

export interface ParticipantsUpdatedSocketEvent {
  eventName: 'ParticipantsUpdated';
  response: {
    participants: string[];
  };
}

export interface GameStartedSocketEvent {
  eventName: 'GameStarted';
  response: {
    numberOfQuestions: number;
  };
}

export interface NewQuestionSocketEvent {
  eventName: 'NewQuestion';
  response: {
    question: string;
    answers: Array<{
      id: string;
      displayValue: string;
    }>;
  };
}

export type SocketEvent =
  | ParticipantsUpdatedSocketEvent
  | NewQuestionSocketEvent
  | GameStartedSocketEvent;

export function useLastMessage<T extends SocketEvent>(eventName: T['eventName']) {
  const [state, setState] = useState<T['response'] | undefined>(undefined);

  useEffect(() => {
    const EVENT_NAME = `MOCK_${eventName}`;
    const onEvent = () => {
      let response;
      switch (eventName) {
        case 'ParticipantsUpdated':
          response = { participants: ['Jaap', 'Jan'] };
          break;
        case 'GameStarted':
          response = {
            numberOfQuestions: 5,
          };
          break;
        case 'NewQuestion':
          response = {
            question: 'What is de hoofdstad van Spanje?',
            answers: [
              {
                id: 'madrid',
                displayValue: 'Madrid',
              },
              {
                id: 'Vienna',
                displayValue: 'Vienna',
              },
            ],
          };
      }

      setState((response as unknown) as T['response']);
    };

    window.addEventListener(EVENT_NAME, onEvent);

    return () => {
      window.removeEventListener(EVENT_NAME, onEvent);
    };
  }, []);

  return {
    data: state,
  };
}
