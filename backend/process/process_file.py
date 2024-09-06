import io
from typing import List, Union
import zipfile
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

# def process_response_file(filenames:Union[List[str],str]):
#     response_data = {
#         "status": "success",
#     }
    
#     # Prepare the zip file in memory
#     zip_buffer = io.BytesIO()
#     with zipfile.ZipFile(zip_buffer, 'a', zipfile.ZIP_DEFLATED) as zip_file:
#         for file in files:
#             # Add each file to the zip archive
#             file_content = file.read()
#             zip_file.writestr(file.filename, file_content)
    
#     # Seek to the beginning of the stream
#     zip_buffer.seek(0)
    
#     # Make the response
#     response = make_response(jsonify(response_data))
    
#     # Attach the zip file
#     response.headers['Content-Type'] = 'application/zip'
#     response.headers['Content-Disposition'] = 'attachment; filename=files.zip'
    
#     return response, send_file(zip_buffer, mimetype='application/zip', as_attachment=True, attachment_filename='files.zip')