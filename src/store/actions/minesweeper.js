import * as actionTypes from "./actionTypes";

export const storeDifficulty = (difficulty) => {
  return {
    type: actionTypes.STORE_DIFFICULTY,
    difficulty,
  };
};

export const startGame = () => {
  return {
    type: actionTypes.START_GAME,
    startGame: true,
  };
};
