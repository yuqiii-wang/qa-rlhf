import asyncio
import base64
from concurrent import futures
from multiprocessing import freeze_support
from flask import Flask, request, jsonify, send_file, make_response
from flask_cors import CORS
import random, io, os, zipfile, glob, uuid

from process.process_questions import make_test_solutions
from process.process_solution import process_test_solution_show, process_test_solution_run
from init import ocr_engine, es_vec_store

# Create a Flask application instance
app = Flask(__name__)
CORS(app)
app_dir = os.path.dirname(os.path.abspath(__file__))


user_sessions = {}

@app.route('/login', methods=['GET'])
def login(user_id):
    user_sessions[user_id] = {}
    return "success", 200

@app.route('/test', methods=['GET'])
def test():
    return "submitted", 200

@app.route('/process/ask', methods=['POST'])
def ask_question():
    user_id = request.args.get('user', -1)
    question_id = request.args.get('id', -1)
    data = request.get_json()
    question = data.get('question')
    filename = data.get('filename')
    user_sessions[user_id] = {
        "question_id": question_id,
        "question": question,
        "filename": filename
    }
    # ... about emb similarity match, return a list of solutions
    return make_test_solutions()

@app.route('/process/ocr', methods=['GET'])
def app_process_ocr():
    question_id = request.args.get('questionId', '-1')
    solution_id = request.args.get('solutionId', '-1')
    filename = request.args.get('filename', '-1')

@app.route('/process/reference/run', methods=['POST'])
def process_reference_run():
    id = request.args.get('id', '-1')
    return process_test_solution_run()

@app.route('/process/reference/show', methods=['POST'])
def process_reference_show():
    id = request.args.get('id', '-1')
    return process_test_solution_show()

@app.route('/process/test/ocr', methods=['GET'])
def app_process_test_ocr():
    bounding_boxes = ocr_engine.process_ocr("bond_bloomberg.png")
    bounding_boxes = ocr_engine.parse_ocr(bounding_boxes)
    ocr_engine.draw_ocr("bond_bloomberg.png", bounding_boxes)
    return ";".join([boudning_box.text for boudning_box in bounding_boxes]), 200

@app.route('/process/upload/images', methods=['POST'])
def upload():
    # Access form data, files, or JSON data from the request if needed
    data = request.form
    files = request.files.getlist("files")
    response_data = {
        "status": "success",
        "message": "Files processed",
        "details": data
    }
    
    # Prepare the zip file in memory
    zip_buffer = io.BytesIO()
    with zipfile.ZipFile(zip_buffer, 'a', zipfile.ZIP_DEFLATED) as zip_file:
        for file in files:
            # Add each file to the zip archive
            file_content = file.read()
            zip_file.writestr(file.filename, file_content)
    
    # Seek to the beginning of the stream
    zip_buffer.seek(0)
    
    # Make the response
    response = make_response(jsonify(response_data))
    
    # Attach the zip file
    response.headers['Content-Type'] = 'application/zip'
    response.headers['Content-Disposition'] = 'attachment; filename=files.zip'
    
    return response, send_file(zip_buffer, mimetype='application/zip', as_attachment=True, attachment_filename='files.zip')

thread_pool_executor = futures.ThreadPoolExecutor(max_workers=10)

# Run the app if this script is executed
if __name__ == '__main__':
    app.run(debug=True)
