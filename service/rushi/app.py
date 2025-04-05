from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

@app.route('/process', methods=['POST'])
def process_request():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No JSON data provided"}), 400
    
    # Process the data (example: echo back the received data)
    return jsonify({"received": data}), 200


@app.route('/', methods=['GET'])
def home():
    print("Root route '/' accessed")  # Debug log to confirm route registration
    return jsonify({"message": "Welcome to the PeerCloud service!"}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)