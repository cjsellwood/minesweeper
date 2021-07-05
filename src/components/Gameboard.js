import React from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";

export const Gameboard = (props) => {
  const handleClick = (e, row, col) => {
    e.preventDefault();
    props.flagSquare(row, col);
  };
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
                  className="square"
                  onContextMenu={(e) => handleClick(e, i, j)}
                >
                  {square.mine && props.gameOver ? <p>💣</p> : null}
                  {(square.adjacent > 0 && square.clear) || props.gameOver ? (
                    <p>{square.adjacent}</p>
                  ) : null}
                  {square.flag ? (
                    <div className="flag">
                      <p>🏁</p>
                    </div>
                  ) : null}
                  {!square.clear ? <p className="unclear"></p> : null}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    flagSquare: (row, column) => {
      dispatch(actions.flagSquare(row, column));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Gameboard);
