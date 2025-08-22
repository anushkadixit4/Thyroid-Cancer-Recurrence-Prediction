import joblib
import pandas as pd
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def load_model(path='model.pkl'):
    try:
        model = joblib.load(path)
        print("Model successfully loaded!")
        return model
    except Exception as e:
        print(f"Error loading model: {e}")
        return None

model = load_model()

@app.route('/api/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({
            "error": "Machine learning model could not be loaded",
            "status": "failure"
        }), 500

    input_data = request.json

    try:
        # Detailed logging of input data
        print("Received Input Data:", input_data)

        # Validate input data
        required_fields = [
            'Age', 'Gender', 'Smoking', 'Hx Smoking', 'Hx Radiothreapy', 
            'Thyroid Function', 'Physical Examination', 'Adenopathy', 
            'Pathology', 'Focality', 'Risk', 'T', 'N', 'M', 'Stage', 'Response'
        ]

        # Check if all required fields are present
        missing_fields = [field for field in required_fields if field not in input_data]
        if missing_fields:
            return jsonify({
                "status": "error",
                "message": f"Missing required fields: {missing_fields}"
            }), 400

        # Prepare DataFrame
        columns_order = required_fields
        df = pd.DataFrame([input_data])
        
        # Ensure correct column order
        df = df.reindex(columns=columns_order)

        # Detailed data type and value checking
        print("DataFrame before prediction:")
        print(df.dtypes)
        print(df)

        # Prediction
        prediction = model.predict(df)
        prediction_proba = model.predict_proba(df)

        return jsonify({
            "status": "success",
            "recurrence_prediction": bool(prediction[0]),
            "recurrence_probability": float(prediction_proba[0][1])
        })

    except Exception as e:
        import traceback
        print("Detailed Error:")
        traceback.print_exc()
        return jsonify({
            "status": "error",
            "message": str(e),
            "input_data": input_data
        }), 400

if __name__ == '__main__':
    if model:
        app.run(debug=True, port=5000)
    else:
        print("Cannot start server: Model failed to load")