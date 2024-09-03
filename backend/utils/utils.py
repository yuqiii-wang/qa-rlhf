import os
from flask import Flask, request, jsonify, send_file, make_response
from config import LOCAL_INPUT_IMAGE_DIR

def find_project_root(search_file="app.py"):
    # Start from the current directory
    current_dir = os.path.dirname(os.path.abspath(__file__))

    while current_dir != os.path.dirname(current_dir):  # While we're not at the root
        if search_file in os.listdir(current_dir):
            return current_dir
        # Move up one directory level
        current_dir = os.path.dirname(current_dir)
    
    return None  # If the file is not found

def user_login(user_sessions:dict):
    user_id = request.args.get("user_id", -1)
    user_sessions[user_id] = {}

def user_input_parser(user_sessions:dict):
    user_id = request.args.get("user_id", -1)
    question_id = request.args.get("question_id", -1)
    solution_id = request.args.get("solution_id", -1)
    code_id = request.args.get("code_id", -1)
    user_sessions[user_id]["question_id"] = question_id
    user_sessions[user_id]["solution_id"] = solution_id
    user_sessions[user_id]["code_id"] = code_id
    user_sessions[user_id]["command"] = None
    if 'file' in request.files:
        file = request.files['file']
        # Check if the user actually uploaded a file
        if file.filename != '':
            # Save the file or perform your processing
            file.save(os.path.join(LOCAL_INPUT_IMAGE_DIR, file.filename))
            user_sessions[user_id]["file"] = file.filename
            return jsonify({"message": "File uploaded successfully", "filename": file.filename}), 200
        else:
            return jsonify({"message": "No file selected for uploading"}), 400
    else:
        # If no file is present, you can handle the other data
        data = request.form.to_dict()
        user_sessions[user_id]["command"] = data["command"]
