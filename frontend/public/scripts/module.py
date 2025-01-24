import numpy as np
import pandas as pd
import pickle
import joblib
from scipy import stats
from typing import Dict, List, Union, Optional

class CropPredictor:
    """A class for predicting the most suitable crop based on soil and environmental conditions."""
    
    def __init__(self):
        """Initialize CropPredictor by loading the necessary models and scalers."""
        # Load the models and scalers
        self.model = pickle.load(open('./models/model.pkl', 'rb'))
        self.sc = pickle.load(open('./models/standscaler.pkl', 'rb'))
        self.ms = pickle.load(open('./models/minmaxscaler.pkl', 'rb'))
        
        self.crop_dict = {
            1: "Rice", 
            2: "Maize", 
            3: "Jute", 
            4: "Cotton", 
            5: "Coconut", 
            6: "Papaya", 
            7: "Orange",
            8: "Apple", 
            9: "Muskmelon", 
            10: "Watermelon", 
            11: "Grapes", 
            12: "Mango", 
            13: "Banana",
            14: "Pomegranate", 
            15: "Lentil", 
            16: "Blackgram", 
            17: "Mungbean", 
            18: "Mothbeans",
            19: "Pigeonpeas", 
            20: "Kidneybeans", 
            21: "Chickpea", 
            22: "Coffee", 
            23: "Wheat"
        }

    def predict(self, features: Dict) -> Dict:
        """
        Predict the most suitable crop based on given features.
        
        Args:
            features (Dict): Dictionary containing N, P, K values, temperature, humidity, pH, and rainfall
            
        Returns:
            Dict: Prediction result containing status and recommended crop
        """
        try:
            # Extract features
            feature_list = [
                features['Nitrogen'],
                features['Phosphorus'],
                features['Potassium'],
                features['Temperature'],
                features['Humidity'],
                features['Ph'],
                features['Rainfall']
            ]
            
            # Transform features
            single_pred = np.array(feature_list).reshape(1, -1)
            scaled_features = self.ms.transform(single_pred)
            final_features = self.sc.transform(scaled_features)
            
            # Make prediction
            prediction = self.model.predict(final_features)
            
            if prediction[0] in self.crop_dict:
                crop = self.crop_dict[prediction[0]]
                return {
                    "status": "success",
                    "crop": crop,
                    "message": f"{crop} is the best crop to be cultivated right there"
                }
            return {"status": "error", "message": "Could not determine the best crop"}
            
        except Exception as e:
            return {"status": "error", "message": str(e)}

class YieldPredictor:
    """A class for predicting crop yield based on location, season, and area parameters."""
    
    def __init__(self):
        """Initialize YieldPredictor by loading the model, scaler, and label encoders."""
        self.model = joblib.load('./models/model2.pkl')
        self.sc = joblib.load('./models/standscaler2.pkl')
        self.label_encoders = joblib.load('./models/label_encoders.pkl')
        
    def predict(self, features: Dict) -> Dict:
        """
        Predict crop yield based on given features.
        
        Args:
            features (Dict): Dictionary containing State_Name, District_Name, Season, Crop, and Area
            
        Returns:
            Dict: Prediction result containing predicted production and yield
        """
        try:
            # Create DataFrame from input
            input_df = pd.DataFrame([features])
            
            # Clean string columns
            string_columns = ['State_Name', 'District_Name', 'Season', 'Crop']
            for column in string_columns:
                input_df[column] = input_df[column].str.strip()

            # Encode categorical variables
            for column in string_columns:
                if column in input_df.columns:
                    input_df[column] = self.label_encoders[column].transform(input_df[column])

            # Ensure correct feature order
            features_order = ['State_Name', 'District_Name', 'Season', 'Crop', 'Area']
            input_df = input_df[features_order]
            
            # Scale and predict
            input_scaled = self.sc.transform(input_df)
            prediction = self.model.predict(input_scaled)
            
            # Calculate yield
            predicted_yield = prediction[0] / features['Area'] if features['Area'] > 0 else 0
            
            return {
                "status": "success",
                "predicted_production": float(prediction[0]),
                "predicted_yield": float(predicted_yield)
            }
            
        except Exception as e:
            return {"status": "error", "message": str(e)}


