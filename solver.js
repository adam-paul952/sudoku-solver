
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

// displayBoard(sudokuGrid);
// console.log('');
// console.log('----------------------');
// solveBoard(sudokuGrid);
// displayBoard(sudokuGrid);

const generateBoard = () => {
    //Call div for containing table
    let sudokuGrid = document.getElementById("container");
    
    //Create table and table body
    let grid = document.createElement("table");
    let tbody = document.createElement("tbody");
    
    //Create rows and cols
    for (let i = 0; i < 9; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < 9; j++) {
            let col = document.createElement("td");
            
            // Create Cell Input and set max and min
            let cell = document.createElement("input");
            cell.setAttribute("type", "number");
            cell.setAttribute("min", 0);
            cell.setAttribute("max", 9);
            cell.setAttribute("name", "cell");
            cell.setAttribute("contentEditable", "true");
            cell.setAttribute("value", "")
            cell.setAttribute("placeholder", "0");
            
            col.appendChild(cell);
            row.appendChild(col);
        }
        tbody.appendChild(row);
    } 
    grid.appendChild(tbody);
    tbody.setAttribute("id", "board");
    sudokuGrid.appendChild(grid);
}

const createSubmit = () => {
    let submitBtn = document.getElementById("submit");
    submitBtn = document.createElement("input");
    submitBtn.setAttribute("type", "button");
    submitBtn.setAttribute("id", "submitButton")
    submitBtn.setAttribute("name", "Solve");
    submitBtn.setAttribute("value", "Solve");
    let btn = document.getElementById("btn");
    const grid = document.getElementById("board");
    submitBtn.addEventListener("click", () => {
        readTable(grid);
        console.log("submitted");
    });
    btn.appendChild(submitBtn)
}

const createReset = () => {
    let resetBtn = document.getElementById("reset");
    resetBtn = document.createElement("input");
    resetBtn.setAttribute("type", "button");
    resetBtn.setAttribute("name", "Reset");
    resetBtn.setAttribute("value", "Reset");
    let btn = document.getElementById("btn");
    btn.appendChild(resetBtn);
}

// Function to parse through HTML table and return values
// and execute solver
function readTable(table) {
    const nodeNumbers = table.childNodes.length;
    const nodes = table.childNodes;
    let cellCount = 1;
    nodes.forEach(row => {
        row.childNodes.forEach(col =>{
            col.setAttribute("id", "cell " + cellCount);
            let input = document.getElementById("cell " + cellCount).values;
            cellCount++;
            console.log(input);
        })
    })
}

// Function to set answers in the table

// Function to catch any errors to detect an
// unsolvable board
