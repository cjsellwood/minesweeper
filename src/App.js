import React from "react";
import { connect } from "react-redux";
import DifficultyForm from "./components/DifficultyForm";
import Gameboard from "./components/Gameboard";
import "./reset.css";
import "./App.css";

const App = (props) => {
  return (
    <div className="App">
      {props.startGame ? null : (
        <div>
          <h1>Minesweeper</h1>
          <div>
            <p>Left click a square to mark a clear space</p>
            <p>Right click a square to flag a mine</p>
          </div>
          <DifficultyForm />
        </div>
      )}
      {props.startGame ? <Gameboard /> : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    startGame: state.minesweeper.startGame,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);