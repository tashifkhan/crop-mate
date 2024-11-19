import pandas as pd
import numpy as np
from typing import Dict, List
from scipy import stats

class AdvancedWeatherRiskAssessment:
    def __init__(self, location_data: Dict):
        self.location = location_data['name']
        self.historical_rainfall = np.array(location_data.get('historical_rainfall', []))
        
    def predict_flood_risk(self, recent_rainfall: List[float]) -> Dict[str, float]:
        """
        Advanced flood risk prediction using extreme value theory
        
        Args:
            recent_rainfall (list): Recent monthly rainfall data
        
        Returns:
            dict: Comprehensive flood risk assessment
        """
        # Convert to numpy array for numerical operations
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
        Advanced drought risk prediction using Palmer Drought Severity Index (PDSI)
        
        Args:
            recent_rainfall (list): Recent monthly rainfall data
        
        Returns:
            dict: Comprehensive drought risk assessment
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

# Example usage with more comprehensive location data
mumbai_data = {
    'name': 'Mumbai',
    'historical_rainfall': [
        2100, 2250, 1980, 2300, 2150, 2050, 2200, 2180, 2120, 2070,
        2300, 2150, 2080, 2220, 2190, 2130, 2110, 2260, 2040, 2170
    ]
}

recent_rainfall = [350, 380, 400]  # Last three months' rainfall

assessment = AdvancedWeatherRiskAssessment(mumbai_data)

# Advanced flood risk assessment
flood_risk = assessment.predict_flood_risk(recent_rainfall)
print("Flood Risk Assessment:")
for key, value in flood_risk.items():
    print(f"{key.replace('_', ' ').title()}: {value}")

# Advanced drought risk assessment
drought_risk = assessment.predict_drought_risk(recent_rainfall)
print("\nDrought Risk Assessment:")
for key, value in drought_risk.items():
    print(f"{key.replace('_', ' ').title()}: {value}")