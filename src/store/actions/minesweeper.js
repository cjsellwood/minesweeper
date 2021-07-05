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
