import pandas as pd
import json
import numpy as np

def calculate_average_yields(csv_file_path):
    """
    Calculate average yields from a CSV file and save to JSON
    
    Args:
        csv_file_path (str): Path to the input CSV file
    
    Returns:
        dict: Dictionary of average yields per crop
    """
    # Read CSV file
    df = pd.read_csv(csv_file_path)
    
    # Calculate yield with error handling
    df['Yield'] = df['Production'] / df['Area']
    
    # Replace infinite or NaN values
    df['Yield'] = df['Yield'].replace([np.inf, -np.inf], np.nan).fillna(0)
    
    # Group by crop and calculate average yield
    average_yields = df.groupby('Crop')['Yield'].mean().to_dict()
    
    return average_yields

def save_yields_to_json(yields_dict, output_file='average_yields.json'):
    """
    Save yields dictionary to a JSON file
    
    Args:
        yields_dict (dict): Dictionary of crop yields
        output_file (str): Path to output JSON file
    """
    with open(output_file, 'w') as f:
        json.dump(yields_dict, f, indent=4)
    print(f"Yields saved to {output_file}")

def load_yields_from_json(json_file='average_yields.json'):
    """
    Load yields from a JSON file
    
    Args:
        json_file (str): Path to input JSON file
    
    Returns:
        dict: Loaded yields dictionary
    """
    try:
        with open(json_file, 'r') as f:
            yields = json.load(f)
        return yields
    except FileNotFoundError:
        print(f"File {json_file} not found.")
        return {}
    except json.JSONDecodeError:
        print(f"Error decoding JSON from {json_file}")
        return {}

def analyze_yields(yields):
    """
    Perform additional analysis on yields
    
    Args:
        yields (dict): Dictionary of crop yields
    
    Returns:
        dict: Analysis results
    """
    analysis = {
        'highest_yield_crop': max(yields, key=yields.get),
        'lowest_yield_crop': min(yields, key=yields.get),
        'average_overall_yield': sum(yields.values()) / len(yields),
        'yield_details': {
            crop: {
                'yield': yield_value,
                'relative_to_average': yield_value / (sum(yields.values()) / len(yields))
            } for crop, yield_value in yields.items()
        }
    }
    return analysis

def visualize_yields(yields):
    """
    Create a bar plot of crop yields
    
    Args:
        yields (dict): Dictionary of crop yields
    """
    import matplotlib.pyplot as plt
    import seaborn as sns

    plt.figure(figsize=(12, 6))
    sns.barplot(x=list(yields.keys()), y=list(yields.values()))
    plt.title('Average Crop Yields')
    plt.xlabel('Crops')
    plt.ylabel('Yield (Production/Area)')
    plt.xticks(rotation=45, ha='right')
    plt.tight_layout()
    plt.show()

def main():
    # Path to your CSV file
    csv_file_path = '/Users/taf/Projects/Minor Project ODD24/frontend/analysis/crop_production.csv'
    
    # Calculate average yields
    average_yields = calculate_average_yields(csv_file_path)
    
    # Save yields to JSON
    save_yields_to_json(average_yields)
    
    # Load yields from JSON
    loaded_yields = load_yields_from_json()
    
    # Analyze yields
    yield_analysis = analyze_yields(loaded_yields)
    
    # Print analysis results
    print("\nYield Analysis:")
    print(json.dumps(yield_analysis, indent=2))
    
    # Visualize yields
    visualize_yields(loaded_yields)

# Advanced yield comparison function
def compare_yields(yields1, yields2):
    """
    Compare yields between two different datasets
    
    Args:
        yields1 (dict): First yields dictionary
        yields2 (dict): Second yields dictionary
    
    Returns:
        dict: Comparison results
    """
    # Get all unique crops
    all_crops = set(list(yields1.keys()) + list(yields2.keys()))
    
    comparison = {}
    for crop in all_crops:
        yield1 = yields1.get(crop, 0)
        yield2 = yields2.get(crop, 0)
        
        comparison[crop] = {
            'first_dataset_yield': yield1,
            'second_dataset_yield': yield2,
            'difference': yield2 - yield1,
            'percent_change': ((yield2 - yield1) / yield1 * 100) if yield1 != 0 else float('inf')
        }
    
    return comparison

# Decorator for performance tracking
def track_performance(func):
    import time
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        print(f"Function {func.__name__} took {end_time - start_time:.4f} seconds")
        return result
    return wrapper

# Example of using the performance tracking decorator
@track_performance
def example_yield_calculation(csv_file):
    return calculate_average_yields(csv_file)

if __name__ == "__main__":
    main()