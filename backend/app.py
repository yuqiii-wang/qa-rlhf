from flask import Flask, request, jsonify
from flask_cors import CORS
import random

# Create a Flask application instance
app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def hello_world():
    return "hello world"

# Define a route to handle POST requests
@app.route('/process', methods=['POST', 'GET'])
def process_data():
    # Get JSON data from the request

    # Perform some processing (for example, returning a list)
    response_list = {
        "summary": "This question is about blah blah blah",
        "solutions": [{
            "id": "1",
            "name": "solution idea 1",
            "time": "2024-Jul-01",
            "executions": 4
        }, {
            "id": "2",
            "name": "solution idea 2",
            "time": "2024-Jun-01",
            "executions": 6
        }, {
            "id": "3",
            "name": "solution idea 3",
            "time": "2024-Jul-04",
            "executions": 4
        }, {
            "id": "4",
            "name": "solution idea 4",
            "time": "2024-Jul-01",
            "executions": 4
        }]
    }
    response_list["solutions"] = response_list["solutions"][0:random.randint(0,3)]
    return jsonify(response_list)

@app.route('/process/detail', methods=['POST', 'GET'])
def process_detail():
    id = request.args.get('id', '-1')
    solution_detail = {
        "reference": "this is reference.",
        "code": "this is code."
    }
    return jsonify(solution_detail), 200

@app.route('/process/fileupload', methods=['POST'])
def process_fileupload():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Optionally, you can save the file to a directory
    # file_path = os.path.join('/path/to/save', file.filename)
    # file.save(file_path)

    # Get file details
    file_details = {
        'file_name': file.filename,
        'file_size': len(file.read()),
        'content_type': file.content_type
    }

    # To avoid file.read() affecting file.save(), the position should be reset
    file.seek(0)

    return jsonify(file_details), 200

# Run the app if this script is executed
if __name__ == '__main__':
    app.run(debug=True)
