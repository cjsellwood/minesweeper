import React from "react";
import { connect } from "react-redux";

export const Gameboard = (props) => {
  return (
    <div className="Gameboard">
      {props.board.map((row, i) => {
        return (
          <div key={i} className="row">
            {row.map((square, j) => {
              return (
                <div key={`${i}-${j}`} data-testid="square" className="square">
                  {square.mine ? <p>💣</p> : null}
                  {square.adjacent > 0 ? <p>{square.adjacent}</p> : null}
                  {square.flag ? <p>🏁</p> : null}
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Gameboard);
