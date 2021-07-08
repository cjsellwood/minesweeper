import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";

export const EndScreen = (props) => {
  useEffect(() => {
    if (!props.isFetched) {
      props.fetchScores();
    }
    // eslint-disable-next-line
  }, []);

  const [name, setName] = useState("");
  const handleChange = (e) => {
    setName(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    props.submitScore(name);
  };
  return (
    <div className="EndScreen">
      {props.winner ? <h1>You Win</h1> : <h1>You Lose</h1>}
      {props.winner ? (
        <h2 className="win-time">Time: {props.winTime}s</h2>
      ) : null}

      {props.isFetched ? (
        <div>
          <div>
            <h2>Easy</h2>
            <ol>
              {props.scores["Easy"].map((score, i) => {
                return (
                  <li key={"Easy-" + i}>
                    <p>{score.name}</p> <p>{score.score}</p>
                  </li>
                );
              })}
            </ol>
          </div>
          <div>
            <h2>Medium</h2>
            <ol>
              {props.scores["Medium"].map((score, i) => {
                return (
                  <li key={"Medium-" + i}>
                    <p>{score.name}</p> <p>{score.score}</p>
                  </li>
                );
              })}
            </ol>
          </div>
          <div>
            <h2>Hard</h2>
            <ol>
              {props.scores["Hard"].map((score, i) => {
                return (
                  <li key={"Hard-" + i}>
                    <p>{score.name}</p> <p>{score.score}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      ) : null}

      {props.winner ? (
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="name">Enter Name</label>
          <input id="name" type="text" value={name} onChange={handleChange} />
          <button type="submit" aria-label="submit score">
            Submit Score
          </button>
        </form>
      ) : null}
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
    winTime: state.minesweeper.winTime,
    scores: state.minesweeper.scores,
    isFetched: state.minesweeper.isFetched,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    restartGame: () => {
      dispatch(actions.restartGame());
    },
    submitScore: (name) => {
      dispatch(actions.submitScore(name));
    },
    fetchScores: () => {
      dispatch(actions.fetchScores());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EndScreen);
