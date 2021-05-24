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

/*
let sudokuGrid = [
    [1,8,3,7,4,5,6,9,2],
    [6,5,7,2,9,8,4,3,1],
    [9,4,2,6,1,3,5,8,7],
    [4,3,6,5,2,7,8,1,9],
    [5,2,9,8,6,1,3,7,4],
    [8,7,1,4,3,9,2,5,6],
    [7,1,4,3,5,6,9,2,8],
    [3,6,8,9,7,2,1,4,5],
    [2,9,5,1,8,4,7,6,3]
]
*/
const getRow = (board, row) => {
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
    for (let i = 0; i < sudokuGrid.length; i++) {
        for (let j = 0; j < sudokuGrid[i].length; j++) {
            if (sudokuGrid[i][j] == 0) {
                return [i, j];
            }
        }
    }
};

const solveBoard = board => {
    let find = findNextEmpty(board);
    if (!find) {
        return true;
    } else {
        sudokuGrid[i][j] = find;
    }
    for (i=0;i<=9;i++) {
        if (validBoard(sudokuGrid, i, find)) {
            board[row][col] = i;
        }
        if (solveBoard(sudokuGrid) === true) {
            return;
        }
        board[row][col] = 0;
    } return false;
};

const validBoard = (sudokuGrid, num, pos) => {
    for (i=0;i<sudokuGrid[i].length; i++) {
        if (sudokuGrid[pos[0]][i] === num && pos[1] !== i) {
            return false;
        };
    }
    for (i = 0;i<sudokuGrid.length;i++) {
        if(sudokuGrid[i][pos[1]] === num && pos[0] !== i) {
            return false;
        };
    }
    let boxRow = Math.floor(pos[1] / 3);
    let boxCol = Math.floor(pos[0] / 3);
    for(i=0;i<boxCol*3,(boxCol*3)+3;i++){
        for (j=0;j<boxRow*3,(boxRow*3)+3;j++) {
            if(sudokuGrid[i][j] == num && [i,j] !== pos) {
                return false;
            }
        }
    } return true
};

displayBoard(sudokuGrid);
console.log('----------------------');
solveBoard(sudokuGrid);
displayBoard(sudokuGrid);