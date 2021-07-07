import * as actionTypes from "../actions/actionTypes";
import copyBoard from "../helpers/copyBoard";
import clearAdjacent from "../helpers/clearAdjacent";
import { flattenArray } from "../helpers/boardGeneration";

const initialState = {
  difficulty: "Easy",
  startGame: false,
  board: [],
  gameOver: false,
  winner: false,
  time: 0,
  winTime: null,
  scores: {
    Easy: [],
    Medium: [],
    Hard: [],
  },
  isFetched: false,
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
    time: Date.now(),
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
  let winner = state.winner;
  if (boardCopy[action.row][action.col].mine) {
    gameOver = true;
    winner = false;

    // Show all mines
    for (let i = 0; i < boardCopy.length; i++) {
      for (let j = 0; j < boardCopy[i].length; j++) {
        if (boardCopy[i][j].mine) {
          boardCopy[i][j].clear = true;
        }
      }
    }
  } else if (boardCopy[action.row][action.col].adjacent === 0) {
    // If square with no adjacent mines clear adjacent non mine squares
    boardCopy = clearAdjacent(boardCopy, action.row, action.col);
  }

  let winTime;
  // Check if won
  if (
    flattenArray(boardCopy).filter((square) => !square.clear && !square.mine)
      .length === 0
  ) {
    gameOver = true;
    winner = true;
    winTime = Math.floor((Date.now() - state.time) / 1000);
  }

  return {
    ...state,
    board: boardCopy,
    gameOver,
    winner,
    winTime,
  };
};

const restartGame = (state, action) => {
  return {
    ...state,
    gameOver: false,
    startGame: false,
    board: [],
    winner: false,
  };
};

const submitScore = (state, action) => {
  let newScores = [];
  for (let score of state.scores[state.difficulty]) {
    newScores.push({ ...score });
  }

  newScores.push({ name: action.name, score: state.winTime });
  newScores.sort((a, b) => {
    return a.score - b.score;
  });

  newScores = newScores.slice(0, 10);

  return {
    ...state,
    scores: {
      ...state.scores,
      [state.difficulty]: newScores,
    },
  };
};

const saveFetchedScores = (state, action) => {
  let newScores = {};
  for (let difficulty in action.scores) {
    const array = [];
    for (let score in action.scores[difficulty]) {
      array.push({ "name": score, "score": action.scores[difficulty][score] });
    }
    array.sort((a, b) => {
      return a.score - b.score;
    });
    newScores[difficulty] = array;
  }
  return {
    ...state,
    scores: newScores,
    isFetched: true,
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
    case actionTypes.RESTART_GAME:
      return restartGame(state, action);
    case actionTypes.SUBMIT_SCORE:
      return submitScore(state, action);
    case actionTypes.SAVE_FETCHED_SCORES:
      return saveFetchedScores(state, action);
    default:
      return state;
  }
};

export default reducer;
