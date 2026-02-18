import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api'
});

export interface DashboardData {
  sensor_data: { temperature: number; humidity: number; soil_moisture: number; rainfall: number };
  crop_alert: string;
  weather_cards: { day: string; condition: string; temperature: string }[];
  crop_health_status: 'Healthy' | 'Moderate' | 'Critical';
}

export const fetchDashboard = async () => (await api.get<DashboardData>('/dashboard')).data;

export const getCropRecommendation = async (payload: {
  soil_type: string;
  season: string;
  location: string;
  soil_moisture: number;
}) => (await api.post('/recommend-crop', payload)).data;

export const detectDisease = async (formData: FormData) =>
  (await api.post('/detect-disease', formData, { headers: { 'Content-Type': 'multipart/form-data' } })).data;

export const fetchPrices = async (crop?: string) =>
  (await api.get('/market-prices', { params: crop ? { crop } : {} })).data;

export const fetchNotifications = async (role: 'farmer' | 'admin') =>
  (await api.get('/notifications', { params: { role } })).data;
