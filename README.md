# AI-Driven Crop Suggestion and Insurance Advisory System for Indian Farmers

`aka Crop Mate`
`, Minor Project 1 - ODD24 - JIIT`

This project aims to bridge the gap between potential and actual agricultural productivity by leveraging Artificial Intelligence and Machine Learning to empower Indian farmers. It provides personalized crop recommendations, yield predictions, and crop insurance advisory, ensuring data-driven decisions for better profitability and risk management.

## Features

- **Crop Recommendation Engine**: Suggests the most profitable crop based on factors like predicted weather, soil composition, location, and historical data.
- **Yield Estimation**: Predicts the yield for recommended crops using RF.
- **Crop Insurance Advisory**: Recommends insurance based on probabilities of extreme weather events (floods, droughts, etc.) and below-average yields (normal yields).
- **Support Chatbot**: Provides real-time assistance to farmers, answering questions related to farming techniques, crop selection, and more.
- **User-Friendly Frontend**: Built using Next.js with TypeScript and animated using Framer Motion for a sleek design and seamless experience.

## Project Highlights

- **Frontend**:
  - Developed with Next.js and TypeScript.
  - Engaging animations using Framer Motion.
  - User-friendly interface tailored for farmers to access recommendations and yield predictions.
- **Backend**:

  - Flask-based framework for robust data processing and model integration.
  - Machine Learning models for weather prediction, yield estimation, and crop recommendations.
  - Custom-trained chatbot using Gemini's Gen AI API for agricultural queries.

- **Models**:
  - Random Forest for crop recommendation and yield prediction due to its high accuracy and efficiency.

## Problem Statement

Indian farmers face significant challenges due to:

- Unpredictable weather conditions.
- Suboptimal crop choices leading to low yields.
- Financial vulnerability to extreme weather and fluctuating market prices.

This project tackles these issues with a holistic AI-driven solution combining crop recommendation, yield prediction, insurance advisory, and real-time support.

## Implementation Details

### Crop Recommendation

- **Algorithm**: Random Forest (Chosen for speed and accuracy).
- **Inputs**: soil data, historical yields, and regional parameters.

### Yield Estimation

- **Model**: Random Forest
- **Inputs**: temperature, rainfall, precipitation, historical harvest data.

### Crop Insurance Advisory

- **Method**: Analysis of flood and drought risks using weather data and historical yields.

### Support Chatbot

- **Technology**: Gemini’s Gen AI API.
- **Features**: Real-time guidance on crop selection, farming techniques, and weather advice.

## Future Scope

- **Subsidy Integration**: Connect farmers to government schemes for financial aid.
- **Pest Prediction**: Forecast pest outbreaks using weather data and pest activity history.
- **Expanded Insurance Features**: Include pest-related risks for comprehensive protection.
- **Loss Estimation**: Provide warnings and projections for crop yield losses due to pests.

## Technologies Used

- **Frontend**: Next.js, Framer Motion, Tailwind CSS.
- **Backend**: Flask, Python, TensorFlow.
- **APIs**: OpenWeatherMap, IMD, Gemini’s Gen AI.
- **Data Sources**: FAO, [WorldBank](https://www.data.gov.in/), [data.world](https://data.world/thatzprem/agriculture-india).

## Results

- **Yield Prediction**: Random Forest outperformed other models with the best accuracy and R² score.
- **Crop Recommendation**: Random Forest was chosen for its simplicity and real-time application capabilities.

## Contributors

- **Tashif Ahmad Khan** (22102141)
- **Gauri Bahuguna** (22102045)

### Supervisor

- **Dr. Shradha Saxena**, Department of ECE, Jaypee Institute of Information Technology, Noida.

---
