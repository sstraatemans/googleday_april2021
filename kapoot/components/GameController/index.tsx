import React, { useEffect } from 'react';
import { useSocket } from 'use-socketio';
import { GameStartedSocketEvent } from '../../../types/sockets.types';
import { useGameContextConsumer } from '../../context/GameContext';
import { useLastMessage } from '../../context/MockSocket';
import QuestionController from '../QuestionController';
import RegisterParticipant from '../RegisterParticipant';
import WaitingRoom from '../WaitingRoom';

const GameController = () => {
  const { state, setState } = useGameContextConsumer();
  const { data: gameStartedResponse } = useLastMessage<GameStartedSocketEvent>('GameStarted');

  useSocket('PartipantsUpdated', () => {
    console.log(1111);
  });

  useEffect(() => {
    if (gameStartedResponse) {
      setState({ gameStarted: true });
    }
  }, [gameStartedResponse]);

  if (!state.registered) {
    return <RegisterParticipant />;
  }

  if (!state.gameStarted) {
    return <WaitingRoom />;
  }

  return <QuestionController />;
};

export default GameController;
