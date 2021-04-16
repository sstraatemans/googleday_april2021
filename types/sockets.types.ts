export interface ParticipantsUpdatedSocketEvent {
    eventName: 'ParticipantsUpdated';
    response: {
      participants: string[];
    };
  }

export interface PartipantRegisteredSocketEvent {
    eventName: 'ParticipantRegistered';
    response: {
      success: boolean;
    };
  }

  export interface RegisterParticipantSocketEvent {
    eventName: 'RegisterParticipant';
    body: {
        name: string;
    }
    response: null;
  }
  
  export interface GameStartedSocketEvent {
    eventName: 'GameStarted';
    response: {
      numberOfQuestions: number;
    };
  }

  export interface StartGameSocketEvent {
    eventName: 'StartGame';
    body: null
    response: null;
  }

  export interface GiveAnswerSocketEvent {
    eventName: 'GiveAnswer';
    body: {
        answerId: string;
    };
    response: null;
  }

  export interface QuestionCompletedSocketEvent {
      eventName: 'QuestionCompleted';
      response: {
          questionId: string;
          validAnswersIds: string[];
          participants: Array<{ name: string; score: number}>
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

  export interface FinalScoreSocketEvent {
      eventName: 'FinalScore';
      response: {
        participants: Array<{ name: string; score: number}>
      }
  }

  export type SocketEvent =
  | ParticipantsUpdatedSocketEvent
  | PartipantRegisteredSocketEvent
  | RegisterParticipantSocketEvent
  | NewQuestionSocketEvent
  | GameStartedSocketEvent
  | StartGameSocketEvent
  | GiveAnswerSocketEvent
  | QuestionCompletedSocketEvent
  | FinalScoreSocketEvent;