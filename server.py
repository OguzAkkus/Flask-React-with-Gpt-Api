# from flask import Flask, redirect, render_template, request, url_for
# from markupsafe import escape
# from src.AI import prompt
# from src.AI import models
# from src.temp.temp import Temp
# from src.workers.works import ACT
from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS
# from src.workers.form_functions import Trans

app = Flask(__name__)
app.config["SECRET_KEY"] = "secret!!!!!"
CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins="*")


@app.route("/http-call")
def http_call():
    """return JSON with string data as the value"""
    data = {'data': f'Online'}
    return jsonify(data)


@socketio.on("connect")
def connected():
    """event listener when client connects to the server"""
    print(request.sid)
    print("client has connected")
    emit("connect", {"data": f"id: {request.sid} is connected"})


@socketio.on('data')
def handle_message(data):
    """event listener when client types a message"""
    print("data from the front end: ", data)
    # data = Trans(data).process()
    print(data)
    data = data["choices"][0]["text"].strip("\n")
    emit("data", {'data': data, 'id': request.sid}, broadcast=True)


@socketio.on("disconnect")
def disconnected():
    """event listener when client disconnects to the server"""
    print("user disconnected")
    emit("disconnect", f"user {request.sid} disconnected", broadcast=True)


@socketio.on("selectedFunction")
def handle_selected_function(data):
    if data == 'sw':
        print("sww")
        # Sentence from word
    elif data == 'mw':
        print("mww")
        # Meaning of the word
    elif data == 'ms':
        print("mss")
        # Meaning of the sentence


if __name__ == '__main__':
    socketio.run(app, debug=True, port=5001)