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

// Check input for duplicate entries
const findDuplicate = arr => {
    const arrayWithNoEmptySpaces = removeEmptySpaces(arr);
    const duplicate = new Set(arrayWithNoEmptySpaces);
    if (arrayWithNoEmptySpaces.length !== duplicate.size) {
        return false;
    } else {
        return true;
    }
}

// Remove 0's from input
const removeEmptySpaces = (inputArray) => {
    return inputArray.filter(number => number != 0);
}

export default isBoardValid;