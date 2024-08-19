import base64
from flask import Flask, request, jsonify, send_file, make_response
from flask_cors import CORS
import random, io, os, zipfile, glob

# Create a Flask application instance
app = Flask(__name__)
CORS(app)
app_dir = os.path.dirname(os.path.abspath(__file__))


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
    response_list["solutions"] = response_list["solutions"][0:random.randint(0,4)]
    return jsonify(response_list)

@app.route('/process/reference', methods=['POST'])
def process_reference():
    id = request.args.get('id', '-1')
    solution_reference = [
        {
            "command": "pwd",
            "result": "/opt/app/ai-support"
        }, 
        {
            "command": "tail errors.log",
            "result": "[2024-09-10 12:11:13] api.ss response is blah blah blah.\n"
                    "[2024-09-10 12:11:14] api.ss response is blah blah blah.\n"
                    "[2024-09-10 12:11:14] api.ss response is blah blah blah.\n"
                    "[2024-09-10 12:11:15] api.ss response is eewhhh eewhhh eewhhh.\n"
                    "[2024-09-10 12:11:15] api.ss response is ehhhahh ehhhahh ehhhahh.\n"
        },
        {"image": "150.png"},
        {"image": "180.png"},
        {
            "command": "pwd",
            "result": "/opt/app/ai-support"
        }, 
    ]

    filepaths = glob.glob(os.path.join(app_dir, "images", "*.png"))
    zip_buffer = io.BytesIO()
    with zipfile.ZipFile(zip_buffer, 'a', zipfile.ZIP_DEFLATED) as zip_file:
        for filepath in filepaths:
            with open(filepath, "br") as filehanlde:
                file_content =filehanlde.read()
                zip_file.writestr(os.path.split(filepath)[-1], file_content)

    
    # Seek to the beginning of the stream
    zip_buffer.seek(0)
    encoded_zip = base64.b64encode(zip_buffer.getvalue()).decode('utf-8')
    
    # Create a JSON response containing the encoded zip file
    if (len(filepaths) > 0) :
        response_data = {
            "status": "success",
            "solution_reference": solution_reference,
            "zip_file": encoded_zip
        }
    else :
        response_data = {
            "status": "success",
            "solution_reference": solution_reference,
        }
    return jsonify(response_data), 200


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

    # Get file detail
    file_detail = {
        'file_name': file.filename,
        'file_size': len(file.read()),
        'content_type': file.content_type
    }

    # To avoid file.read() affecting file.save(), the position should be reset
    file.seek(0)

    return jsonify(file_detail), 200


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


# Run the app if this script is executed
if __name__ == '__main__':
    app.run(debug=True)
