def sudoku_grid():
    # define row and col length
    rows = 9
    cols = 9

    # initialize the board
    with open('sudoku test puzzle.txt', 'r+') as puzzle:
        board = [line.rstrip() for line in puzzle.readlines()]

    # print the board
    for i in range(0, rows):
        print()
        if i % 3 == 0 and i != 0:
            print("- - - + - - - + - - -")

        for j in range(0, cols):
            if j % 3 == 0 and j != 0:
                print("|", end=" ")
            print(board[i][j], end=" ")
    print()


def find_next(board):

    for i in range(len(board)):
        for j in range(len(board[0])):
            if board[i][j] == 0:
                return (i, j)  # row, col

    return None


sudoku_grid()