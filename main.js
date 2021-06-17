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

const createSubmit = (sudokuGrid) => {
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
    });
    // submitBtn.addEventListener("click", () => {
    //     displaySolveBoard(sudokuGrid);
    // });
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
    let sudokuGr = [];
    nodes.forEach(row => {
        let rows = [];
        row.childNodes.forEach(col =>{
            col.childNodes.forEach(cell =>{
                cell.setAttribute("id", "cell " + cellCount);
                cellCount++;
                if (cell.value == "") {
                    cell.value = 0;
                } else {
                    cell.value;
                }
                rows.push(cell.value);
            })
        })
        sudokuGr.push(rows);
    }); 
    return sudokuGr;
}
let sudokuGrid = readTable(table);
//console.log(board);
    //console.log(sudokuGr);
function displaySolveBoard (sudokuGrid) {    
    let solved = solveBoard(sudokuGrid);
    board = document.getElementById("board");
    for (let i = 0; i < board.rows.length; i++) {
        for (let j = 0; j < board.rows[i].cells.length; j++) {
            board.rows[i].cells[j].innerHTML = solved[i][j];
        }
    }
}

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
    let find = findNextEmpty(sudokuGr);
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