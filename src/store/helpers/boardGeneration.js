// Generate empty board
export const generateBoard = (difficulty) => {
  let size;
  switch (difficulty) {
    case "Easy":
      size = 10;
      break;
    case "Medium":
      size = 20;
      break;
    case "Hard":
      size = 30;
      break;
    default:
      break;
  }

  let array = [];
  for (let i = 0; i < size; i++) {
    let row = [];
    for (let j = 0; j < size; j++) {
      row.push({
        clear: false,
        mine: false,
        flag: false,
        adjacent: 0,
      });
    }
    array.push(row);
  }

  return array;
};

// Turn 2 dimensional array into 1 dimensional array
export const flattenArray = (array) => {
  return array.reduce((acc, cur) => {
    return [...acc, ...cur];
  }, []);
};

// Add mines to board
export const populateMines = (difficulty, board) => {
  let mines;
  switch (difficulty) {
    case "Easy":
      mines = 15;
      break;
    case "Medium":
      mines = 60;
      break;
    case "Hard":
      mines = 135;
      break;
    default:
      break;
  }

  // Randomly insert mines until desired amount added
  while (
    flattenArray(board).filter((square) => square.mine === true).length < mines
  ) {
    const row = Math.floor(Math.random() * board.length);
    const column = Math.floor(Math.random() * board.length);
    board[row][column].mine = true;
  }

  return board;
};

// Calculate the adjacent mines to each square
export const calculateAdjacent = (board) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      // Continue if square is a mine
      if (board[i][j].mine) {
        continue;
      }
      // For each square check the 8 squares surrounding it
      for (let x = i - 1; x <= i + 1; x++) {
        for (let y = j - 1; y <= j + 1; y++) {
          // Continue if square is outside boundary
          if (x <= -1 || x >= board.length || y <= -1 || y >= board[i].length) {
            continue;
          }
          if (board[x][y].mine) {
            board[i][j].adjacent = board[i][j].adjacent + 1;
          }
        }
      }
    }
  }
  return board;
};