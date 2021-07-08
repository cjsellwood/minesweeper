import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import thunk from "redux-thunk";
import {
  storeDifficulty,
  startGame,
  flagSquare,
  clearSquare,
  restartGame,
  submitScore,
  fetchScores,
  saveFetchedScores,
  postScore,
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
            time: Date.now(),
            winTime: null,
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

      it("should save time for timer", () => {
        expect(Math.floor(store.getState().minesweeper.time / 1000)).toEqual(
          Math.floor(Date.now() / 1000)
        );
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
            time: Date.now(),
            winTime: null,
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

      it("time to win should be saved", () => {
        expect(store.getState().minesweeper.winTime).not.toBeNull();
      });
    });
  });

  describe("restartGame action", () => {
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

    it("Should reset state to original", () => {
      store.dispatch(restartGame());
      expect(store.getState().minesweeper.gameOver).toEqual(false);
      expect(store.getState().minesweeper.startGame).toEqual(false);
      expect(store.getState().minesweeper.winner).toEqual(false);
      expect(store.getState().minesweeper.board).toEqual([]);
    });
  });

  describe("fetch high score data from firebase", () => {
    describe("when loading is successful", () => {
      let store;
      let initialState;
      let originalFetch;

      const fetched = {
        Easy: {
          "Fire 1": 888,
          "Water 1": 111,
          "Water 11": 111,
          "Water 12": 111,
          "Water 13": 111,
          "Water 14": 111,
          "Water 15": 111,
          "Water 16": 111,
          "Water 17": 111,
          "Water 18": 111,
          "Water 19": 111,
        },
        Medium: { "Fire 2": 999, "Water 2": 1002 },
        Hard: { "Fire 3": 777 },
      };

      beforeEach(() => {
        originalFetch = window.fetch;
        window.fetch = jest
          .fn()
          .mockImplementation(() =>
            Promise.resolve({ json: () => Promise.resolve(fetched) })
          );
        initialState = {
          minesweeper: {
            board: copyBoard(testBoard),
            gameOver: true,
            winner: true,
            difficulty: "Easy",
            winTime: 10,
            scores: {
              Easy: [],
              Medium: [],
              Hard: [],
            },
            isFetched: false,
          },
        };

        store = createStore(
          rootReducer,
          initialState,
          composeEnhancers(applyMiddleware(thunk))
        );

        return store.dispatch(fetchScores());
      });

      afterEach(() => {
        window.fetch = originalFetch;
      });

      it("should fetch high scores", () => {
        expect(fetch).toHaveBeenCalled();
        expect(store.getState().minesweeper.scores.Easy[0]).toEqual({
          name: "Water 1",
          score: 111,
        });
      });

      it("should only fetch up to 10 of each difficulty score", () => {
        expect(store.getState().minesweeper.scores.Easy.length).toEqual(10);
      });
    });

    describe("when loading is unsuccessful", () => {
      let store;
      let initialState;
      let originalFetch;

      beforeEach(() => {
        originalFetch = window.fetch;
        window.fetch = jest.fn().mockImplementation(() => Promise.reject());
        initialState = {
          minesweeper: {
            board: copyBoard(testBoard),
            gameOver: true,
            winner: true,
            difficulty: "Easy",
            winTime: 10,
            scores: {
              Easy: [],
              Medium: [],
              Hard: [],
            },
            isFetched: false,
          },
        };

        store = createStore(
          rootReducer,
          initialState,
          composeEnhancers(applyMiddleware(thunk))
        );

        return store.dispatch(fetchScores());
      });

      afterEach(() => {
        window.fetch = originalFetch;
      });

      it("should do nothing", () => {
        expect(fetch).toHaveBeenCalled();
        expect(store.getState().minesweeper.scores.Easy).toEqual([]);
      });
    });
  });

  describe("saveFetchedScores action", () => {
    let store;
    let initialState;

    const fetched = {
      Easy: { "Fire 1": 888, "Water 1": 111 },
      Medium: { "Fire 2": 999, "Water 2": 1002 },
      Hard: { "Fire 3": 777 },
    };

    beforeEach(() => {
      initialState = {
        minesweeper: {
          board: copyBoard(testBoard),
          gameOver: true,
          winner: true,
          difficulty: "Easy",
          winTime: 10,
          scores: {
            Easy: [],
            Medium: [],
            Hard: [],
          },
        },
      };

      store = createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(thunk))
      );

      return store.dispatch(saveFetchedScores(fetched));
    });

    it("should save the scores", () => {
      expect(store.getState().minesweeper.scores.Easy).toEqual([
        { name: "Water 1", score: 111 },
        { name: "Fire 1", score: 888 },
      ]);
    });

    it("should mark high scores as fetched", () => {
      expect(store.getState().minesweeper.isFetched).toEqual(true);
    });
  });

  describe("postScore action", () => {
    describe("when successfully saved to firebase", () => {
      let store;
      let initialState;
      let originalFetch;
      const name = "test name";

      beforeEach(() => {
        originalFetch = window.fetch;
        window.fetch = jest
          .fn()
          .mockImplementation(() =>
            Promise.resolve({ json: () => Promise.resolve() })
          );
        initialState = {
          minesweeper: {
            board: copyBoard(testBoard),
            gameOver: true,
            winner: true,
            difficulty: "Easy",
            winTime: 10,
            scores: {
              Easy: [],
              Medium: [],
              Hard: [],
            },
            isFetched: false,
          },
        };

        store = createStore(
          rootReducer,
          initialState,
          composeEnhancers(applyMiddleware(thunk))
        );

        return store.dispatch(postScore(name));
      });

      afterEach(() => {
        window.fetch = originalFetch;
      });

      it("should fetch high scores", () => {
        expect(fetch).toHaveBeenCalled();
        expect(store.getState().minesweeper.scores["Easy"][0]).toEqual({
          name: name,
          score: 10,
        });
      });
    });
  });

  describe("submitScore action", () => {
    let store;
    let initialState;

    beforeEach(() => {
      initialState = {
        minesweeper: {
          board: copyBoard(testBoard),
          gameOver: true,
          winner: true,
          difficulty: "Easy",
          winTime: 10,
          scores: {
            Easy: [
              { name: "bob", score: 22 },
              { name: "bill", score: 28 },
              { name: "bob2", score: 32 },
              { name: "bill2", score: 55 },
              { name: "bob3", score: 59 },
              { name: "bill3", score: 65 },
              { name: "bob4", score: 72 },
              { name: "bill4", score: 95 },
              { name: "bob5", score: 100 },
              { name: "bill5", score: 155 },
            ],
            Medium: [
              { name: "mark", score: 25 },
              { name: "matt", score: 88 },
            ],
            Hard: [
              { name: "jeff", score: 122 },
              { name: "jack", score: 999 },
            ],
          },
        },
      };

      store = createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(thunk))
      );

      return;
    });

    it("should save the score", () => {
      store.dispatch(submitScore("test name"));
      expect(store.getState().minesweeper.scores.Easy[0]).toEqual({
        name: "test name",
        score: 10,
      });
    });

    it("should not save the score if not better than 10th place", () => {
      initialState.minesweeper.winTime = 160;
      store.dispatch(submitScore("test name"));
      expect(store.getState().minesweeper.scores.Easy).toEqual([
        { name: "bob", score: 22 },
        { name: "bill", score: 28 },
        { name: "bob2", score: 32 },
        { name: "bill2", score: 55 },
        { name: "bob3", score: 59 },
        { name: "bill3", score: 65 },
        { name: "bob4", score: 72 },
        { name: "bill4", score: 95 },
        { name: "bob5", score: 100 },
        { name: "bill5", score: 155 },
      ]);
    });
  });
});
