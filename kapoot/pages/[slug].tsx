import React from "react";
import GameController from "../components/GameController";
import {
  GameContextProvider,
  INITIAL_GAME_STATE,
} from "../context/GameContext";
import styles from "../styles/Home.module.css";

export default function Slug() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <GameContextProvider initialGameState={INITIAL_GAME_STATE}>
          <GameController />
        </GameContextProvider>
      </main>
    </div>
  );
}
