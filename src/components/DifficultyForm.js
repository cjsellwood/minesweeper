import React, { useState, useEffect } from "react";

export const DifficultyForm = ({storeDifficulty}) => {
  const [difficulty, setDifficulty] = useState("Easy");
  useEffect(() => {}, [difficulty]);

  const handleChange = (e) => {
    setDifficulty(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    storeDifficulty(difficulty);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Choose Difficulty</h2>
      <div>
        <input
          type="radio"
          name="difficulty"
          id="Easy"
          value="Easy"
          defaultChecked={difficulty === "Easy"}
          onChange={handleChange}
          data-testid="easy-difficulty"
        />
        <label htmlFor="Easy">Easy</label>
        <input
          type="radio"
          name="difficulty"
          id="Medium"
          value="Medium"
          defaultChecked={difficulty === "Medium"}
          onChange={handleChange}
          data-testid="medium-difficulty"
        />
        <label htmlFor="Medium">Medium</label>
        <input
          type="radio"
          name="difficulty"
          id="Hard"
          value="Hard"
          defaultChecked={difficulty === "Hard"}
          onChange={handleChange}
        />
        <label htmlFor="Hard">Hard</label>
        <div>
          <button type="submit">Start</button>
        </div>
      </div>
    </form>
  );
};

export default DifficultyForm;
