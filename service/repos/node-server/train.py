from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
import os

app = Flask(__name__)
MODEL_PATH = 'my_model.keras'

@app.route('/train', methods=['POST'])
def train_model():
    # Check for GPU
    gpu_available = bool(tf.config.list_physical_devices('GPU'))
    print("✅ GPU is available:" if gpu_available else "❌ No GPU available")

    # Dummy data
    X = np.random.rand(1000, 10)
    y = np.random.rand(1000, 1)

    # Build model
    model = tf.keras.models.Sequential([
        tf.keras.layers.Dense(64, activation='relu', input_shape=(10,)),
        tf.keras.layers.Dense(1)
    ])
    model.compile(optimizer='adam', loss='mse')

    print("🚀 Training...")
    model.fit(X, y, epochs=20, batch_size=32, verbose=0)
    print("✅ Training complete.")

    # Save model
    model.save(MODEL_PATH)
    print("✅ Model saved to:", MODEL_PATH)

    return jsonify({
        "message": "Model trained and saved successfully.",
        "gpu_available": gpu_available,
        "model_path": MODEL_PATH
    })


@app.route('/checkbuild', methods=['GET'])
def check_model_build():
    if not os.path.exists(MODEL_PATH):
        return jsonify({
            "model_exists": False,
            "message": "Model file not found."
        }), 404
    else:
        return jsonify({
            "model_exists": True,
            "message": "Model file exists."
        }), 200


@app.route('/predict', methods=['POST'])
def predict():
    if not os.path.exists(MODEL_PATH):
        return jsonify({"error": "Model not found. Train the model first."}), 404

    try:
        model = tf.keras.models.load_model(MODEL_PATH)
        data = request.json.get('input')

        if not data or not isinstance(data, list):
            return jsonify({"error": "Invalid input. Provide a list of 10 numeric values."}), 400

        input_array = np.array(data).reshape(1, -1)

        if input_array.shape[1] != 10:
            return jsonify({"error": "Input must contain exactly 10 values."}), 400

        prediction = model.predict(input_array)
        return jsonify({
            "input": data,
            "prediction": prediction.tolist()
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)