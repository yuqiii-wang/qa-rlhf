import base64
import random, io, os, zipfile, glob
from flask import Flask, request, jsonify, send_file, make_response
from utils.utils import find_project_root

app_dir = find_project_root()

def process_test_solution_show(solution_id):
    response_data = {
        "summary": "This solution is about extracting items from screenshot.",
        "history_questions": ["pls set up the ISIN 123456789",
                              "Hii, pls help insert the ISIN 234567890",
                              "Could u help input: ISIN 098765432"],
        "commands": ["pwd",
                     "tail errors.log",
                     "parse_bloomberg_bond_ocr",
                     "pwd"]
    }
    return jsonify(response_data), 200

def process_test_solution_run(solution_id):
    solution_reference = [
        {
            "command": "pwd",
            "results": "/opt/app/ai-support"
        }, 
        {
            "command": "tail errors.log",
            "results": "[2024-09-10 12:11:13] api.ss response is blah blah blah.\n"
                    "[2024-09-10 12:11:14] api.ss response is blah blah blah.\n"
                    "[2024-09-10 12:11:14] api.ss response is blah blah blah.\n"
                    "[2024-09-10 12:11:15] api.ss response is eewhhh eewhhh eewhhh.\n"
                    "[2024-09-10 12:11:15] api.ss response is ehhhahh ehhhahh ehhhahh.\n"
        },
        {"image": "bond_bloomberg.png",
         "ocr_json": ""},
        {
            "command": "pwd",
            "results": "/opt/app/ai-support"
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