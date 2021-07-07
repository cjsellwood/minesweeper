import React from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";

export const EndScreen = (props) => {
  return (
    <div className="EndScreen">
      {props.winner ? <h1>You Win</h1> : <h1>You Lose</h1>}
      <button
        className="restart-button"
        onClick={props.restartGame}
        aria-label="restart game"
      >
        Restart
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    gameOver: state.minesweeper.gameOver,
    winner: state.minesweeper.winner,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    restartGame: () => {
      dispatch(actions.restartGame());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EndScreen);
