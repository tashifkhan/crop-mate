import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.neighbors import KNeighborsRegressor
from sklearn.preprocessing import StandardScaler, LabelEncoder
import pickle
import joblib

# Load the data
crop_data = pd.read_csv("/Users/taf/Projects/Minor Project ODD24/frontend/analysis/data/crop_production.csv")
crop_data = crop_data.dropna()

# Strip whitespace from string columns
string_columns = ['State_Name', 'District_Name', 'Season', 'Crop']
for column in string_columns:
    crop_data[column] = crop_data[column].str.strip()

# Calculate Yield
crop_data['Yield'] = (crop_data['Production'] / crop_data['Area'])

# Create label encoders for categorical columns
label_encoders = {}
categorical_columns = ['State_Name', 'District_Name', 'Season', 'Crop']

# Encode categorical variables
for column in categorical_columns:
    label_encoders[column] = LabelEncoder()
    crop_data[column] = label_encoders[column].fit_transform(crop_data[column])

# Save label encoders
with open('label_encoders.pkl', 'wb') as f:
    pickle.dump(label_encoders, f)

# Prepare features and target
x = crop_data[['State_Name', 'District_Name', 'Season', 'Crop', 'Area']]
y = crop_data["Production"]

# Scale numerical features
sc = StandardScaler()
x_scaled = sc.fit_transform(x)

# Split the data
x_train, x_test, y_train, y_test = train_test_split(x_scaled, y, test_size=0.25, random_state=5)

# Define the parameter grid for hyperparameter tuning
param_grid = {
    'n_neighbors': range(1, 31),
    'weights': ['uniform', 'distance'],
    'p': [1, 2]  # p=1 for Manhattan distance, p=2 for Euclidean distance
}

# Initialize KNN regressor
knn = KNeighborsRegressor()

# Perform hyperparameter tuning with cross-validation
grid_search = GridSearchCV(
    estimator=knn,
    param_grid=param_grid,
    cv=5,
    scoring='neg_mean_squared_error',
    n_jobs=-1
)

# Fit the model
grid_search.fit(x_train, y_train)

# Get the best model
best_knn = grid_search.best_estimator_

# Save the best model and scaler
joblib.dump(best_knn, 'model2.pkl', compress=3)
joblib.dump(sc, 'standscaler2.pkl', compress=3)

# Make predictions on the test set
y_pred = best_knn.predict(x_test)

# Calculate evaluation metrics
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_percentage_error

mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)
mape = mean_absolute_percentage_error(y_test, y_pred)

print(f"Best Parameters: {grid_search.best_params_}")
print(f"Mean Absolute Percentage Error: {mape}")
print(f"Mean Squared Error: {mse}")
print(f"R2 Score: {r2}")

# Print sample predictions
print("\nSample Predictions vs Actual Values:")
for i in range(5):
    print(f"Predicted: {y_pred[i]:.2f}, Actual: {y_test.iloc[i]:.2f}")
