import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler, LabelEncoder
import pickle

# Load the data
crop_data = pd.read_csv("/Users/taf/Projects/Minor Project ODD24/frontend/analysis/crop_production.csv")
crop_data = crop_data.dropna()

# Strip whitespace from string columns
string_columns = ['State_Name', 'District_Name', 'Season', 'Crop']
for column in string_columns:
    crop_data[column] = crop_data[column].str.strip()

# Calculate Yield
crop_data['Yield'] = (crop_data['Production'] / crop_data['Area'])

# Print unique values to verify stripping (optional)
print("Unique values in Season after stripping:", crop_data['Season'].unique())
print("Unique values in Crop after stripping:", crop_data['Crop'].unique())

# Create label encoders for categorical columns
label_encoders = {}
categorical_columns = ['State_Name', 'District_Name', 'Season', 'Crop']  # Remove numerical columns

# Encode categorical variables
for column in categorical_columns:
    label_encoders[column] = LabelEncoder()
    crop_data[column] = label_encoders[column].fit_transform(crop_data[column])

# Save label encoders
with open('label_encoders.pkl', 'wb') as f:
    pickle.dump(label_encoders, f)

# Prepare features and target
x = crop_data[['State_Name', 'District_Name', 'Season', 'Crop', 'Area']]  # Explicitly specify columns
y = crop_data["Production"]

# Scale numerical features
sc = StandardScaler()
x_scaled = sc.fit_transform(x)

# Split the data
x_train, x_test, y_train, y_test = train_test_split(x_scaled, y, test_size=0.25, random_state=5)

# Train the model
model = RandomForestRegressor(n_estimators=11)
model.fit(x_train, y_train)

# Save the model and scaler
with open('model2.pkl', 'wb') as f:
    pickle.dump(model, f)

with open('standscaler2.pkl', 'wb') as f:
    pickle.dump(sc, f)

# Optional: Print some evaluation metrics
from sklearn.metrics import mean_squared_error, r2_score

# Make predictions on test set
y_pred = model.predict(x_test)

# Calculate metrics
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f"Mean Squared Error: {mse}")
print(f"R2 Score: {r2}")

# Optional: Print some sample predictions
print("\nSample Predictions vs Actual Values:")
for i in range(5):
    print(f"Predicted: {y_pred[i]:.2f}, Actual: {y_test.iloc[i]:.2f}")

# Save the column names for later reference (optional)
column_names = {
    'feature_columns': list(x.columns),
    'target_column': 'Production'
}
with open('column_names.pkl', 'wb') as f:
    pickle.dump(column_names, f)