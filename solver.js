let sudokuGrid = [
    [0,8,0,7,0,0,0,0,2],
    [0,0,7,0,0,0,4,0,0],
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

let solver = require('./modules/solve.js');
let validate = require('modules/validate.js');
displayBoard(sudokuGrid);
console.log('');
console.log('----------------------');
//isBoardValid(sudokuGrid);
//solveBoard(sudokuGrid);
//displayBoard(sudokuGrid);