class AdvancedWeatherRiskAssessment:
    """A class for advanced analysis of flood and drought risks using statistical models."""
    
    def __init__(self, location_data: Dict):
        """
        Initialize with location data and historical rainfall information.
        
        Args:
            location_data (Dict): Dictionary containing location name and historical rainfall data
        """
        self.location = location_data['name']
        self.historical_rainfall = np.array(location_data.get('historical_rainfall', []))
        
    def predict_flood_risk(self, recent_rainfall: List[float]) -> Dict[str, float]:
        """
        Predict flood risk using Generalized Extreme Value distribution.
        
        Args:
            recent_rainfall (List[float]): Recent rainfall measurements
            
        Returns:
            Dict: Flood risk assessment including probability and risk category
        """
        recent_rainfall = np.array(recent_rainfall)
        
        # Generalized Extreme Value (GEV) distribution for extreme event modeling
        gev_params = stats.genextreme.fit(self.historical_rainfall)
        
        # Calculate return periods and exceedance probabilities
        recent_max = np.max(recent_rainfall)
        return_period = 1 / (1 - stats.genextreme.cdf(recent_max, *gev_params))
        
        # Risk categorization based on return period
        def _categorize_flood_risk(rp: float) -> str:
            if rp < 2: return "Low Risk"
            elif 2 <= rp < 10: return "Moderate Risk"
            elif 10 <= rp < 50: return "High Risk"
            else: return "Extreme Risk"
        
        flood_probability = min(max((recent_max / np.mean(self.historical_rainfall) - 1) * 100, 0), 100)
        
        return {
            'flood_risk_percentage': flood_probability,
            'return_period': return_period,
            'risk_category': _categorize_flood_risk(return_period),
            'max_recent_rainfall': recent_max
        }
    
    def predict_drought_risk(self, recent_rainfall: List[float]) -> Dict[str, float]:
        """
        Predict drought risk using Standardized Precipitation Index.
        
        Args:
            recent_rainfall (List[float]): Recent rainfall measurements
            
        Returns:
            Dict: Drought risk assessment including SPI and risk category
        """
        recent_rainfall = np.array(recent_rainfall)
        
        # Calculate Standardized Precipitation Index (SPI)
        recent_total = np.sum(recent_rainfall)
        mean_rainfall = np.mean(self.historical_rainfall)
        std_rainfall = np.std(self.historical_rainfall)
        
        # Calculate SPI
        spi = (recent_total - mean_rainfall) / std_rainfall
        
        # Palmer-like drought severity calculation
        def _calculate_moisture_anomaly(spi: float) -> float:
            # Nonlinear transformation of SPI to represent moisture conditions
            if spi > 0:
                return np.log(1 + spi) * 10
            else:
                return -np.log(1 - spi) * 10
        
        moisture_anomaly = _calculate_moisture_anomaly(spi)
        
        # Drought risk categorization
        def _categorize_drought_risk(anomaly: float) -> str:
            if anomaly > -1 and anomaly < 1: return "Normal"
            elif -2 <= anomaly <= -1: return "Mild Drought"
            elif -3 <= anomaly < -2: return "Moderate Drought"
            elif anomaly < -3: return "Severe Drought"
            else: return "No Drought"
        
        # Convert to drought probability
        drought_probability = max(0, min(abs(moisture_anomaly) * 20, 100))
        
        return {
            'drought_risk_percentage': drought_probability,
            'standardized_precipitation_index': spi,
            'moisture_anomaly': moisture_anomaly,
            'risk_category': _categorize_drought_risk(moisture_anomaly)
        }

class WeatherRiskAssessment:
    """A class for basic weather risk assessment based on rainfall patterns."""
    
    def __init__(self, location_data: Dict):
        """
        Initialize with location data.
        
        Args:
            location_data (Dict): Dictionary containing location information
        """
        self.location = location_data
        self.risk_categories = {
            (0, 20): "Very Low Risk",
            (20, 40): "Low Risk",
            (40, 60): "Moderate Risk",
            (60, 80): "High Risk",
            (80, 100): "Extreme Risk"
        }

    def _get_risk_category(self, risk_percentage: float) -> str:
        """
        Determine risk category based on risk percentage.
        
        Args:
            risk_percentage (float): Calculated risk percentage
            
        Returns:
            str: Risk category label
        """
        for (lower, upper), category in self.risk_categories.items():
            if lower <= risk_percentage < upper:
                return category
        return "Extreme Risk" if risk_percentage >= 100 else "Very Low Risk"

    def predict_flood_risk(self, recent_rainfall: List[float]) -> Dict[str, Union[float, str]]:
        """
        Calculate flood risk based on recent rainfall data.
        
        Args:
            recent_rainfall (List[float]): Recent rainfall measurements
            
        Returns:
            Dict: Flood risk assessment with percentage and category
        """
        try:
            avg_recent_rainfall = sum(recent_rainfall) / len(recent_rainfall)
            historical_avg = self.location['avg_annual_rainfall'] / 12  # Monthly average
            
            # Calculate flood risk percentage
            flood_risk = min((avg_recent_rainfall / historical_avg) * 100, 100)
            risk_category = self._get_risk_category(flood_risk)
            
            return {
                'flood_risk_percentage': round(flood_risk, 2),
                'risk_category': risk_category
            }
        except Exception as e:
            return {
                'error': f"Flood risk calculation failed: {str(e)}"
            }

    def predict_drought_risk(self, recent_rainfall: List[float]) -> Dict[str, Union[float, str]]:
        """
        Calculate drought risk based on recent rainfall data.
        
        Args:
            recent_rainfall (List[float]): Recent rainfall measurements
            
        Returns:
            Dict: Drought risk assessment with percentage and category
        """
        try:
            avg_recent_rainfall = sum(recent_rainfall) / len(recent_rainfall)
            historical_avg = self.location['avg_annual_rainfall'] / 12
            
            # Calculate drought risk percentage
            drought_risk = min(max((1 - (avg_recent_rainfall / historical_avg)) * 100, 0), 100)
            risk_category = self._get_risk_category(drought_risk)
            
            return {
                'drought_risk_percentage': round(drought_risk, 2),
                'risk_category': risk_category
            }
        except Exception as e:
            return {
                'error': f"Drought risk calculation failed: {str(e)}"
            }

    def get_weather_assessment(self, recent_rainfall: List[float]) -> Dict:
        """
        Get comprehensive weather risk assessment including both flood and drought risks.
        
        Args:
            recent_rainfall (List[float]): Recent rainfall measurements
            
        Returns:
            Dict: Complete weather risk assessment for the location
        """
        try:
            flood_risk = self.predict_flood_risk(recent_rainfall)
            drought_risk = self.predict_drought_risk(recent_rainfall)
            
            return {
                'location': self.location['name'],
                'coordinates': {
                    'latitude': self.location['latitude'],
                    'longitude': self.location['longitude']
                },
                'flood_risk': {
                    'percentage': flood_risk['flood_risk_percentage'],
                    'category': flood_risk['risk_category']
                },
                'drought_risk': {
                    'percentage': drought_risk['drought_risk_percentage'],
                    'category': drought_risk['risk_category']
                }
            }
        except Exception as e:
            return {'error': f"Weather assessment failed: {str(e)}"}
