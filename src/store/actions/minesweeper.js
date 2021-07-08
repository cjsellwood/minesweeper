import * as actionTypes from "./actionTypes";
import {
  generateBoard,
  populateMines,
  calculateAdjacent,
} from "../helpers/boardGeneration";

export const storeDifficulty = (difficulty) => {
  return {
    type: actionTypes.STORE_DIFFICULTY,
    difficulty,
  };
};

export const startGame = (difficulty) => {
  let board = generateBoard(difficulty);
  board = populateMines(difficulty, board);
  board = calculateAdjacent(board);

  return {
    type: actionTypes.START_GAME,
    startGame: true,
    board,
  };
};

export const flagSquare = (row, col) => {
  return {
    type: actionTypes.FLAG_SQUARE,
    row,
    col,
  };
};

export const clearSquare = (row, col) => {
  return {
    type: actionTypes.CLEAR_SQUARE,
    row,
    col,
  };
};

export const restartGame = () => {
  return {
    type: actionTypes.RESTART_GAME,
  };
};

export const submitScore = (name) => {
  return {
    type: actionTypes.SUBMIT_SCORE,
    name,
  };
};

export const fetchScores = () => {
  return (dispatch) => {
    return fetch(
      "https://minesweeper-237c5-default-rtdb.firebaseio.com/scores.json"
    )
      .then((response) => response.json())
      .then((data) => {
        dispatch(saveFetchedScores(data));
      })
      .catch((error) => {});
  };
};

export const saveFetchedScores = (scores) => {
  return {
    type: actionTypes.SAVE_FETCHED_SCORES,
    scores,
  };
};

// export const saveScore = (name, winTime, difficulty) => {
//   return (dispatch) => {};
// };
