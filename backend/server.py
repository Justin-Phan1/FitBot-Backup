from flask import Flask, request, jsonify
from flask_cors import CORS
from model import NeuralNetwork # Import the model from model.py
from chatbot import get_response # Import the chat function from chatbot.py

app = Flask(__name__)
CORS(app)

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    text = data.get('message')
    response = get_response(text)
    return jsonify({"answer": response})

if __name__ == '__main__':
    app.run(debug=True)