const copyBoard = (board) => {
  let boardCopy = [];
  for (let i = 0; i < board.length; i++) {
    const row = [];
    for (let j = 0; j < board[i].length; j++) {
      row.push({
        ...board[i][j],
      });
    }
    boardCopy.push(row);
  }
  return boardCopy;
};

export default copyBoard;
