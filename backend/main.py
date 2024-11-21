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
from weather_risk import AdvancedWeatherRiskAssessment


# importing model
model = pickle.load(open('./models/model.pkl','rb'))
sc = pickle.load(open('./models/standscaler.pkl','rb'))
ms = pickle.load(open('./models/minmaxscaler.pkl','rb'))

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
            model = pickle.load(open('./models/model2.pkl', 'rb'))
            sc = pickle.load(open('./models/standscaler2.pkl', 'rb'))
            label_encoders = pickle.load(open('./models/label_encoders.pkl', 'rb'))

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
    
@app.route("/support", methods=['POST'])
def support():
    try:
        # Get the user question and previous conversation context
        question = request.json.get("prompt")
        print("Received question:", question)
        prev_responses = request.json.get("response")
        print("Previous responses:", prev_responses)
        
        # Build the conversation context
        conversation_history = "Previous conversation:\n"
        if prev_responses:
            for res in prev_responses:
                if res.get("prompt") != None:
                    conversation_history += f"User: {res['prompt']}\n"
                if res.get("answer") != None:
                    conversation_history += f"Agent: {res['answer']}\n"

        # print("Conversation history:", conversation_history)
        
        # Append the current question
        prompt = f"""
        You are a chat support representative for rural farmers. Answer their queries in a clear, easy-to-understand, and precise manner. Provide helpful suggestions where possible.

        {conversation_history}
        User: {question}
        Agent:
        """

        # Generate the response using the AI model
        response = genai_model.generate_content(
            prompt.strip(),
            generation_config=genai.types.GenerationConfig(temperature=0.1)
        )
        
        print("Generated response:", response.text)

        # Update the conversation history
        # prev_responses.append({"prompt": question, "answer": response.text})

        return jsonify({"prompt": prompt.strip(), "answer": response.text, "prev_responses": prev_responses})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/weather", methods=['POST'])
def weather_risk():
    try:
        data = request.json
        
        # Validate required fields
        required_fields = ['name', 'latitude', 'longitude', 'avg_annual_rainfall']
        if not all(field in data for field in required_fields):
            return jsonify({
                "error": "Missing required fields. Need: name, latitude, longitude, avg_annual_rainfall"
            }), 400

        location_data = {
            'name': data['name'],
            'latitude': data['latitude'],
            'longitude': data['longitude'],
            'avg_annual_rainfall': data['avg_annual_rainfall'],
            'historical_rainfall': data.get('historical_rainfall', [])
        }

        recent_rainfall = data.get('recent_rainfall', [])
        
        if not recent_rainfall:
            return jsonify({
                "error": "Missing recent_rainfall data"
            }), 400

        # Initialize weather risk assessment
        assessment = AdvancedWeatherRiskAssessment(location_data)
        
        # Calculate all risk metrics
        flood_risk = assessment.predict_flood_risk(recent_rainfall)
        drought_risk = assessment.predict_drought_risk(recent_rainfall)
        
        return jsonify({
            'location': location_data['name'],
            'coordinates': {
                'latitude': location_data['latitude'],
                'longitude': location_data['longitude']
            },
            'flood_risk': {
                'percentage': round(flood_risk['flood_risk_percentage'], 2),
                'category': flood_risk['risk_category']
            },
            'drought_risk': {
                'percentage': round(drought_risk['drought_risk_percentage'], 2),
                'category': drought_risk['risk_category']
            }
        })

    except Exception as e:
        return jsonify({
            "error": f"Weather risk assessment failed: {str(e)}"
        }), 500
    

if __name__ == "__main__":
    app.run(debug=True, port=5000)