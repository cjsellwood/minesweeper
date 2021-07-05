import * as actionTypes from "../actions/actionTypes";
import copyBoard from "../helpers/copyBoard";
import clearAdjacent from "../helpers/clearAdjacent";

const initialState = {
  difficulty: "Easy",
  startGame: false,
  board: [],
  gameOver: false,
};

const storeDifficulty = (state, action) => {
  return {
    ...state,
    difficulty: action.difficulty,
  };
};

const startGame = (state, action) => {
  return {
    ...state,
    startGame: action.startGame,
    board: action.board,
  };
};

const flagSquare = (state, action) => {
  // Duplicate board immutably
  let boardCopy = copyBoard(state.board);

  // Only change flag if not cleared
  if (!boardCopy[action.row][action.col].clear) {
    if (boardCopy[action.row][action.col].flag) {
      // Remove flag if square already has it
      boardCopy[action.row][action.col].flag = false;
    } else {
      boardCopy[action.row][action.col].flag = true;
    }
  }

  return {
    ...state,
    board: boardCopy,
  };
};

const clearSquare = (state, action) => {
  let boardCopy = copyBoard(state.board);
  boardCopy[action.row][action.col].clear = true;

  // Remove flag if the square had one
  boardCopy[action.row][action.col].flag = false;

  // If spot is a mine
  let gameOver = state.gameOver;
  if (boardCopy[action.row][action.col].mine) {
    gameOver = true;

    // Show all mines
    for (let i = 0; i < boardCopy.length; i++) {
      for (let j = 0; j < boardCopy[i].length; j++) {
        if (boardCopy[i][j].mine) {
          boardCopy[i][j].clear = true;
        }
      }
    }
  } else if (boardCopy[action.row][action.col].adjacent === 0) {
    boardCopy = clearAdjacent(boardCopy, action.row, action.col);
  }

  return {
    ...state,
    board: boardCopy,
    gameOver,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_DIFFICULTY:
      return storeDifficulty(state, action);
    case actionTypes.START_GAME:
      return startGame(state, action);
    case actionTypes.FLAG_SQUARE:
      return flagSquare(state, action);
    case actionTypes.CLEAR_SQUARE:
      return clearSquare(state, action);
    default:
      return state;
  }
};

export default reducer;
