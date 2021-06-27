// Create HTML grid for board
const generateBoard = () => {
    // Call div for containing table
    let sudokuGrid = document.getElementById("container");

    // Create table and table body
    let grid = document.createElement("table");
    let tbody = document.createElement("tbody");

    // Create rows and cols
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
            cell.setAttribute("maxlength", "1")

            col.appendChild(cell);
            row.appendChild(col);
        }
        tbody.appendChild(row);
    }
    grid.appendChild(tbody);
    tbody.setAttribute("id", "board");
    sudokuGrid.appendChild(grid);
}

// Create solve button
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
            displaySolveBoard(grid);
    });
    btn.appendChild(submitBtn)
}
// Create reset button
const createReset = () => {
    let resetBtn = document.getElementById("resetBtn");
    resetBtn = document.createElement("input");
    resetBtn.setAttribute("type", "button");
    resetBtn.setAttribute("name", "Reset");
    resetBtn.setAttribute("value", "Reset");
    let btn = document.getElementById("btn");
    const grid = document.getElementById("board");
    resetBtn.addEventListener("click", () => {
        window.location.reload();
    })
    btn.appendChild(resetBtn);
}

// Parse through HTML table and return values
function readTable(table) {
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
                rows.push(parseInt(cell.value));
            })
        })
        sudokuGr.push(rows);
    });
    return sudokuGr;
}

// Call solve and display results in HTML table
function displaySolveBoard(table) {
    let inputs = readTable(table);
    let validInput = isBoardValid(inputs);
        try {
            if (validInput) {
            let solved = solveBoard(inputs);
            for (let i = 0; i < table.rows.length; i++) {
                for (let j = 0; j < table.rows[i].cells.length; j++) {
                    table.rows[i].cells[j].innerHTML = solved[i][j];
                    }
                }
            } else {
                throw "Please ensure you have enetered a valid board.";
            }
        } catch (err) {
            alert(err);
        }
    }

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
    } //debugger;
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let cell = board[r][c];
            let boxIndex = Math.floor((r / 3)) * 3 + Math.floor(c / 3);
            rows[r].push(cell);
            cols[c].push(cell);
            boxes[boxIndex].push(cell);
        }
    }
    rows.forEach(row => {
        if (findDuplicate(row) == false ) {
            isInputValid = false;
        }
    });
    cols.forEach(col => {
        if (findDuplicate(col) == false) {
            isInputValid = false;
        }
    });
    boxes.forEach(box => {
        if (findDuplicate(box) == false) {
            isInputValid = false
        }
    });
    return isInputValid;
}

const findDuplicate = arr => {
    const arrayWithNoEmptySpaces = removeEmptySpaces(arr);
    const duplicate = new Set(arrayWithNoEmptySpaces);
    if (arrayWithNoEmptySpaces.length !== duplicate.size) {
        return false;
    } else {
        return true;
    }
}

const removeEmptySpaces = (inputArray) => {
    return inputArray.filter(number => number != 0);
}
