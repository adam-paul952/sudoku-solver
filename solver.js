let sudokuGrid = [
    [0,8,0,7,0,0,0,0,2],
    [1,0,7,0,0,0,4,0,0],
    [9,4,0,0,0,3,5,0,0],
    [4,0,0,5,2,0,0,0,0],
    [5,0,0,8,0,1,0,0,4],
    [0,0,0,0,3,9,0,0,6],
    [0,0,4,3,0,0,0,2,8],
    [0,0,8,0,0,0,1,0,0],
    [2,0,0,0,0,4,0,6,0]
];

const getRow = (board, row) => {
    // Return a single row from the board
    return board[row];
};
const printCell = value => {
    if (Array.isArray(value)) {
        return 0;
    } else {
        return value;
    }
};
const displayBoard = sudokuGrid => {
    console.log();
    for (i = 0; i < 9; i++) {
        let row = getRow(sudokuGrid, i);
        if (i % 3 == 0 && i !== 0) {
            console.log('- - - + - - - + - - -');
        }
        console.log(printCell(row[0]), printCell(row[1]), printCell(row[2]), '|',
                    printCell(row[3]), printCell(row[4]), printCell(row[5]), '|',
                    printCell(row[6]), printCell(row[7]), printCell(row[8]))
    }
};
const findNextEmpty = sudokuGrid => {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (sudokuGrid[i][j] === 0)
                return [i, j];
        }
    }
    return [-1, -1];
};
const solveBoard = board => {
    //console.log(sudokuGrid)
    let find = findNextEmpty(sudokuGrid);
    let row = find[0];
    let col = find[1];
    if (row === -1) {
        return sudokuGrid;
    }
    for (let i = 1; i <= 9; i++) {
        if (checkNum(board, row, col, i)) {
            board[row][col] = i;
            solveBoard(sudokuGrid);
            }
        }
        if (findNextEmpty(sudokuGrid)[0] !== -1) {
            sudokuGrid[row][col] = 0;
        }
        // try {
        //     if (isBoardValid(board) == false);
        //     throw TypeError("Invalid Board");
        // } catch (err) {
        //     console.log(err);
        // }
    return sudokuGrid;
};
const checkRow = (board, row, num) => {
    for (let i = 0; i < board[row].length; i++) {
        if (board[row][i] === num) {
            return false;
        }
    }
    return true;
};
const checkCol = (board, col, num) => {
    for (let i = 0; i < board.length; i++) {
        if (board[i][col] === num) {
            return false;
        }
    }
    return true;
};
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
const checkNum = (board, row, col, num) => {
    if (checkRow(board, row, num) &&
        checkCol(board,col, num) &&
        checkSubGrid(board, row, col, num)) {
            return true;
        }
    return false;
};

// function isBoardValid(board) {
//     let validBoard = solveBoard(board);
//     try {
//         if (!!(validBoard)) {
//             throw "Impossible board";
//         }
//     } catch (err) {
//             console.log(err);
//     }
// }

function isBoardValid(board) {
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
            if (cell) {
                if (rows[r].includes(cell)) {
                    return false;
                } else {
                    rows[r].push(cell);
                }
            }   if (cols[c].includes(cell)) {
                    return false;
            } else {
                cols[c].push(cell);
            }
            let boxIndex = Math.floor((r / 3)) * 3 + Math.floor(c / 3);
            if (boxes[boxIndex].includes(cell)) {
                return false;
            } else {
                boxes[boxIndex].push(cell);
            }
        }
    }
    return true;
    // console.log(rows);
    // console.log(cols);
    // console.log(boxes);
}

displayBoard(sudokuGrid);
console.log('');
console.log('----------------------');
//isBoardValid(sudokuGrid);
solveBoard(sudokuGrid);
//displayBoard(sudokuGrid);
