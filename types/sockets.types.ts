export interface ParticipantsUpdatedSocketEvent {
  eventName: "ParticipantsUpdated";
  body: null;
  response: {
    participants: string[];
  };
}

export interface UpdateParticipantsSocketEvent {
  eventName: "UpdateParticipants";
  body: null;
  response: null;
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

export interface GameEndedSocketEvent {
  eventName: "GameEnded";
  body: null;
  response: null;
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

export interface Question {
  question: string;
  answers: Array<{
    id: string;
    displayValue: string;
  }>
}
export interface NewQuestionSocketEvent {
  eventName: "NewQuestion";
  body: null;
  response: Question;
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
  | UpdateParticipantsSocketEvent
  | NewQuestionSocketEvent
  | GameEndedSocketEvent
  | GameStartedSocketEvent
  | StartGameSocketEvent
  | GiveAnswerSocketEvent
  | QuestionCompletedSocketEvent
  | FinalScoreSocketEvent;
