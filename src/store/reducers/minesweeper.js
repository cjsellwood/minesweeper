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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_DIFFICULTY:
      return storeDifficulty(state, action);
    case actionTypes.START_GAME:
      return startGame(state, action);
    default:
      return state;
  }
};

export default reducer;
