import os
import requests
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  # <-- 1. Import the security tool
from dotenv import load_dotenv

# 1. Unlock the .env safe
load_dotenv()

app = FastAPI()

# ADD THIS NEW CORS SETUP ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # Tell Python to explicitly trust your React app
    allow_credentials=True,
    allow_methods=["*"], # Allow all types of web requests
    allow_headers=["*"],
)

# 2. Grab the API key securely from the safe
API_KEY = os.getenv("API_KEY")

# ADD THIS LINE:
print(f"DEBUG: My API Key is currently -> {API_KEY}")

@app.get("/")
def read_root():
    return {"message": "Welcome to the Weather API Engine!"}

@app.get("/api/weather/{city}")
def get_weather(city: str):

    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"

    response = requests.get(url)

    # Check if the city was found
    if response.status_code != 200:
        return {"error": "City not found"}

    

    data = response.json()

    #Parse the relevant weather data
    clean_data = {
        "city": data["name"],
        "temperature": data["main"]["temp"],
        "description": data["weather"][0]["description"].title(), 
        "humidity": data["main"]["humidity"],
        "icon": data["weather"][0]["icon"] 
    }

    return clean_data