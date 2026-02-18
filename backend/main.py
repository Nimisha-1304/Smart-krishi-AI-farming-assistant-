from datetime import datetime
from typing import Literal

from fastapi import FastAPI, File, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Smart Krishi AI Farming Assistant API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class CropRecommendationRequest(BaseModel):
    soil_type: str
    season: str
    location: str
    soil_moisture: float


class CropRecommendationResponse(BaseModel):
    crop: str
    expected_yield: str
    fertilizers: list[str]


@app.get("/api/dashboard")
def get_dashboard_data():
    return {
        "sensor_data": {
            "temperature": 29,
            "humidity": 71,
            "soil_moisture": 44,
            "rainfall": 6,
        },
        "crop_alert": "Rain expected today – Harvest now",
        "weather_cards": [
            {"day": "Today", "condition": "Cloudy", "temperature": "29°C"},
            {"day": "Tomorrow", "condition": "Rain", "temperature": "26°C"},
            {"day": "Day 3", "condition": "Sunny", "temperature": "31°C"},
        ],
        "crop_health_status": "Moderate",
        "last_updated": datetime.utcnow().isoformat() + "Z",
    }


@app.post("/api/recommend-crop", response_model=CropRecommendationResponse)
def recommend_crop(payload: CropRecommendationRequest):
    if payload.season.lower() == "kharif":
        crop = "Paddy"
        expected_yield = "26 quintals/acre"
        fertilizers = ["Urea", "DAP", "MOP"]
    elif payload.season.lower() == "rabi":
        crop = "Wheat"
        expected_yield = "20 quintals/acre"
        fertilizers = ["NPK 20-20-0", "Zinc Sulfate"]
    else:
        crop = "Maize"
        expected_yield = "18 quintals/acre"
        fertilizers = ["Compost", "NPK 10-26-26"]

    if payload.soil_moisture < 30:
        fertilizers.append("Bio-stimulant")

    return {
        "crop": f"{crop} ({payload.soil_type.title()} soil)",
        "expected_yield": expected_yield,
        "fertilizers": fertilizers,
    }


@app.post("/api/detect-disease")
async def detect_disease(
    file: UploadFile = File(...),
    crop_type: Literal["tomato", "potato", "cotton", "wheat"] = Form("tomato"),
):
    filename = file.filename.lower()
    await file.read()

    if "blight" in filename:
        disease = "Early Blight"
        confidence = 92
        treatment = "Spray Mancozeb 75% WP every 7 days and remove infected leaves."
    elif crop_type == "cotton":
        disease = "Bacterial Blight"
        confidence = 86
        treatment = "Use copper oxychloride spray and avoid overhead irrigation."
    else:
        disease = "Leaf Spot"
        confidence = 79
        treatment = "Apply neem-based fungicide and improve field drainage."

    return {
        "detected_disease": disease,
        "confidence": confidence,
        "suggestions": treatment,
    }


@app.get("/api/market-prices")
def market_prices(crop: str | None = None):
    mandi_data = [
        {"crop": "Wheat", "price": 2320, "trend": [2140, 2200, 2260, 2320]},
        {"crop": "Paddy", "price": 2180, "trend": [2020, 2080, 2110, 2180]},
        {"crop": "Cotton", "price": 6820, "trend": [6500, 6630, 6720, 6820]},
        {"crop": "Maize", "price": 1890, "trend": [1760, 1810, 1850, 1890]},
    ]

    if crop:
        filtered = [item for item in mandi_data if item["crop"].lower() == crop.lower()]
        return filtered

    return mandi_data


@app.get("/api/notifications")
def get_notifications(role: Literal["farmer", "admin"] = "farmer"):
    base_notifications = [
        "Weather alert: Heavy rain expected after 5 PM",
        "Harvest reminder: Start paddy harvest in low-lying fields",
        "Fertilizer schedule: Apply nitrogen top-dressing this week",
    ]

    if role == "admin":
        base_notifications.append("Admin alert: 12 farmers require disease diagnosis review")

    return {"role": role, "items": base_notifications}
