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
};

// Helper functions for solver

// Finds empty values in array and return to solve
const findNextEmpty = board => {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === 0)
                return [i, j];
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
    boxRow = Math.floor(row / 3) * 3;
    boxCol = Math.floor(col / 3) * 3;
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
    if (checkRow(board, row, num) &&
        checkCol(board,col, num) &&
        checkSubGrid(board, row, col, num)) {
            return true;
        }
    return false;
};

export {solveBoard, findNextEmpty, checkRow, checkCol, checkSubGrid, checkNum};