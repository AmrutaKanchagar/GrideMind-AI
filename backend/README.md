# ⚡ GridMind AI
### AI-Powered Smart Energy Intelligence & Optimization Platform

![Status](https://img.shields.io/badge/Status-Under%20Development-orange)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![React](https://img.shields.io/badge/Frontend-React-blue)
![Gemini](https://img.shields.io/badge/AI-Google%20Gemini-red)
![Qdrant](https://img.shields.io/badge/VectorDB-Qdrant-purple)

---

# 📖 Overview

GridMind AI is an AI-powered Energy Intelligence Platform that helps homes, industries, offices, and factories analyze electricity consumption, predict future usage, detect anomalies, estimate savings, and provide intelligent recommendations using Generative AI.

The platform combines Google Gemini, Mastra AI workflows, Qdrant Vector Database, and modern web technologies to create a smart energy assistant.

---

# 🎯 Problem Statement

Many homes and industries struggle to:

- Understand why electricity bills increase
- Predict future energy costs
- Detect abnormal energy consumption
- Compare performance with similar facilities
- Plan investments like solar panels or battery storage

GridMind AI solves these problems using AI-powered analysis and predictive intelligence.

---

# ✨ Features

## ✅ AI Energy Analysis
- Analyze electricity usage
- Generate AI-powered reports
- Risk assessment
- Energy grading

---

## ✅ Historical Memory (Qdrant)
- Store historical energy records
- Semantic similarity search
- Compare with previous usage

---

## ✅ Future Prediction
- Predict future electricity consumption
- Forecast electricity bills
- Forecast risk level

---

## ✅ Weather Intelligence
- Live weather integration
- Weather impact on electricity usage
- Temperature-based prediction

---

## ✅ Industry Benchmark
- Compare with similar factories
- Efficiency score
- AI benchmarking

---

## ✅ Solar ROI Estimator
- Recommended solar capacity
- Installation cost
- Payback period
- Lifetime savings

---

## ✅ Battery Recommendation
- Battery capacity recommendation
- Estimated backup hours
- Estimated cost

---

## 🚧 Upcoming Features

- Carbon Footprint Calculator
- Smart Energy Advisor
- AI Chatbot
- Scenario Simulator
- PDF Report Generator
- Email Reports
- Interactive Dashboard
- User Authentication
- Voice Assistant

---

# 🏗 Tech Stack

## Backend

- Node.js
- Express.js
- Mastra AI
- Google Gemini API
- Qdrant Vector Database

## Frontend

- React
- Vite
- Tailwind CSS
- Chart.js / Recharts (planned)

## AI

- Google Gemini
- Prompt Engineering
- AI Workflows

---

# 📂 Project Structure

```text
GridMind-AI/
│
├── frontend/
│
├── src/
│   ├── agents/
│   ├── mastra/
│   ├── prediction/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── middleware/
│   └── app.js
│
├── package.json
├── README.md
└── .env
```

---

# ⚙ Installation

Clone the repository

```bash
git clone <repository-url>
```

Install dependencies

```bash
npm install
```

Create `.env`

```env
PORT=3000

GEMINI_API_KEY=YOUR_KEY
GEMINI_MODEL=gemini-2.0-flash

QDRANT_URL=YOUR_QDRANT_URL

QDRANT_API_KEY=YOUR_QDRANT_API_KEY

WEATHER_API_KEY=YOUR_OPENWEATHER_KEY
ENKRYPT_API_KEY=YOUR_ENKRYPT_KEY
```

You can copy `backend/.env.example` to `.env` and fill in your real values locally.

Start the backend

```bash
node src/app.js
```

Start the frontend

```bash
cd frontend
npm install
npm run dev
```

---

# 📡 API Endpoint

### Analyze Energy

```
POST /api/energy/analyze
```

Example Request

```json
{
  "monthlyUnits":420,
  "billAmount":3200,
  "peakUsageTime":"evening",
  "appliances":[
    "AC",
    "Motor",
    "Lights"
  ],
  "locationType":"factory",
  "city":"Bengaluru"
}
```

---

# 🧠 AI Workflow

```
User Input

↓

Validation

↓

Store in Qdrant

↓

Retrieve Similar Cases

↓

Weather Analysis

↓

Anomaly Detection

↓

Prediction Engine

↓

Industry Comparison

↓

Solar ROI

↓

Battery Recommendation

↓

Gemini AI Analysis

↓

Final Report
```

---

# 🚀 Future Scope

- Smart Grid Integration
- IoT Sensor Support
- Live Smart Meter Monitoring
- AI Energy Assistant
- Mobile Application
- Multi-language Support
- Carbon Emission Tracking
- Renewable Energy Planning

---

# 👨‍💻 Team

Project Name:
**GridMind AI**

Developed for:
**Google AI Agent Builder Series 2026**

---

# 📄 License

This project is developed for educational and hackathon purposes.