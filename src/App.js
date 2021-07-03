import React from "react";
import DifficultyForm from "./components/DifficultyForm";

const App = () => {
  return (
    <div className="App">
      <div>
        <h1>Minesweeper</h1>
        <div>
          <p>Left click a square to mark a clear space</p>
          <p>Right click a square to flag a mine</p>
        </div>
        <DifficultyForm />
      </div>
    </div>
  );
};

export default App;
