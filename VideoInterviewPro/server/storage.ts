import pandas as pd
import os

def save_user_data(data: dict, filename="user_data.xlsx"):
    # Convert the dictionary to a DataFrame
    new_row = pd.DataFrame([data])

    # Check if the file exists
    if os.path.exists(filename):
        # Load existing data
        existing_data = pd.read_excel(filename, engine="openpyxl")
        # Append new row
        updated_data = pd.concat([existing_data, new_row], ignore_index=True)
    else:
        # Create new file with the first row
        updated_data = new_row

    # Save to Excel
    updated_data.to_excel(filename, index=False, engine="openpyxl")
    print(f"Data saved to {filename}")

# Example usage
sample_data = {
    "Email": "sadeeq@example.com",
    "Name": "Sadeeq Williams",
    "Division": "WEEG",
    "Job Title": "Intern",
    "Location": "Cape Town",
    "Hiring Manager": "Kayleigh Taljaard",
    "Job Grade": "A1",
    "Job Grade & Occ Level": "A1 - Entry",
    "Date Advertised": "2025-10-08",
    "Length of search (weeks & months)": "2 weeks",
    "Platforms Advertised": "LinkedIn, Careers Page",
    "Candidate Name": "John Doe",
    "Designation Group": "Graduate",
    "Shortlisted (Yes/No)": "Yes",
    "Number Shortlisted": 3,
    "Reason for Selection/Non-selection": "Strong technical skills",
    "African Male": 1,
    "African Female": 2,
    "Coloured Male": 0,
    "Coloured Female": 1,
    "Indian Male": 0,
    "Indian Female": 0,
    "White Male": 0,
    "White Female": 1
}

save_user_data(sample_data)