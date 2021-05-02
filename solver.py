# Create function for creating the list of data from file
def get_list():
    
    with open('blank puzzle.txt', 'r+', encoding='UTF-8') as puzzle:
        
        board = [[line.strip()] for line in puzzle.readlines()]
        # board = []
        # lines = puzzle.readlines()
        # for line in lines:
        #     if line != '':
        #         board.append(line.strip())
        #     else:
        #         print('----------------------')
        
        return board
        

# Create a function to display board with data from file
def display_board():
    board = get_list()      #Call in board from previous function
    for i in board:
        line_counter = 0
        if line_counter % 3 == 0 and line_counter != 0:
            line_counter += 1
            
            print('- - - + - - - + - - -')
            
            for j in i:
                digit_counter = 0
                if digit_counter % 3 == 0 and digit_counter != 0:
                    digit_counter += 1
                    print(' | ')
                    print(board[i][j] + ' ')
                else:
                    print(board[i][j] + ' ')   
        # else:
        #     for j in range(len(board[i])):
        #         if j % 3 == 0 and j != 0:
        #             print(' | ')
        #             print(board[i][j][0] + ' ')
        #         else:
        #             print(board[i][j][0] + ' ')

        

        

        
    #print(board)
        
            
display_board()



