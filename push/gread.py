import gspread
import sys
import json

# Credentials [Keys etc]
credFileName = "../credentials.json"
mServiceAccount = gspread.service_account(filename=credFileName)
mGoogleSheetId = sys.argv[1].split('sheetname')[0]

#Open the sheet based on sheet id passed
mGoogleSheet = mServiceAccount.open_by_key(mGoogleSheetId)

#checking if variable is None
if sys.argv[1].split('sheetname')[1] == "null":                   
    sheetName = mGoogleSheet.worksheets()[0].title
else :
    sheetName = sys.argv[1].split('sheetname')[1]

# Getting the date from the mentioned sheet name
mSelectedWorkSheet = mGoogleSheet.worksheet(sheetName)

# Converting Data to Required JSON
records = mSelectedWorkSheet.get_all_records()

# Convert the Python list/dict to a proper JSON string
json_data = json.dumps(records)

print(json_data) # This will now have double quotes