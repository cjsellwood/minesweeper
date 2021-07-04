import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { storeDifficulty, startGame } from "../actions";
import minesweeper from "../reducers/minesweeper";

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
          },
        };

        store = createStore(
          rootReducer,
          initialState,
          composeEnhancers(applyMiddleware(thunk))
        );

        return store.dispatch(startGame());
      });

      it("should change startGame to true", () => {
        expect(store.getState().minesweeper.startGame).toEqual(true);
      });
    });
  });
});
