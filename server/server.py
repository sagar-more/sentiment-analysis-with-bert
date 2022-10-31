from fast_bert.prediction import BertClassificationPredictor

# Import flask and datetime module for showing date and time
from flask import Flask, request, jsonify
from flask_socketio import SocketIO
from flask_cors import CORS, cross_origin
import datetime

x = datetime.datetime.now()

# Initializing flask app
app = Flask(__name__)
app.config["SECRET_KEY"] = "secret!"
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
socketio = SocketIO(app)

MODEL_PATH = "model_out"

predictor = BertClassificationPredictor(
    model_path=MODEL_PATH,
    label_path=".",  # location for labels.csv file
    multi_label=True,
    model_type="bert",
    do_lower_case=True,
    device=None,
)  # set custom torch.device, defaults to cuda if available

# Single prediction
single_prediction = predictor.predict("sad")
print(single_prediction)


@app.route("/", methods=["POST"])
@cross_origin()
def default():
    print(request.get_json())
    return "hello"


# Route for seeing a data
@app.route("/data", methods=["POST"])
@cross_origin()
def get_time():
    data = request.get_json()
    print(data["sentence"])
    prediction = predictor.predict(data["sentence"])
    print(prediction)
    # Returning an api for showing in reactjs
    return jsonify(prediction)


# Running app
if __name__ == "__main__":
    # app.run(debug=True)
    socketio.run(app, debug=True, port=8000, host="localhost")
