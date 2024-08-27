import os

def find_project_root(search_file="app.py"):
    # Start from the current directory
    current_dir = os.path.dirname(os.path.abspath(__file__))

    while current_dir != os.path.dirname(current_dir):  # While we're not at the root
        if search_file in os.listdir(current_dir):
            return current_dir
        # Move up one directory level
        current_dir = os.path.dirname(current_dir)
    
    return None  # If the file is not found
