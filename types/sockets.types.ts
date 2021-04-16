export interface ParticipantsUpdatedSocketEvent {
  eventName: "ParticipantsUpdated";
  body: null;
  response: {
    participants: string[];
  };
}

export interface ParticipantRegisteredSocketEvent {
  eventName: "ParticipantRegistered";
  body: null;
  response: {
    success: boolean;
  };
}

export interface RegisterParticipantSocketEvent {
  eventName: "RegisterParticipant";
  body: {
    name: string;
  };
  response: null;
}

export interface GameStartedSocketEvent {
  eventName: "GameStarted";
  body: null;
  response: {
    numberOfQuestions: number;
  };
}

export interface StartGameSocketEvent {
  eventName: "StartGame";
  body: null;
  response: null;
}

export interface GiveAnswerSocketEvent {
  eventName: "GiveAnswer";
  body: {
    answerId: string;
  };
  response: null;
}

export interface QuestionCompletedSocketEvent {
  eventName: "QuestionCompleted";
  body: null;
  response: {
    questionId: string;
    validAnswersIds: string[];
    participants: Array<{ name: string; score: number }>;
  };
}

export interface NewQuestionSocketEvent {
  eventName: "NewQuestion";
  body: null;
  response: {
    question: string;
    answers: Array<{
      id: string;
      displayValue: string;
    }>;
  };
}

export interface FinalScoreSocketEvent {
  eventName: "FinalScore";
  body: null;
  response: {
    participants: Array<{ name: string; score: number }>;
  };
}

export type SocketEvent =
  | ParticipantsUpdatedSocketEvent
  | ParticipantRegisteredSocketEvent
  | RegisterParticipantSocketEvent
  | NewQuestionSocketEvent
  | GameStartedSocketEvent
  | StartGameSocketEvent
  | GiveAnswerSocketEvent
  | QuestionCompletedSocketEvent
  | FinalScoreSocketEvent;
