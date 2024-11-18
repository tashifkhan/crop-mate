from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
import pandas
import sklearn
import pickle
from dotenv import load_dotenv
from io import BytesIO
import google.generativeai as genai
import requests
import json
import os


# importing model
model = pickle.load(open('/Users/taf/Projects/Minor Project ODD24/frontend/backend/models/model.pkl','rb'))
sc = pickle.load(open('/Users/taf/Projects/Minor Project ODD24/frontend/backend/models/standscaler.pkl','rb'))
ms = pickle.load(open('/Users/taf/Projects/Minor Project ODD24/frontend/backend/models/minmaxscaler.pkl','rb'))

load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")

genai.configure(api_key=api_key)
genai_model = genai.GenerativeModel(model_name="gemini-1.5-flash")

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
@app.route("/predict", methods=['POST'])
def predict():
    data = request.get_json()
    print("Received JSON:", data)
    if not data:
        return jsonify({"error": "Invalid input, no JSON data"}), 400
    
    # Retrieve input data from the JSON payload
    N = request.json.get('Nitrogen')
    P = request.json.get('Phosphorus')  # Corrected spelling
    K = request.json.get('Potassium')
    temp = request.json.get('Temperature')
    humidity = request.json.get('Humidity')
    ph = request.json.get('Ph')
    rainfall = request.json.get('Rainfall')

    # Validate that all inputs are provided
    if None in [N, P, K, temp, humidity, ph, rainfall]:
        return jsonify({"error": "Missing input data"}), 400

    # Validate input ranges (example)
    if not (0 <= ph <= 14):
        return jsonify({"error": "Invalid pH value"}), 400

    # Prepare input for the model
    feature_list = [N, P, K, temp, humidity, ph, rainfall]
    print("Input for scaling:", feature_list)
    try:
        single_pred = np.array(feature_list).reshape(1, -1)
        scaled_features = ms.transform(single_pred)
        final_features = sc.transform(scaled_features)
        print("Scaled features:", final_features)

        # Predict using the model
        prediction = model.predict(final_features)
        print("Prediction result:", prediction)

        # Map prediction to crop name
        crop_dict = {
            1: "Rice", 2: "Maize", 3: "Jute", 4: "Cotton", 5: "Coconut", 6: "Papaya", 7: "Orange",
            8: "Apple", 9: "Muskmelon", 10: "Watermelon", 11: "Grapes", 12: "Mango", 13: "Banana",
            14: "Pomegranate", 15: "Lentil", 16: "Blackgram", 17: "Mungbean", 18: "Mothbeans",
            19: "Pigeonpeas", 20: "Kidneybeans", 21: "Chickpea", 22: "Coffee", 23: "Wheat"
        }

        # Create the result based on the prediction
        if prediction[0] in crop_dict:
            crop = crop_dict[prediction[0]]
            result = {"crop": crop, "message": f"{crop} is the best crop to be cultivated right there"}
        else:
            result = {"error": "Could not determine the best crop to be cultivated with the provided data"}

        return jsonify(result)
    except Exception as e:
        print("Error during prediction:", e)
        return jsonify({"error": "Internal server error during prediction"}), 500
    
@app.route('/predict_yield', methods=['POST'])
def predict_yield():
    try:
        # Get and validate input JSON
        data = request.get_json()
        print("Received JSON:", data)
        if not data:
            return jsonify({"error": "Invalid input, no JSON data"}), 400
        
        # Retrieve input data from the JSON payload
        state = data.get('State_Name')
        district = data.get('District_Name')
        season = data.get('Season')
        crop = data.get('Crop')
        area = data.get('Area')

        # Validate that all required inputs are provided
        required_fields = {
            'State_Name': state,
            'District_Name': district,
            'Season': season,
            'Crop': crop,
            'Area': area
        }
        
        missing_fields = [field for field, value in required_fields.items() if value is None]
        if missing_fields:
            return jsonify({
                "error": f"Missing required fields: {', '.join(missing_fields)}"
            }), 400

        # Validate area is a positive number
        try:
            area = float(area)
            if area <= 0:
                return jsonify({"error": "Area must be a positive number"}), 400
        except ValueError:
            return jsonify({"error": "Area must be a valid number"}), 400

        # Prepare input data dictionary
        input_data = {
            'State_Name': state,
            'District_Name': district,
            'Season': season,
            'Crop': crop,
            'Area': area
        }

        try:
            # Load the models and scalers
            model = pickle.load(open('/Users/taf/Projects/Minor Project ODD24/frontend/backend/models/model2.pkl', 'rb'))
            sc = pickle.load(open('/Users/taf/Projects/Minor Project ODD24/frontend/backend/models/standscaler2.pkl', 'rb'))
            label_encoders = pickle.load(open('/Users/taf/Projects/Minor Project ODD24/frontend/backend/models/label_encoders.pkl', 'rb'))

            # Create DataFrame from input
            input_df = pd.DataFrame([input_data])

            # Strip whitespace from string columns
            string_columns = ['State_Name', 'District_Name', 'Season', 'Crop']
            for column in string_columns:
                input_df[column] = input_df[column].str.strip()

            # Encode categorical variables
            categorical_columns = ['State_Name', 'District_Name', 'Season', 'Crop']
            for column in categorical_columns:
                if column in input_df.columns:
                    try:
                        input_df[column] = label_encoders[column].transform(input_df[column])
                    except ValueError as e:
                        return jsonify({
                            "error": f"Invalid value for {column}. Allowed values are: {', '.join(label_encoders[column].classes_)}"
                        }), 400

            # Ensure correct feature order
            features = ['State_Name', 'District_Name', 'Season', 'Crop', 'Area']
            input_df = input_df[features]

            # Scale the features
            try:
                input_scaled = sc.transform(input_df)
            except Exception as e:
                return jsonify({"error": f"Error in scaling features: {str(e)}"}), 500

            # Make prediction
            prediction = model.predict(input_scaled)
            
            # Calculate yield (if needed)
            predicted_yield = prediction[0] / area if area > 0 else 0

            # Return the prediction
            return jsonify({
                "status": "success",
                "predicted_production": float(prediction[0]),
                "predicted_yield": float(predicted_yield),
                "input_received": data
            })

        except Exception as e:
            return jsonify({
                "error": f"Prediction error: {str(e)}",
                "input_received": data
            }), 500

    except Exception as e:
        return jsonify({"error": f"Server error: {str(e)}"}), 500
    

@app.route("/support",  methods=['POST'])
def support():
    try:
        question = request.json.get("prompt")
        print("Received question:", question)
        prev_response = request.json.get("response")
        print("Previous response:", prev_response)
        prev = "privious prompt & responses:\n"
        if prev_response is None:
            prev_response = []
        else:
            for res in prev_response:
                prev += f"prompt - {res['prompt']}\nreponse - {res['answer']}\n"

        prompt = f'''
            Assume the role of a chat support representative for rural farmers and help them in any way possible by answering thier quaries be precise and answer the questions in a way that is easy to understand.
        ''' 

        prompt = f"{prompt}\n{prev}\n{question}"

        response = genai_model.generate_content(
            prompt,
            generation_config = genai.types.GenerationConfig(temperature=0.1)
        )

        prev_response.append({"prompt": question, "answer": response.text})

        return jsonify({"prompt": prompt.strip(),"answer": response.text,}, prev_response)

    
    except Exception as e:
        return jsonify(
            {
                "error": str(e)
            }
        ), 500
    

if __name__ == "__main__":
    app.run(debug=True, port=5000)