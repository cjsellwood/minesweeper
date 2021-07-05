import * as actionTypes from "../actions/actionTypes";

const initialState = {
  difficulty: "Easy",
  startGame: false,
  board: [],
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
  let boardCopy = [];
  for (let i = 0; i < state.board.length; i++) {
    const row = [];
    for (let j = 0; j < state.board[i].length; j++) {
      row.push({
        ...state.board[i][j],
      });
    }
    boardCopy.push(row);
  }

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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_DIFFICULTY:
      return storeDifficulty(state, action);
    case actionTypes.START_GAME:
      return startGame(state, action);
    case actionTypes.FLAG_SQUARE:
      return flagSquare(state, action);
    default:
      return state;
  }
};

export default reducer;
