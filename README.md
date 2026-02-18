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

---

## Where to run this?

Run commands from the project root folder:

```bash
cd /path/to/Smart-krishi-AI-farming-assistant-
```

You need **2 terminals**:

- **Terminal 1:** backend (FastAPI) on port `8000`
- **Terminal 2:** frontend (React/Vite) on port `5173`

---

## Quick Start

### 1) Start Backend (Terminal 1)

From project root:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

Backend API will be available at:

- `http://127.0.0.1:8000`
- API docs: `http://127.0.0.1:8000/docs`

### 2) Start Frontend (Terminal 2)

From project root:

```bash
cd frontend
npm install
npm run dev
```

Frontend will be available at:

- `http://127.0.0.1:5173`

---

## API Endpoints

- `GET /api/dashboard`
- `POST /api/recommend-crop`
- `POST /api/detect-disease`
- `GET /api/market-prices?crop=<name>`
- `GET /api/notifications?role=farmer|admin`

---

## Common Issues

- If frontend cannot call backend, confirm backend is running on port `8000`.
- If `npm install` fails in restricted environments, run it on a machine with npm registry access.
- If upload fails on disease detection, ensure `python-multipart` is installed in backend env.
