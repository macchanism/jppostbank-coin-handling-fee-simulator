from flask import Flask, request, jsonify
from flask_cors import CORS
from calclib import calculate


app = Flask(__name__)
CORS(app)

def result(coin_dict:dict):
    ret_dict = calculate(coin_dict)
    return jsonify(list(ret_dict.values()))

@app.route("/", methods=["GET"])
def hello():
    return "Hello, World!"

@app.route("/api", methods=["POST"])
def get_result_body_request():
    raw_req_dict = request.get_json()
    coin_dict = {"1": 0, "5": 0, "10": 0, "50": 0, "100": 0, "500": 0}
    for key in coin_dict.keys():
        if key in raw_req_dict:
            coin_dict[key] = int(raw_req_dict[key])

    return result(coin_dict)

@app.route("/api", methods=["GET"])
def get_result_param_request():
    raw_req_dict = request.args
    coin_dict = {"1": 0, "5": 0, "10": 0, "50": 0, "100": 0, "500": 0}
    for key in coin_dict.keys():
        if "coin"+key in raw_req_dict:
            coin_dict[key] = int(raw_req_dict["coin"+key])

    return result(coin_dict)