# Create function for creating the list of data from file
def get_list():
    
    with open('sudoku test puzzle.txt', 'r', encoding='UTF-8') as puzzle:
        
        board = [line.strip() for line in puzzle.readlines()]
        
        
        return board

# Create a function to display board with data from file
def display_board():
    board = get_list()      #Call in board from previous function
    

        
    print(board)
        
            
display_board()



