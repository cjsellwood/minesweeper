import React from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";

export const Gameboard = (props) => {
  const handleRightClick = (e, row, col) => {
    e.preventDefault();
    props.flagSquare(row, col);
  };

  const handleClick = (row, col) => {
    if (props.gameOver) {
      return;
    }
    props.clearSquare(row, col);
  };

  // Add id for testing cypress win condition clicking all non mines
  let cypressId = null;
  if (process.env.NODE_ENV === "development") {
    cypressId = "no-mine";
  }

  return (
    <div className="Gameboard">
      {props.board.map((row, i) => {
        return (
          <div key={i} className="row">
            {row.map((square, j) => {
              return (
                <div
                  key={`${i}-${j}`}
                  data-row={i}
                  data-column={j}
                  data-testid="square"
                  data-cypress={square.mine ? null : cypressId}
                  className="square"
                  onContextMenu={(e) => handleRightClick(e, i, j)}
                  onClick={() => handleClick(i, j)}
                >
                  {square.mine && props.gameOver && !props.winner ? (
                    <p className="mine">💣</p>
                  ) : null}
                  {square.adjacent > 0 && square.clear ? (
                    <p>{square.adjacent}</p>
                  ) : null}
                  {square.flag ||
                  (props.gameOver && props.winner && square.mine) ? (
                      <div className="flag">
                        <p>🏁</p>
                      </div>
                    ) : null}
                  {!square.clear ? (
                    <p
                      className={
                        !props.gameOver ? "unclear" : "unclear-no-hover"
                      }
                    ></p>
                  ) : null}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    board: state.minesweeper.board,
    gameOver: state.minesweeper.gameOver,
    winner: state.minesweeper.winner,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    flagSquare: (row, column) => {
      dispatch(actions.flagSquare(row, column));
    },
    clearSquare: (row, column) => {
      dispatch(actions.clearSquare(row, column));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Gameboard);