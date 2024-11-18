import pandas as pd
import numpy as np
from typing import Dict, List

class WeatherRiskAssessment:
    def __init__(self, location_data: Dict):
        """
        Initialize risk assessment for a specific location
        
        Args:
            location_data (dict): Contains geographical and meteorological information
        """
        self.location = location_data['name']
        self.latitude = location_data['latitude']
        self.longitude = location_data['longitude']
        self.avg_annual_rainfall = location_data['avg_annual_rainfall']
        self.historical_rainfall = location_data.get('historical_rainfall', [])
        
    def calculate_rainfall_variability(self) -> float:
        """
        Calculate rainfall variability to assess drought risk
        
        Returns:
            float: Coefficient of variation for rainfall
        """
        if not self.historical_rainfall:
            return 0
        
        rainfall_std = np.std(self.historical_rainfall)
        rainfall_mean = np.mean(self.historical_rainfall)
        
        return (rainfall_std / rainfall_mean) * 100
    
    def assess_flood_risk(self, recent_rainfall: List[float]) -> Dict[str, float]:
        """
        Assess flood risk based on recent rainfall patterns
        
        Args:
            recent_rainfall (list): Rainfall data for recent months
        
        Returns:
            dict: Flood risk assessment metrics
        """
        # Compare recent rainfall with historical averages
        recent_total = sum(recent_rainfall)
        historical_mean = np.mean(self.historical_rainfall)
        
        # Basic risk calculation
        flood_probability = min(max((recent_total / historical_mean - 1) * 100, 0), 100)
        
        return {
            'flood_risk_percentage': flood_probability,
            'risk_category': self._categorize_flood_risk(flood_probability)
        }
    
    def assess_drought_risk(self, recent_rainfall: List[float]) -> Dict[str, float]:
        """
        Assess drought risk based on recent rainfall patterns
        
        Args:
            recent_rainfall (list): Rainfall data for recent months
        
        Returns:
            dict: Drought risk assessment metrics
        """
        recent_total = sum(recent_rainfall)
        historical_mean = np.mean(self.historical_rainfall)
        
        # Basic drought probability calculation
        drought_probability = min(max(((historical_mean - recent_total) / historical_mean) * 100, 0), 100)
        
        return {
            'drought_risk_percentage': drought_probability,
            'risk_category': self._categorize_drought_risk(drought_probability)
        }
    
    def _categorize_flood_risk(self, flood_probability: float) -> str:
        """Categorize flood risk levels"""
        if flood_probability <= 20:
            return "Low Risk"
        elif 20 < flood_probability <= 50:
            return "Moderate Risk"
        elif 50 < flood_probability <= 80:
            return "High Risk"
        else:
            return "Very High Risk"
    
    def _categorize_drought_risk(self, drought_probability: float) -> str:
        """Categorize drought risk levels"""
        if drought_probability <= 20:
            return "Low Risk"
        elif 20 < drought_probability <= 50:
            return "Moderate Risk"
        elif 50 < drought_probability <= 80:
            return "High Risk"
        else:
            return "Very High Risk"

# Example usage
mumbai_data = {
    'name': 'Mumbai',
    'latitude': 19.0760,
    'longitude': 72.8777,
    'avg_annual_rainfall': 2200,  # mm
    'historical_rainfall': [
        2100, 2250, 1980, 2300, 2150,  # Past years' rainfall
        2050, 2200, 2180, 2120, 2070
    ]
}

recent_rainfall = [350, 380, 400]  # Last three months' rainfall

assessment = WeatherRiskAssessment(mumbai_data)

# Rainfall variability analysis
variability = assessment.calculate_rainfall_variability()
print(f"Rainfall Variability: {variability:.2f}%")

# Flood risk assessment
flood_risk = assessment.assess_flood_risk(recent_rainfall)
print(f"Flood Risk: {flood_risk['flood_risk_percentage']:.2f}%")
print(f"Flood Risk Category: {flood_risk['risk_category']}")

# Drought risk assessment
drought_risk = assessment.assess_drought_risk(recent_rainfall)
print(f"Drought Risk: {drought_risk['drought_risk_percentage']:.2f}%")
print(f"Drought Risk Category: {drought_risk['risk_category']}")