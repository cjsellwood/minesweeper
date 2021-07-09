import React from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";

export const DifficultyForm = (props) => {
  const handleChange = (e) => {
    props.storeDifficulty(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.startGame(props.difficulty);
  };

  return (
    <form onSubmit={handleSubmit} className="DifficultyForm">
      <h2>Choose Difficulty</h2>
      <div className="radio-container">
        <div>
          <input
            type="radio"
            name="difficulty"
            id="Easy"
            value="Easy"
            defaultChecked={props.difficulty === "Easy"}
            onChange={handleChange}
            data-testid="easy-difficulty"
          />
          <label htmlFor="Easy">Easy</label>
        </div>
        <div>
          <input
            type="radio"
            name="difficulty"
            id="Medium"
            value="Medium"
            defaultChecked={props.difficulty === "Medium"}
            onChange={handleChange}
            data-testid="medium-difficulty"
          />
          <label htmlFor="Medium">Medium</label>
        </div>
        <div>
          <input
            type="radio"
            name="difficulty"
            id="Hard"
            value="Hard"
            defaultChecked={props.difficulty === "Hard"}
            onChange={handleChange}
          />
          <label htmlFor="Hard">Hard</label>
        </div>
      </div>
      <div className="center-container">
        <button className="button" type="submit">Start</button>
      </div>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    difficulty: state.minesweeper.difficulty,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeDifficulty: (difficulty) => {
      dispatch(actions.storeDifficulty(difficulty));
    },
    startGame: (difficulty) => {
      dispatch(actions.startGame(difficulty));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DifficultyForm);
