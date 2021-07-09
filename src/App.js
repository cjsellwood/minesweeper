import React from "react";
import { connect } from "react-redux";
import DifficultyForm from "./components/DifficultyForm";
import Gameboard from "./components/Gameboard";
import EndScreen from "./components/EndScreen";
import "./reset.css";
import "./App.css";

const App = (props) => {
  return (
    <div className="App">
      {props.startGame ? null : (
        <div className="start-screen">
          <h1>Minesweeper</h1>
          <div className="mouse-rules">
            <p>Left click a square to clear a space</p>
            <p>Right click a square to flag a mine</p>
          </div>
          <div className="touch-rules">
            <p>Touch a square to mark a clear space</p>
            <p>Hold on a square to flag a mine</p>
          </div>
          <DifficultyForm />
        </div>
      )}
      {props.startGame ? <Gameboard /> : null}
      {props.gameOver ? <EndScreen /> : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    startGame: state.minesweeper.startGame,
    gameOver: state.minesweeper.gameOver,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
