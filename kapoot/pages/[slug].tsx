import React from 'react';
import { SocketIOProvider } from 'use-socketio';
import GameController from '../components/GameController';
import { GameContextProvider, INITIAL_GAME_STATE } from '../context/GameContext';
import styles from '../styles/Home.module.css';
import { SOCKET_URL } from '../utils/constants';

export default function Slug() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <SocketIOProvider url={SOCKET_URL}>
          <GameContextProvider initialGameState={INITIAL_GAME_STATE}>
            <GameController />
          </GameContextProvider>
        </SocketIOProvider>
      </main>
    </div>
  );
}
