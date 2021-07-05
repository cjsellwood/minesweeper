import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { storeDifficulty, startGame } from "../actions";
import {
  generateBoard,
  populateMines,
  flattenArray,
  calculateAdjacent,
  flagSquare,
} from "../actions/minesweeper";
import minesweeper from "../reducers/minesweeper";
import { testBoard, testResult } from "./testBoard";

describe("minesweeper redux store", () => {
  describe("storeDifficulty action", () => {
    describe("when action called with medium difficulty", () => {
      let store;

      beforeEach(() => {
        const composeEnhancers =
          window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

        const rootReducer = combineReducers({
          minesweeper,
        });

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
        const composeEnhancers =
          window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

        const rootReducer = combineReducers({
          minesweeper,
        });

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

  describe("generateBoard function", () => {
    describe("when called with easy difficulty", () => {
      it("should return a 10 x 10 array", () => {
        expect(generateBoard("Easy").length).toEqual(10);
        expect(generateBoard("Easy")[0].length).toEqual(10);
        expect(generateBoard("Easy")[9].length).toEqual(10);
      });

      it("should contain an object with square information in each", () => {
        expect(generateBoard("Easy")[0][0]).toEqual({
          clear: false,
          mine: false,
          flag: false,
          adjacent: 0,
        });
        expect(generateBoard("Easy")[9][9]).toEqual({
          clear: false,
          mine: false,
          flag: false,
          adjacent: 0,
        });
      });
    });
    describe("when called with medium difficulty", () => {
      it("should return a 20 x 20 array", () => {
        expect(generateBoard("Medium").length).toEqual(20);
        expect(generateBoard("Medium")[0].length).toEqual(20);
        expect(generateBoard("Medium")[19].length).toEqual(20);
      });
    });
    describe("when called with hard difficulty", () => {
      it("should return a 30 x 30 array", () => {
        expect(generateBoard("Hard").length).toEqual(30);
        expect(generateBoard("Hard")[0].length).toEqual(30);
        expect(generateBoard("Hard")[29].length).toEqual(30);
      });
    });
  });

  describe("populate mines function", () => {
    it("should add 15 mines on easy difficulty", () => {
      let board = generateBoard("Easy");
      board = populateMines("Easy", board);

      expect(
        flattenArray(board).filter((square) => square.mine === true).length
      ).toEqual(15);
    });

    it("should add 135 mines on easy difficulty", () => {
      let board = generateBoard("Hard");
      board = populateMines("Hard", board);

      expect(
        flattenArray(board).filter((square) => square.mine === true).length
      ).toEqual(135);
    });
  });

  describe("flatten array function", () => {
    it("should turn a 2 dimensional array into a 1 dimensional array", () => {
      expect(
        flattenArray([
          [1, 2],
          [3, 4],
        ])
      ).toEqual([1, 2, 3, 4]);
    });
  });

  describe("calculate adjacent mines function", () => {
    it("should calculate the number of adjacent mines for each square", () => {
      expect(calculateAdjacent(testBoard)).toEqual(testResult);
    });
  });

  describe("flagSquare action", () => {
    describe("clicking unclear space", () => {
      let store;

      beforeEach(() => {
        const composeEnhancers =
          window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

        const rootReducer = combineReducers({
          minesweeper,
        });

        const initialState = {
          minesweeper: {
            board: testBoard,
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
        const composeEnhancers =
          window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

        const rootReducer = combineReducers({
          minesweeper,
        });

        let clearedBoard = testBoard;
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
        const composeEnhancers =
          window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

        const rootReducer = combineReducers({
          minesweeper,
        });

        let flaggedBoard = testBoard;
        flaggedBoard[0][0].clear = false;
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
});
