import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import thunk from "redux-thunk";
import {
  storeDifficulty,
  startGame,
  flagSquare,
  clearSquare,
} from "../actions";
import minesweeper from "../reducers/minesweeper";
import copyBoard from "../helpers/copyBoard";
import { flattenArray } from "../helpers/boardGeneration";
import { testBoard } from "../helpers/testBoard";

describe("minesweeper redux store", () => {
  let rootReducer;
  let composeEnhancers;
  beforeEach(() => {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    rootReducer = combineReducers({
      minesweeper,
    });
  });

  describe("storeDifficulty action", () => {
    describe("when action called with medium difficulty", () => {
      let store;

      beforeEach(() => {
        const initialState = {
          minesweeper: {
            difficulty: "Easy",
          },
        };

        store = createStore(
          rootReducer,
          initialState,
          composeEnhancers(applyMiddleware(thunk))
        );

        return store.dispatch(storeDifficulty("Medium"));
      });

      it("stores the difficulty", () => {
        expect(store.getState().minesweeper.difficulty).toEqual("Medium");
      });
    });
  });

  describe("startGame action", () => {
    describe("when action called", () => {
      let store;

      beforeEach(() => {
        const initialState = {
          minesweeper: {
            difficulty: "Easy",
            startGame: false,
            board: [],
          },
        };

        store = createStore(
          rootReducer,
          initialState,
          composeEnhancers(applyMiddleware(thunk))
        );

        return store.dispatch(startGame("Easy"));
      });

      it("should change startGame to true", () => {
        expect(store.getState().minesweeper.startGame).toEqual(true);
      });

      it("should generate gameboard", () => {
        expect(store.getState().minesweeper.board).not.toEqual([]);
      });
    });
  });

  describe("flagSquare action", () => {
    describe("clicking unclear space", () => {
      let store;

      beforeEach(() => {
        const initialState = {
          minesweeper: {
            board: copyBoard(testBoard),
          },
        };

        store = createStore(
          rootReducer,
          initialState,
          composeEnhancers(applyMiddleware(thunk))
        );

        return store.dispatch(flagSquare(0, 0));
      });
      it("should flag an uncleared space", () => {
        expect(store.getState().minesweeper.board[0][0].flag).toEqual(true);
      });
    });

    describe("clicking cleared space", () => {
      let store;

      beforeEach(() => {
        let clearedBoard = copyBoard(testBoard);
        clearedBoard[0][0].clear = true;

        const initialState = {
          minesweeper: {
            board: clearedBoard,
          },
        };

        store = createStore(
          rootReducer,
          initialState,
          composeEnhancers(applyMiddleware(thunk))
        );

        return store.dispatch(flagSquare(0, 0));
      });
      it("should not add a flag", () => {
        expect(store.getState().minesweeper.board[0][0].flag).toEqual(false);
      });
    });
    describe("clicking already flagged space", () => {
      let store;

      beforeEach(() => {
        let flaggedBoard = copyBoard(testBoard);
        flaggedBoard[0][0].flag = true;

        const initialState = {
          minesweeper: {
            board: flaggedBoard,
          },
        };

        store = createStore(
          rootReducer,
          initialState,
          composeEnhancers(applyMiddleware(thunk))
        );

        return store.dispatch(flagSquare(0, 0));
      });
      it("should remove the flag", () => {
        expect(store.getState().minesweeper.board[0][0].flag).toEqual(false);
      });
    });
  });

  describe("clear square action", () => {
    describe("clicking on a square", () => {
      let store;

      beforeEach(() => {
        const initialState = {
          minesweeper: {
            board: copyBoard(testBoard),
          },
        };

        store = createStore(
          rootReducer,
          initialState,
          composeEnhancers(applyMiddleware(thunk))
        );

        return store.dispatch(clearSquare(0, 0));
      });

      it("should clear the top of the board", () => {
        expect(store.getState().minesweeper.board[0][0].clear).toEqual(true);
      });
    });

    describe("clicking on a flagged square", () => {
      let store;

      beforeEach(() => {
        const flaggedBoard = copyBoard(testBoard);
        flaggedBoard[0][0].flag = true;

        const initialState = {
          minesweeper: {
            board: flaggedBoard,
          },
        };

        store = createStore(
          rootReducer,
          initialState,
          composeEnhancers(applyMiddleware(thunk))
        );

        return store.dispatch(clearSquare(0, 0));
      });

      it("should clear the square and remove the flag", () => {
        expect(store.getState().minesweeper.board[0][0].clear).toEqual(true);
        expect(store.getState().minesweeper.board[0][0].flag).toEqual(false);
      });
    });

    describe("clicking on a square with a mine under it", () => {
      let store;

      beforeEach(() => {
        const initialState = {
          minesweeper: {
            board: copyBoard(testBoard),
            gameOver: false,
          },
        };

        store = createStore(
          rootReducer,
          initialState,
          composeEnhancers(applyMiddleware(thunk))
        );

        return store.dispatch(clearSquare(0, 2));
      });

      it("Should set game over to true and winner to false", () => {
        expect(store.getState().minesweeper.gameOver).toEqual(true);
        expect(store.getState().minesweeper.winner).toEqual(false);
      });

      it("Should clear all mine squares", () => {
        expect(
          flattenArray(store.getState().minesweeper.board).filter(
            (square) => square.mine && square.clear
          ).length
        ).toEqual(2);
      });
    });

    describe("when clicking on a space with no adjacent mines", () => {
      let store;

      beforeEach(() => {
        const initialState = {
          minesweeper: {
            board: copyBoard(testBoard),
            gameOver: false,
          },
        };

        store = createStore(
          rootReducer,
          initialState,
          composeEnhancers(applyMiddleware(thunk))
        );

        return store.dispatch(clearSquare(0, 0));
      });

      it("should clear the clicked space and any non mine spots touching it", () => {
        expect(store.getState().minesweeper.board[0][0].clear).toEqual(true);
        expect(store.getState().minesweeper.board[0][1].clear).toEqual(true);
        expect(store.getState().minesweeper.board[1][0].clear).toEqual(true);
        expect(store.getState().minesweeper.board[1][1].clear).toEqual(true);
        expect(store.getState().minesweeper.board[2][0].clear).toEqual(true);
        expect(store.getState().minesweeper.board[2][1].clear).toEqual(true);
      });
    });

    describe("clicking all non mine spaces should end the game", () => {
      let store;

      beforeEach(() => {
        const initialState = {
          minesweeper: {
            board: copyBoard(testBoard),
            gameOver: false,
          },
        };

        store = createStore(
          rootReducer,
          initialState,
          composeEnhancers(applyMiddleware(thunk))
        );

        // Clear all non mine squares
        store.dispatch(clearSquare(0, 0));
        store.dispatch(clearSquare(0, 1));
        store.dispatch(clearSquare(1, 0));
        store.dispatch(clearSquare(1, 1));
        store.dispatch(clearSquare(2, 0));
        store.dispatch(clearSquare(2, 1));
        store.dispatch(clearSquare(2, 2));

        return;
      });

      it("should have gameOver set to true and winner to true", () => {
        expect(store.getState().minesweeper.gameOver).toEqual(true);
        expect(store.getState().minesweeper.winner).toEqual(true);
      });
    });
  });
});
