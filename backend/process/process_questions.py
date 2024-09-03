from llama_index.core import Document, VectorStoreIndex
from flask import Flask, request, jsonify, send_file, make_response
import random, io, os, zipfile, glob


def make_test_solutions():
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
    return jsonify(response_list), 200

if __name__=="__main__":
    print(make_embs())