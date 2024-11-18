import pandas as pd

# Read the CSV file
file_path = '/Users/taf/Projects/Minor Project ODD24/frontend/analysis/crop_production.csv'  # Replace with the actual path
df = pd.read_csv(file_path)  # Adjust delimiter if necessary
# Strip whitespace from column names (if necessary)
df.columns = df.columns.str.strip()

# Drop rows with missing values in 'State_Name' or 'District_Name'
df.dropna(subset=['Crop'], inplace=True)

# Group by state and get unique districts
result = df['Crop'].unique()

# Prepare the JSON structure
print (result)
