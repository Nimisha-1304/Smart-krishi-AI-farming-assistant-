# Smart Krishi – AI Farming Assistant

Smart Krishi is a modern, responsive AI-powered farming assistant designed for Indian farmers.
It provides weather-aware crop alerts, AI crop recommendations, crop disease detection, mandi market trends,
multilingual support (English, Hindi, Marathi), and role-based dashboards (Farmer/Admin).

## Stack

- **Frontend:** React + TypeScript + Tailwind CSS (Vite)
- **Backend:** FastAPI
- **Integration:** REST API

## Features Delivered

- Dashboard with real-time-like sensor cards (Temperature, Humidity, Soil Moisture, Rainfall)
- Animated weather cards and crop health status (Healthy / Moderate / Critical)
- Crop alert section (example: *Rain expected today – Harvest now*)
- AI crop recommendation module
- Disease detection upload flow with confidence and treatment suggestion
- Market price tracker with crop filter and trend visualization
- Single global translator system for English/Hindi/Marathi
- Role switch between Farmer Dashboard and Admin Panel
- Notifications for weather, harvest, and fertilizer schedule
- Mobile-first green gradient UI with rounded cards and soft shadows

## Run Backend

```bash
python -m venv .venv
source .venv/bin/activate
pip install fastapi uvicorn python-multipart
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

## Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://127.0.0.1:5173`.

## API Endpoints

- `GET /api/dashboard`
- `POST /api/recommend-crop`
- `POST /api/detect-disease`
- `GET /api/market-prices?crop=<name>`
- `GET /api/notifications?role=farmer|admin`
