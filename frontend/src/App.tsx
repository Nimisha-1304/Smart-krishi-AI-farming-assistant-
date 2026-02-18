import { useEffect, useMemo, useState } from 'react';
import {
  Bell,
  CloudRain,
  Droplets,
  Leaf,
  ShieldAlert,
  Sprout,
  SunMedium,
  Thermometer,
  TrendingUp,
  Upload,
  Waves,
} from 'lucide-react';
import {
  detectDisease,
  fetchDashboard,
  fetchNotifications,
  fetchPrices,
  getCropRecommendation,
  type DashboardData,
} from './services/api';

type Lang = 'en' | 'hi' | 'mr';

const dictionary: Record<Lang, Record<string, string>> = {
  en: {
    title: 'Smart Krishi – AI Farming Assistant',
    subtitle: 'Digital farming companion for Indian farmers',
    farmer: 'Farmer Dashboard',
    admin: 'Admin Panel',
    dashboard: 'Dashboard',
    recommendation: 'AI Crop Recommendation',
    disease: 'Disease Detection',
    market: 'Market Price Tracker',
    notifications: 'Notifications',
    alert: 'Crop Alert',
  },
  hi: {
    title: 'स्मार्ट कृषि – एआई फार्मिंग असिस्टेंट',
    subtitle: 'भारतीय किसानों के लिए डिजिटल सहायक',
    farmer: 'किसान डैशबोर्ड',
    admin: 'एडमिन पैनल',
    dashboard: 'डैशबोर्ड',
    recommendation: 'एआई फसल सुझाव',
    disease: 'रोग पहचान',
    market: 'मंडी मूल्य ट्रैकर',
    notifications: 'सूचनाएं',
    alert: 'फसल अलर्ट',
  },
  mr: {
    title: 'स्मार्ट कृषी – एआय फार्मिंग सहाय्यक',
    subtitle: 'भारतीय शेतकऱ्यांसाठी डिजिटल सहकारी',
    farmer: 'शेतकरी डॅशबोर्ड',
    admin: 'अ‍ॅडमिन पॅनेल',
    dashboard: 'डॅशबोर्ड',
    recommendation: 'एआय पीक शिफारस',
    disease: 'रोग शोध',
    market: 'बाजारभाव ट्रॅकर',
    notifications: 'सूचना',
    alert: 'पीक अलर्ट',
  },
};

const statusColor: Record<string, string> = {
  Healthy: 'bg-emerald-100 text-emerald-700',
  Moderate: 'bg-amber-100 text-amber-700',
  Critical: 'bg-rose-100 text-rose-700',
};

