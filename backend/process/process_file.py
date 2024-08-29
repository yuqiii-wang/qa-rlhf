from flask import Flask, request, jsonify, send_file, make_response
import os
from config import LOCAL_INPUT_IMAGE_DIR

def process_upload_file(filename:str):
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Optionally, you can save the file to a directory
    file_path = os.path.join(LOCAL_INPUT_IMAGE_DIR, file.filename)
    file.save(file_path)

    # Get file detail
    file_detail = {
        'file_name': file.filename,
        'file_size': len(file.read()),
        'content_type': file.content_type
    }

    # To avoid file.read() affecting file.save(), the position should be reset
    file.seek(0)

    return jsonify(file_detail), 200

def process_delete_file(filename:str):
    file_path = os.path.join(LOCAL_INPUT_IMAGE_DIR, filename)
    # If file exists, delete it.
    if os.path.isfile(file_path):
        os.remove(file_path)
        return "File deleted", 200
    else:
        return "File not found", 404
