import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";
import MineSVG from "./MineSVG";
import NumberSVG from "./NumberSVG";

export const Gameboard = (props) => {
  const handleRightClick = (e, row, col) => {
    if (props.gameOver) {
      return;
    }
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

  const [timeDisplay, setTimeDisplay] = useState(0);

  const timer = setInterval(() => {
    return setTimeDisplay(Math.floor((Date.now() - props.time) / 1000));
  }, 1000);

  useEffect(() => {
    return () => {
      setTimeDisplay(0);
      clearInterval(timer);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="Gameboard">
      <p className="timer">{!props.gameOver ? timeDisplay : props.winTime}</p>
      <div>
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
                      <div className="mine">
                        <MineSVG />
                      </div>
                    ) : null}
                    {square.adjacent > 0 && square.clear ? (
                      <div className="adjacent">
                        <NumberSVG number={square.adjacent} />
                      </div>
                    ) : null}
                    {(square.flag && !square.clear) ||
                    (props.gameOver && props.winner && square.mine) ? (
                      <div className="flag">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001" />
                        </svg>
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
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    board: state.minesweeper.board,
    gameOver: state.minesweeper.gameOver,
    winner: state.minesweeper.winner,
    time: state.minesweeper.time,
    winTime: state.minesweeper.winTime,
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
