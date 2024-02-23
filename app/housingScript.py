# pip install requests

import os
from dotenv import load_dotenv
import requests
from supabase import create_client


load_dotenv()
supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_KEY"))

# Stores the new House data into both our supabase DBs
# listType is a string type, either "sale" or "rent". Use to differentiate the property listing tye
def addNewData(response, listType):
  num = 0
  for house in response.json():
    data, count = supabase.table('HousingData').select('*').eq("id", house["id"]).execute()

    if len(data[1]) == 0:
      filteredData = supabase.table("HousingData").insert({"id": house["id"], "listingType": listType, "price": house["price"], "address": house["formattedAddress"], "propertyType": house["propertyType"], "listedDate": house["listedDate"], "status": house["status"], "lat": house["latitude"], "lon": house["longitude"]}).execute()
      rawData = supabase.table("HousingRawData").insert({"id": house["id"], "data": house, "listingType": listType}).execute()
      num = num + 1

  print("Added ", num, " new properties for ", listType)

headers = {
    "accept": "application/json",
    "X-Api-Key": os.getenv("API_KEY")
}

# Adding new properties for sale
url = "https://api.rentcast.io/v1/listings/sale?city=Chicago&state=IL&status=Active&limit=100"
response = requests.get(url, headers=headers)
addNewData(response, "sale")

# Adding new properties for rent
url = "https://api.rentcast.io/v1/listings/rental/long-term?city=Chicago&state=IL&status=Active&limit=100"
response = requests.get(url, headers=headers)
addNewData(response, "rent")
