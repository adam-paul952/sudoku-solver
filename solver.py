def solve(board):
    '''Function to solve the board'''
    pass

def valid(board):
    '''Function to ensure the solved board is actually valid'''
    pass

def get_list():
    ''' Funtion to open file to create board'''
    with open('blank puzzle.txt', 'r', encoding='UTF-8') as puzzle:
        board = [line.strip() for line in puzzle.readlines()]

        return board

def find_next(board):
    '''Function to find space on board occupied by a 0'''
    for i in range(len(board)):
        for j in range(len(board[0])):
            if board[i][j] == 0:
                return i, j
    return None

def display_board(board):
    '''Function to create the board in a sudoku grid'''
    for i in range(len(board)):
        if i % 3 == 0 and i != 0:
            print('- - - + - - - + - - -')
        for j in range(len(board[0])):
            if j % 3 == 0 and j != 0:
                print('|', end=' ')
            print(board[i][j], end=' ')     # Need to reiterate over the file and re do for every extra puzzle in file #
        print()

board = get_list()
display_board(board)