export default function App() {
  const [language, setLanguage] = useState<Lang>('en');
  const [role, setRole] = useState<'farmer' | 'admin'>('farmer');
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [prices, setPrices] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [cropFilter, setCropFilter] = useState('');
  const [recommendInput, setRecommendInput] = useState({ soil_type: '', season: '', location: '', soil_moisture: 40 });
  const [recommendation, setRecommendation] = useState<any>(null);
  const [diseaseResult, setDiseaseResult] = useState<any>(null);

  const t = (key: string) => dictionary[language][key] ?? key;

  useEffect(() => {
    fetchDashboard().then(setDashboard);
  }, []);

  useEffect(() => {
    fetchPrices(cropFilter || undefined).then(setPrices);
  }, [cropFilter]);

  useEffect(() => {
    fetchNotifications(role).then((res) => setNotifications(res.items));
  }, [role]);

  const sensorItems = useMemo(
    () => [
      { label: 'Temperature', value: `${dashboard?.sensor_data.temperature ?? '--'}°C`, icon: Thermometer },
      { label: 'Humidity', value: `${dashboard?.sensor_data.humidity ?? '--'}%`, icon: Droplets },
      { label: 'Soil Moisture', value: `${dashboard?.sensor_data.soil_moisture ?? '--'}%`, icon: Waves },
      { label: 'Rainfall', value: `${dashboard?.sensor_data.rainfall ?? '--'} mm`, icon: CloudRain },
    ],
    [dashboard]
  );

  const onDiseaseUpload = async (file: File) => {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('crop_type', 'tomato');
    const result = await detectDisease(fd);
    setDiseaseResult(result);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-3xl bg-gradient-to-r from-farm-700 to-farm-500 p-6 text-white shadow-soft">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold md:text-3xl">{t('title')}</h1>
              <p className="text-sm text-emerald-50">{t('subtitle')}</p>
            </div>
            <div className="flex gap-2">
              <select className="rounded-xl px-3 py-2 text-slate-800" value={language} onChange={(e) => setLanguage(e.target.value as Lang)}>
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="mr">मराठी</option>
              </select>
              <button
                onClick={() => setRole('farmer')}
                className={`rounded-xl px-3 py-2 text-sm ${role === 'farmer' ? 'bg-white text-farm-700' : 'bg-white/20'}`}
              >
                {t('farmer')}
              </button>
              <button
                onClick={() => setRole('admin')}
                className={`rounded-xl px-3 py-2 text-sm ${role === 'admin' ? 'bg-white text-farm-700' : 'bg-white/20'}`}
              >
                {t('admin')}
              </button>
            </div>
          </div>
        </header>

        <main className="grid gap-6 lg:grid-cols-3">
          <section className="space-y-4 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {sensorItems.map(({ label, value, icon: Icon }) => (
                <article key={label} className="rounded-2xl bg-white p-4 shadow-soft">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-slate-600">{label}</h3>
                    <Icon className="h-5 w-5 text-farm-600" />
                  </div>
                  <p className="mt-3 text-2xl font-bold">{value}</p>
                </article>
              ))}
            </div>

            <article className="rounded-2xl bg-white p-5 shadow-soft">
              <div className="mb-3 flex items-center gap-2 text-farm-700">
                <ShieldAlert className="h-5 w-5" />
                <h3 className="font-semibold">{t('alert')}</h3>
              </div>
              <p className="rounded-xl bg-farm-50 p-3 text-farm-900">{dashboard?.crop_alert}</p>
              <p className={`mt-3 inline-flex rounded-full px-3 py-1 text-sm font-medium ${statusColor[dashboard?.crop_health_status ?? 'Moderate']}`}>
                Crop Health: {dashboard?.crop_health_status}
              </p>
            </article>

            <article className="rounded-2xl bg-white p-5 shadow-soft">
              <h3 className="mb-4 font-semibold">Animated Weather Cards</h3>
              <div className="grid gap-3 md:grid-cols-3">
                {dashboard?.weather_cards.map((card) => (
                  <div key={card.day} className="animate-float rounded-xl bg-gradient-to-br from-emerald-100 to-cyan-50 p-4">
                    <p className="font-semibold">{card.day}</p>
                    <p className="text-sm text-slate-600">{card.condition}</p>
                    <p className="mt-2 flex items-center gap-2 text-xl font-bold">
                      <SunMedium className="h-4 w-4" /> {card.temperature}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-2xl bg-white p-5 shadow-soft">
              <h3 className="mb-3 font-semibold">{t('recommendation')}</h3>
              <div className="grid gap-3 md:grid-cols-2">
                {['soil_type', 'season', 'location'].map((key) => (
                  <input
                    key={key}
                    placeholder={key.replace('_', ' ')}
                    className="rounded-xl border p-2"
                    onChange={(e) => setRecommendInput((p) => ({ ...p, [key]: e.target.value }))}
                  />
                ))}
                <input
                  type="number"
                  placeholder="Soil moisture"
                  className="rounded-xl border p-2"
                  value={recommendInput.soil_moisture}
                  onChange={(e) => setRecommendInput((p) => ({ ...p, soil_moisture: Number(e.target.value) }))}
                />
              </div>
              <button
                className="mt-3 rounded-xl bg-farm-600 px-4 py-2 text-white"
                onClick={async () => setRecommendation(await getCropRecommendation(recommendInput))}
              >
                Suggest Crop
              </button>
              {recommendation && (
                <div className="mt-3 rounded-xl bg-farm-50 p-3 text-sm">
                  <p>Best Crop: {recommendation.crop}</p>
                  <p>Expected Yield: {recommendation.expected_yield}</p>
                  <p>Required Fertilizers: {recommendation.fertilizers.join(', ')}</p>
                </div>
              )}
            </article>

            <article className="rounded-2xl bg-white p-5 shadow-soft">
              <h3 className="mb-3 font-semibold">{t('disease')}</h3>
              <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-dashed p-4 text-sm">
                <Upload className="h-4 w-4" /> Upload crop leaf image
                <input type="file" className="hidden" onChange={(e) => e.target.files?.[0] && onDiseaseUpload(e.target.files[0])} />
              </label>
              {diseaseResult && (
                <div className="mt-3 rounded-xl bg-amber-50 p-3 text-sm">
                  <p>Detected disease: {diseaseResult.detected_disease}</p>
                  <p>Confidence: {diseaseResult.confidence}%</p>
                  <p>Treatment: {diseaseResult.suggestions}</p>
                </div>
              )}
            </article>
          </section>

          <aside className="space-y-4">
            <article className="rounded-2xl bg-white p-5 shadow-soft">
              <h3 className="mb-3 flex items-center gap-2 font-semibold">
                <TrendingUp className="h-4 w-4 text-farm-700" /> {t('market')}
              </h3>
              <input
                className="mb-3 w-full rounded-xl border p-2"
                placeholder="Filter by crop"
                value={cropFilter}
                onChange={(e) => setCropFilter(e.target.value)}
              />
              <div className="space-y-2">
                {prices.map((item) => (
                  <div key={item.crop} className="rounded-xl bg-slate-50 p-3 text-sm">
                    <p className="font-semibold">{item.crop} — ₹{item.price}/quintal</p>
                    <p className="text-xs text-slate-500">Trend: {item.trend.join(' → ')}</p>
                    <div className="mt-2 h-2 rounded bg-emerald-100">
                      <div className="h-2 rounded bg-emerald-500" style={{ width: `${Math.min((item.price / 7000) * 100, 100)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-2xl bg-white p-5 shadow-soft">
              <h3 className="mb-3 flex items-center gap-2 font-semibold">
                <Bell className="h-4 w-4 text-farm-700" /> {t('notifications')}
              </h3>
              <ul className="space-y-2 text-sm">
                {notifications.map((note) => (
                  <li key={note} className="rounded-lg bg-farm-50 p-2">
                    {note}
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-2xl bg-white p-5 shadow-soft">
              <h3 className="mb-2 flex items-center gap-2 font-semibold">
                <Leaf className="h-4 w-4 text-farm-700" /> Role Summary
              </h3>
              <p className="text-sm text-slate-600">
                {role === 'admin'
                  ? 'Admin panel mode: reviews analytics, farmer outreach and disease escalation queue.'
                  : 'Farmer mode: field-level alerts, crop suggestions, and mandi price intelligence.'}
              </p>
              <div className="mt-3 rounded-xl bg-emerald-50 p-2 text-xs text-emerald-700">
                <Sprout className="mr-1 inline h-4 w-4" /> Designed with mobile-first, rural-friendly UX.
              </div>
            </article>
          </aside>
        </main>
      </div>
    </div>
  );
}
