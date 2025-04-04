import tensorflow as tf

print("✅ GPU is available:" if tf.config.list_physical_devices('GPU') else "❌ No GPU available")

# Example dummy model
model = tf.keras.models.Sequential([
    tf.keras.layers.Dense(64, activation='relu', input_shape=(10,)),
    tf.keras.layers.Dense(1)
])
model.compile(optimizer='adam', loss='mse')

import numpy as np
X = np.random.rand(1000, 10)
y = np.random.rand(1000, 1)

print("🚀 Training...")
model.fit(X, y, epochs=20, batch_size=32)
# model.save('my_model.keras')

print("✅ Done.")
