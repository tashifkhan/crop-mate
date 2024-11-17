from flask import Flask, request, render_template, jsonify
import numpy as np
import pandas
import sklearn
import pickle

# importing model
model = pickle.load(open('/Users/taf/Projects/Minor Project ODD24/frontend/backend/Crop-Recommendation-System-Using-Machine-Learning/model.pkl','rb'))
sc = pickle.load(open('/Users/taf/Projects/Minor Project ODD24/frontend/backend/Crop-Recommendation-System-Using-Machine-Learning/standscaler.pkl','rb'))
ms = pickle.load(open('/Users/taf/Projects/Minor Project ODD24/frontend/backend/Crop-Recommendation-System-Using-Machine-Learning/minmaxscaler.pkl','rb'))

# dtr = pickle.load(open('/Users/taf/Projects/Minor Project ODD24/frontend/backend/Predicting-Crop-Yields-Crop-Yield-Prediction-Enhancing-Agriculture-with-Machine-Learning-Hindi/models/dtr.pkl','rb'))
# preprocessor = pickle.load(open('/Users/taf/Projects/Minor Project ODD24/frontend/backend/Predicting-Crop-Yields-Crop-Yield-Prediction-Enhancing-Agriculture-with-Machine-Learning-Hindi/models/preprocessor.pkl','rb'))


# creating flask app
app = Flask(__name__)

@app.route("/api/recom",methods=['POST', 'GET'])
def predict():
    N = request.form['Nitrogen']
    P = request.form['Phosporus']
    K = request.form['Potassium']
    temp = request.form['Temperature']
    humidity = request.form['Humidity']
    ph = request.form['Ph']
    rainfall = request.form['Rainfall']

    feature_list = [N, P, K, temp, humidity, ph, rainfall]
    single_pred = np.array(feature_list).reshape(1, -1)

    scaled_features = ms.transform(single_pred)
    final_features = sc.transform(scaled_features)
    prediction = model.predict(final_features)

    crop_dict = {1: "Rice", 2: "Maize", 3: "Jute", 4: "Cotton", 5: "Coconut", 6: "Papaya", 7: "Orange",
                 8: "Apple", 9: "Muskmelon", 10: "Watermelon", 11: "Grapes", 12: "Mango", 13: "Banana",
                 14: "Pomegranate", 15: "Lentil", 16: "Blackgram", 17: "Mungbean", 18: "Mothbeans",
                 19: "Pigeonpeas", 20: "Kidneybeans", 21: "Chickpea", 22: "Coffee", 23: "Wheat"}

    print(prediction)
    if prediction[0] in crop_dict:
        crop = crop_dict[prediction[0]]
        result = "{} is the best crop to be cultivated right there".format(crop)
    else:
        result = "Sorry, we could not determine the best crop to be cultivated with the provided data."
    return render_template('index.html',result = result)

# @app.route("/api/yeild",methods=['POST', 'GET'])
# def predict():
#     Year = request.form['Year']
#     average_rain_fall_mm_per_year = request.form['average_rain_fall_mm_per_year']
#     pesticides_tonnes = request.form['pesticides_tonnes']
#     avg_temp = request.form['avg_temp']
#     Area = request.form['Area']
#     Item  = request.form['Item']

#     features = np.array([[Year,average_rain_fall_mm_per_year,pesticides_tonnes,avg_temp,Area,Item]],dtype=object)
#     transformed_features = preprocessor.transform(features)
#     prediction = dtr.predict(transformed_features).reshape(1,-1)

#     return render_template('index.html',prediction = prediction)

if __name__=="__main__":
    app.run(debug=True)