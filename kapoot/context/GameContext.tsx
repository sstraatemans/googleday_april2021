import React, { useContext, useState } from "react";

interface GameState {
  registered: boolean;
  name: string;
  currentScore: number;
}

export const INITIAL_GAME_STATE = {
  registered: false,
  name: null,
  currentScore: 0,
};

const GameContext = React.createContext<{
  state: GameState;
  setState: (newState: Partial<GameState>) => void;
}>({
  state: INITIAL_GAME_STATE,
  setState: () => null,
});

export const GameContextProvider: React.FC<{
  initialGameState: GameState;
}> = ({ children, initialGameState }) => {
  const [state, setState] = useState(initialGameState);
  return (
    <GameContext.Provider
      value={{
        state,
        setState: (newState: Partial<GameState>) =>
          setState({ ...state, ...newState }),
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContextConsumer = () => useContext(GameContext);
