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
async function displaySolveBoard(table) {
    let solve = await import("./modules/solve.js");
    let validate = await import("./modules/validate.js");
    let inputs = readTable(table);
    let validInput = validate.default(inputs);
        try {
            if (validInput) {
            let solved = solve.default(inputs);
            for (let i = 0; i < table.rows.length; i++) {
                for (let j = 0; j < table.rows[i].cells.length; j++) {
                    table.rows[i].cells[j].innerHTML = solved[i][j];
                    }
                }
            } else {
                throw "Please ensure you have entered a valid board.";
            }
        } catch (err) {
            alert(err);
        }
    }