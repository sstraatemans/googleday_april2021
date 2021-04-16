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