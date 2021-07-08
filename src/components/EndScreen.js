import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";

export const EndScreen = (props) => {
  const [worstScore, setWorstScore] = useState(9999999);

  useEffect(() => {
    // Fetch high scores on first load
    if (!props.isFetched) {
      props.fetchScores();
    }

    // Calculate worst score on scoreboard to beat
    if (props.scores[props.difficulty].length < 10) {
      setWorstScore(9999999);
    } else {
      setWorstScore(props.scores[props.difficulty][9]);
    }

    // eslint-disable-next-line
  }, []);

  const [name, setName] = useState("");
  const handleChange = (e) => {
    setName(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Only submit if will be on scoreboard
    if (props.winTime < worstScore) {
      props.postScore(name, props.winTime, props.difficulty);
    }
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

      {props.winner && props.winTime < worstScore ? (
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
    difficulty: state.minesweeper.difficulty,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    restartGame: () => {
      dispatch(actions.restartGame());
    },
    postScore: (name, winTime, difficulty, worstScore) => {
      dispatch(actions.postScore(name, winTime, difficulty, worstScore));
    },
    fetchScores: () => {
      dispatch(actions.fetchScores());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EndScreen);
