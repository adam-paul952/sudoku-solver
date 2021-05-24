def get_list():
    """ Open file, iterate through all objects, append to board, return board to function """
    with open('blank puzzle.txt', 'r+', encoding='UTF-8') as puzzle:
        board = []                            
        for line in puzzle.readlines():     
            grid = []
            for i in line.strip():
                i = int(i)
                grid.append(i)
            board.append(grid)
        
        return board

def display_board(board):
    """ Display board for sudoku board with use of line and digit counters """
    line_counter = -1
    for i in range(len(board)):
        print()
        line_counter += 1
        if line_counter == 3 or line_counter == 6:
            print('- - - + - - - + - - -')
        elif line_counter == 9:
            print('')
            print('---------------------')
            line_counter = -1
            continue
        digit_counter = -1
        for j in range(len(board[0])):          
            digit_counter += 1
            if digit_counter == 3 or digit_counter == 6:
                print('| ', end='')
            print(board[i][j], end=' ')
            
def find_empty(board):
    """ Search board for any 0 values to return postion, if no 0 found, return a value of None """
    for i in range(len(board)):                         # Parse through rows and cols to find       #
        for j in range(len(board[0])):                  # an empty square to begin trying solutions #
            if board[i][j] == 0:
                return (i, j)
    return None

def solve(board):
    """ Attempt to fill the board with valid numbers recursively, once all loops are satisfied """
    find = find_empty(board)
    if not find:
        return True
    else:
        row, col = find
        
    for i in range(1, 10):
        if valid(board, i, find):
            board[row][col] = i
            
            if solve(board):
                return True

            board[row][col] = 0
            
    return False

def valid(board, num, pos):
    """ Ensure board is valid along rows, columns, and 3x3 grids """
    # Check Rows
    for i in range(len(board[0])):
        if board[pos[0]][i] == num and pos[1] != i:
            return False
    # Check Cols
    for i in range(len(board)):
        if board[i][pos[1]] == num and pos[0] != i:
            return False
    # Check 3x3 Grids
    box_x = pos[1] // 3
    box_y = pos[0] // 3
    for i in range(box_y*3, (box_y*3) + 3):
        for j in range(box_x*3, (box_x*3) + 3):
            if board[i][j] == num and (i, j) != pos:
                return False
    return True


board = get_list()
display_board(board)
solve(board)
print('')
print('______________________')
display_board(board)
