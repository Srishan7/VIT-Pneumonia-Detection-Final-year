from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import keras.utils
import tensorflow as tf
import io
import os
import logging

# Initialize the Flask application
app = Flask(__name__)

# Enable Cross-Origin Resource Sharing (CORS) for the Flask app
CORS(app)

# Configure logging to capture errors in a file
logging.basicConfig(filename='error.log', level=logging.ERROR)

# Load the pre-trained Keras model for predictions
model = keras.models.load_model("model/trained_model.keras")


@app.route('/', methods=['GET'])
def index():
    """
    Route for the main index page.
    Returns the rendered HTML template for the index page.
    """
    return render_template("index.html")


@app.route('/predict', methods=['POST'])
def predict():
    """
    Route for handling prediction requests.
    Expects a POST request with an image file.
    Returns a JSON response with the prediction results.
    """
    # Validate if a file is part of the request
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']

    # Check if a file was actually selected
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    try:
        # Read the file into a bytes stream for processing
        img_bytes = io.BytesIO(file.read())

        # Load and preprocess the image
        image = keras.utils.load_img(img_bytes, target_size=(180, 180))
        image_array = tf.keras.utils.img_to_array(image)
        image_array = tf.expand_dims(image_array, 0)

        # Perform prediction using the pre-trained model
        prediction = model.predict(image_array)
        score = float(prediction[0][0])

        # Format the response as a percentage prediction
        response = {
            'normal': f'{100 * (1 - score):.2f}%',
            'pneumonia': f'{100 * score:.2f}%'
        }
        return jsonify(response)
    except Exception as e:
        # Log any errors during image processing or prediction
        logging.error("Error during image processing or prediction: %s", e)
        return jsonify({'error': 'Error processing the image'}), 500


if __name__ == '__main__':
    # Run the Flask app with debugging enabled, on a configurable port
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 8000)))
