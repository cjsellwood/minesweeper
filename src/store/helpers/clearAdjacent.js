// Check 8 surrounding tiles for non cleared recursively
export const checkSurrounds = (board, row, col) => {
  for (let i = row - 1; i <= row + 1; i++) {
    for (let j = col - 1; j <= col + 1; j++) {
      // Continue if square is outside boundary
      if (i <= -1 || i >= board.length || j <= -1 || j >= board[i].length) {
        continue;
      }
      if (!board[i][j].clear) {
        // If not a mine mark clear
        board[i][j].clear = true;
        if (board[i][j].adjacent === 0) {
          // Check 8 surrounding tiles of tile with no adjacent mines
          checkSurrounds(board, i, j);
        }
      }
    }
  }
};

// Clear all connected spots with 0 adjacent mines
const clearAdjacent = (board, row, col) => {
  checkSurrounds(board, row, col);
  return board;
};

export default clearAdjacent;
