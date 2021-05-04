def get_list():
    ''' Funtion to open file to create board and seperate boards'''
    with open('sudoku test puzzle.txt', 'r', encoding='UTF-8') as puzzle:
        
        board = [line.strip() for line in puzzle.readlines()]
        
        return board

def display_board(board):
    '''Funtion to display board in a sudoku grid'''
    line_counter = -1
    for i in range(len(board)):
        print()
        line_counter += 1
        if line_counter == 3 or line_counter == 6:
            print('- - - + - - - + - - -')
        elif line_counter == 9:
            print('')
            print('------------------------')
            line_counter = -1
            continue
        
        digit_counter = -1
        for j in range(len(board[i])):
            digit_counter += 1
            if digit_counter == 3 or digit_counter == 6:
                print('| ', end='')
            print(board[i][j], end=' ')
            
def find_empty(board):
    '''Funtion to find empty square'''
    pass

def solve(board):
    '''Function to solve board'''
    pass

def valid(board):
    '''Function to make sure board is valid'''
    pass

board = get_list()
display_board(board)