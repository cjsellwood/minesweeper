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

      {props.isFetched ? (
        <div className="scoreboard">
          <div>
            <h2>Easy</h2>
            <div>
              <ul>
                {props.scores["Easy"].map((score, i) => {
                  return <li key={"Easy-place-" + i}>{i + 1}.</li>;
                })}
              </ul>
              <ul>
                {props.scores["Easy"].map((score, i) => {
                  return <li key={"Easy-name-" + i}>{score.name}</li>;
                })}
              </ul>
              <ul>
                {props.scores["Easy"].map((score, i) => {
                  return <li key={"Easy-score-" + i}>{score.score}</li>;
                })}
              </ul>
            </div>
          </div>
          <div>
            <h2>Medium</h2>
            <div>
              <ul>
                {props.scores["Medium"].map((score, i) => {
                  return <li key={"Medium-place-" + i}>{i + 1}.</li>;
                })}
              </ul>
              <ul>
                {props.scores["Medium"].map((score, i) => {
                  return <li key={"Medium-" + i}>{score.name}</li>;
                })}
              </ul>
              <ul>
                {props.scores["Medium"].map((score, i) => {
                  return <li key={"Medium-" + i}>{score.score}</li>;
                })}
              </ul>
            </div>
          </div>
          <div>
            <h2>Hard</h2>
            <div>
              <ul>
                {props.scores["Hard"].map((score, i) => {
                  return <li key={"Hard-place-" + i}>{i + 1}.</li>;
                })}
              </ul>
              <ul>
                {props.scores["Hard"].map((score, i) => {
                  return <li key={"Hard-" + i}>{score.name}</li>;
                })}
              </ul>
              <ul>
                {props.scores["Hard"].map((score, i) => {
                  return <li key={"Hard-" + i}>{score.score}</li>;
                })}
              </ul>
            </div>
          </div>
        </div>
      ) : null}

      {!props.scoreSubmitted && props.winner ? (
        <h2 className="win-time">Your Score: {props.winTime}</h2>
      ) : null}

      {!props.scoreSubmitted && props.winner && props.winTime < worstScore ? (
        <form className="name-form" onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="name">Enter Name</label>
          <input
            id="name"
            type="text"
            placeholder="Name"
            required
            maxLength="20"
            value={name}
            onChange={handleChange}
          />
          <button
            className="button small"
            type="submit"
            aria-label="submit score"
          >
            Submit Score
          </button>
        </form>
      ) : null}
      <button
        className="button"
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
    scoreSubmitted: state.minesweeper.scoreSubmitted,
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
