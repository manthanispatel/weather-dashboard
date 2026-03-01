from fastapi import FastAPI

# Initialize the FastAPI app
app = FastAPI()

# Create our first "Route" (or endpoint)
@app.get("/")
def read_root():
    return {"message": "Welcome to the Weather API Engine!"}