let sudokuGrid = [
  [0, 8, 0, 7, 0, 0, 0, 0, 2],
  [0, 0, 7, 0, 0, 0, 4, 0, 0],
  [9, 4, 0, 0, 0, 3, 5, 0, 0],
  [4, 0, 0, 5, 2, 0, 0, 0, 0],
  [5, 0, 0, 8, 0, 1, 0, 0, 4],
  [0, 0, 0, 0, 3, 9, 0, 0, 6],
  [0, 0, 4, 3, 0, 0, 0, 2, 8],
  [0, 0, 8, 0, 0, 0, 1, 0, 0],
  [2, 0, 0, 0, 0, 4, 0, 6, 0],
];

const getRow = (board, row) => {
  // Return a single row from the board
  return board[row];
};
const printCell = (value) => {
  if (Array.isArray(value)) {
    return 0;
  } else {
    return value;
  }
};
const displayBoard = (sudokuGrid) => {
  console.log();
  for (i = 0; i < 9; i++) {
    let row = getRow(sudokuGrid, i);
    if (i % 3 == 0 && i !== 0) {
      console.log("- - - + - - - + - - -");
    }
    console.log(
      printCell(row[0]),
      printCell(row[1]),
      printCell(row[2]),
      "|",
      printCell(row[3]),
      printCell(row[4]),
      printCell(row[5]),
      "|",
      printCell(row[6]),
      printCell(row[7]),
      printCell(row[8])
    );
  }
};

// Solve board
function solveBoard(board) {
  //console.log(board);
  let find = findNextEmpty(board);
  let row = find[0];
  let col = find[1];
  if (row === -1) {
    return board;
  }
  for (let i = 1; i <= 9; i++) {
    if (checkNum(board, row, col, i)) {
      board[row][col] = i;
      solveBoard(board);
    }
  }
  if (findNextEmpty(board)[0] !== -1) {
    board[row][col] = 0;
  }
  return board;
}

// Helper functions for solver

// Finds empty values in array and return to solve
const findNextEmpty = (board) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) return [i, j];
    }
  }
  return [-1, -1];
};

// Checks row for valid input
const checkRow = (board, row, num) => {
  for (let i = 0; i < board[0].length; i++) {
    if (board[row][i] === num) {
      return false;
    }
  }
  return true;
};

// Check column for valid input
const checkCol = (board, col, num) => {
  for (let i = 0; i < board.length; i++) {
    if (board[i][col] === num) {
      return false;
    }
  }
  return true;
};

// Check 3x3 grid for valid input
const checkSubGrid = (board, row, col, num) => {
  let boxRow = Math.floor(row / 3) * 3;
  let boxCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[boxRow + i][boxCol + j] === num) {
        return false;
      }
    }
  }
  return true;
};

// Checks number that was placed into board to ensure if board is valid
const checkNum = (board, row, col, num) => {
  if (
    checkRow(board, row, num) &&
    checkCol(board, col, num) &&
    checkSubGrid(board, row, col, num)
  ) {
    return true;
  }
  return false;
};

// Check board for duplicate input entries for verification
function isBoardValid(board) {
  let isInputValid = true;
  let rows = [];
  let cols = [];
  let boxes = [];
  for (let i = 0; i < 9; i++) {
    rows.push([]);
    cols.push([]);
    boxes.push([]);
  }
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      let cell = board[r][c];
      let boxIndex = Math.floor(r / 3) * 3 + Math.floor(c / 3);
      rows[r].push(cell);
      cols[c].push(cell);
      boxes[boxIndex].push(cell);
    }
  }
  rows.forEach((row) => {
    if (findDuplicate(row) == false) {
      isInputValid = false;
    }
  });
  cols.forEach((col) => {
    if (findDuplicate(col) == false) {
      isInputValid = false;
    }
  });
  boxes.forEach((box) => {
    if (findDuplicate(box) == false) {
      isInputValid = false;
    }
  });
  return isInputValid;
}

// Check input for duplicate entries
const findDuplicate = (arr) => {
  const arrayWithNoEmptySpaces = removeEmptySpaces(arr);
  const duplicate = new Set(arrayWithNoEmptySpaces);
  if (arrayWithNoEmptySpaces.length !== duplicate.size) {
    return false;
  } else {
    return true;
  }
};

// Remove 0's from input
const removeEmptySpaces = (inputArray) => {
  return inputArray.filter((number) => number != 0);
};

displayBoard(sudokuGrid);
console.log("");
console.log("----------------------");
// console.log(`Is this board valid: ${isBoardValid(sudokuGrid)}`);
let validInput = isBoardValid(sudokuGrid);
try {
  if (validInput) {
    solveBoard(sudokuGrid);
    displayBoard(sudokuGrid);
  } else {
    throw "Please ensure you have entered a valid board";
  }
} catch (err) {
  console.log(err);
}
