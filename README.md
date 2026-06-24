<![CDATA[<div align="center">

# 🧠 ClaimNet

### End-to-End ML-Powered Insurance Claim Prediction System

[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![Flask](https://img.shields.io/badge/Flask-2.x-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![scikit-learn](https://img.shields.io/badge/scikit--learn-1.x-F7931E?style=for-the-badge&logo=scikitlearn&logoColor=white)](https://scikit-learn.org)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

An industrial-grade insurance claim decision support system built as a **Bachelor of Engineering (B.E.) Capstone Project**. Leverages a fully serialized scikit-learn pipeline with automated feature engineering, data preprocessing, and real-time prediction — guaranteeing **zero training-inference skew**.

[Features](#-features) · [Architecture](#-architecture) · [Quick Start](#-quick-start) · [API Reference](#-api-reference) · [Tech Stack](#-tech-stack)

</div>

---

## 📋 Table of Contents

- [Features](#-features)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
  - [Prerequisites](#prerequisites)
  - [One-Command Launch](#one-command-launch)
  - [Manual Setup](#manual-setup)
- [API Reference](#-api-reference)
- [Tech Stack](#-tech-stack)
- [ML Model Details](#-ml-model-details)
- [Frontend Pages](#-frontend-pages)
- [Environment Variables](#-environment-variables)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

| Category | Feature | Description |
|----------|---------|-------------|
| 🤖 **ML Engine** | Serialized Pipeline | End-to-end scikit-learn Pipeline (Imputer → OrdinalEncoder → StandardScaler → RandomForest) with zero training-inference skew |
| ⚡ **Performance** | Sub-100ms Inference | Real-time predictions with low-latency response times |
| 📊 **Analytics** | Live Dashboard | Interactive charts (Recharts) with claims volumetrics, regional penetration, and asset class breakdowns |
| 🛡️ **Risk Engine** | Adaptive Risk Profiling | Automatically flags young drivers, low credit scores, high-risk vehicles, and claim frequency anomalies |
| 🔍 **Explainability** | Confidence Scoring | Returns decision confidence (High/Medium/Low) with all derived feature computations visible to the user |
| 📦 **Batch Processing** | Bulk Predictions | Batch endpoint supports up to 100 claims per request |
| 🎨 **Design** | Premium Dark UI | Glassmorphism effects, framer-motion animations, and a cyber-themed design system |
| ✅ **Validation** | Input Guardrails | Comprehensive server-side validation with descriptive error messages |

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                         │
│  ┌─────────┐  ┌──────────┐  ┌───────────┐  ┌────────────┐  │
│  │  Home   │  │ Predict  │  │ Dashboard │  │   About    │  │
│  │  Page   │  │  Panel   │  │  (Charts) │  │ (Specs)    │  │
│  └────┬────┘  └────┬─────┘  └─────┬─────┘  └────────────┘  │
│       │            │              │                          │
│       └────────────┴──────────────┘                          │
│                    │                                         │
│          React 18 + Vite + Tailwind CSS                      │
│          Framer Motion + Recharts + Lucide                   │
└────────────────────┬────────────────────────────────────────┘
                     │  HTTP (JSON)
                     │  Port 5173 → Proxy → Port 5000
┌────────────────────┴────────────────────────────────────────┐
│                       API LAYER (Flask)                      │
│                                                              │
│  ┌──────────┐  ┌──────────────┐  ┌────────────────────────┐ │
│  │  /health │  │   /predict   │  │    /predict/batch      │ │
│  │  /docs   │  │  (single)    │  │    (up to 100)         │ │
│  │  /model  │  │              │  │                        │ │
│  └──────────┘  └──────┬───────┘  └───────────┬────────────┘ │
│                       │                      │               │
│                ┌──────┴──────────────────────┴──────┐       │
│                │        INFERENCE PIPELINE           │       │
│                │                                     │       │
│                │  Input Validation                    │       │
│                │       ↓                              │       │
│                │  Derived Feature Engineering         │       │
│                │  (7 computed columns)                │       │
│                │       ↓                              │       │
│                │  Serialized sklearn Pipeline         │       │
│                │  (joblib model.pkl)                  │       │
│                │       ↓                              │       │
│                │  Decision + Confidence + Risk Flags  │       │
│                └─────────────────────────────────────┘       │
└──────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
ClaimNet/
├── 📄 README.md                    # This file
├── 📄 LICENSE                      # MIT License
├── 📄 .gitignore                   # Git ignore rules
├── 🔧 start.bat                    # One-click Windows launcher
├── 🔧 start.sh                     # One-click Linux/macOS launcher
│
├── 🐍 backend/                     # Flask REST API
│   ├── app.py                      # Main application (routes, validation, inference)
│   ├── requirements.txt            # Python dependencies
│   ├── final_claimnet_model.pkl    # Serialized ML pipeline (joblib)
│   └── insurance_claims_raw_10k.csv # Training reference dataset (10K records)
│
└── ⚛️  frontend/                    # React SPA
    ├── index.html                  # HTML entry point
    ├── package.json                # Node.js dependencies & scripts
    ├── vite.config.js              # Vite config (dev server + API proxy)
    ├── tailwind.config.js          # Tailwind CSS design tokens
    ├── postcss.config.js           # PostCSS configuration
    ├── public/
    │   └── claimnet-icon.svg       # App favicon/icon
    └── src/
        ├── main.jsx                # React entry point
        ├── App.jsx                 # Root component (routing)
        ├── index.css               # Global styles & design system
        ├── components/
        │   ├── Layout.jsx          # App shell (navbar, footer, particles)
        │   └── Particles.jsx       # Animated background particles
        └── pages/
            ├── Home.jsx            # Landing page with hero & feature cards
            ├── Predict.jsx         # Multi-step prediction form + results
            ├── Dashboard.jsx       # Analytics dashboard with charts
            └── About.jsx           # System specs & API documentation
```

---

## 🚀 Quick Start

### Prerequisites

| Tool | Version | Purpose |
|------|---------|---------|
| **Python** | 3.10+ | Backend runtime |
| **Node.js** | 18+ | Frontend runtime |
| **npm** | 9+ | Package management |
| **Git** | Latest | Version control |

### One-Command Launch

The easiest way to start both servers simultaneously:

**Windows:**
```bash
start.bat
```

**Linux / macOS:**
```bash
chmod +x start.sh
./start.sh
```

This will:
1. Create a Python virtual environment (if it doesn't exist)
2. Install backend dependencies
3. Start the Flask API on `http://localhost:5000`
4. Install frontend dependencies
5. Start the Vite dev server on `http://localhost:5173`

### Manual Setup

#### Backend

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the Flask server
python app.py
```

The API will be available at `http://localhost:5000`

#### Frontend

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

#### Production Build (Frontend)

```bash
cd frontend
npm run build
npm run preview
```

---

## 📡 API Reference

Base URL: `http://localhost:5000`

### Endpoints

#### `GET /` — API Root
Returns API info and available endpoints.

#### `GET /health` — Health Check
```json
{
  "status": "healthy",
  "timestamp": "2026-06-24T12:00:00",
  "model_loaded": true,
  "version": "1.0.0"
}
```

#### `GET /model/info` — Model Information
Returns the active model type, feature dimensions, categorical encoders, and serialization timestamp.

#### `GET /docs` — API Documentation
Returns full self-documented endpoint specifications.

#### `POST /predict` — Single Claim Prediction

**Request Body:**
```json
{
  "age": 34,
  "gender": "Male",
  "marital_status": "Married",
  "income": 85000,
  "education_level": "Bachelor",
  "employment_status": "Employed",
  "credit_score": 720,
  "vehicle_age": 3,
  "vehicle_type": "Sedan",
  "vehicle_price": 35000,
  "policy_tenure": 4,
  "premium_amount": 2500,
  "no_of_claims": 1,
  "accident_severity": "Moderate",
  "region": "North",
  "agent_rating": 4,
  "claim_amount": 4000,
  "fraudulent_flag": 0
}
```

**Response:**
```json
{
  "approved": true,
  "probability": 0.8742,
  "confidence": "High",
  "derived_features": {
    "premium_to_income_ratio": 0.0294,
    "vehicle_depreciation_ratio": 0.6,
    "claim_to_premium_ratio": 1.5994,
    "is_high_risk_vehicle": false,
    "young_driver_flag": false,
    "low_credit_flag": false,
    "high_claim_frequency": false
  },
  "risk_factors": []
}
```

#### `POST /predict/batch` — Batch Predictions (up to 100 claims)

**Request Body:**
```json
{
  "claims": [
    { /* claim object 1 */ },
    { /* claim object 2 */ }
  ]
}
```

### Input Validation Rules

| Field | Type | Range | Required |
|-------|------|-------|----------|
| `age` | integer | 18 – 100 | ✅ |
| `gender` | string | Male / Female / Other | ✅ |
| `marital_status` | string | Single / Married / Divorced / Widowed | ✅ |
| `income` | number | 0 – 10,000,000 | ✅ |
| `education_level` | string | High School / Bachelor / Master / PhD / Other | ✅ |
| `employment_status` | string | Employed / Self-Employed / Unemployed / Retired / Student | ✅ |
| `credit_score` | integer | 300 – 850 | ✅ |
| `vehicle_age` | integer | 0 – 50 | ✅ |
| `vehicle_type` | string | Sedan / SUV / Truck / Hatchback / Luxury / Sports | ✅ |
| `vehicle_price` | number | 1,000 – 500,000 | ✅ |
| `policy_tenure` | integer | 0 – 50 | ✅ |
| `premium_amount` | number | 100 – 50,000 | ✅ |
| `no_of_claims` | integer | 0 – 50 | ✅ |
| `accident_severity` | string | Minor / Moderate / Major / Total Loss | ✅ |
| `region` | string | North / South / East / West / Central | ✅ |
| `agent_rating` | integer | 1 – 5 | ✅ |
| `claim_amount` | number | 100 – 1,000,000 | ✅ |
| `fraudulent_flag` | integer | 0 – 1 | ❌ (default: 0) |

---

## 🛠 Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| **Flask** | Lightweight WSGI web framework for REST API |
| **Flask-CORS** | Cross-Origin Resource Sharing handling |
| **scikit-learn** | ML pipeline (RandomForestClassifier, preprocessing) |
| **pandas** | DataFrame operations for feature engineering |
| **NumPy** | Numerical computation |
| **joblib** | Model serialization / deserialization |

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | Component-based UI framework |
| **Vite 5** | Next-gen frontend build tool with HMR |
| **React Router v6** | Client-side routing (SPA navigation) |
| **Tailwind CSS 3** | Utility-first CSS framework |
| **Framer Motion** | Declarative animations & page transitions |
| **Recharts** | Composable charting library (bar, pie, donut) |
| **Lucide React** | Beautiful & consistent icon set |

---

## 🧬 ML Model Details

| Property | Value |
|----------|-------|
| **Algorithm** | RandomForestClassifier |
| **Max Depth** | 15 |
| **Number of Estimators** | 100 |
| **Training Dataset** | 10,000 synthetic insurance records |
| **Total Features** | 25 (17 input + 8 derived) |
| **Categorical Features** | 7 (encoded via OrdinalEncoder) |
| **Numerical Features** | 11 (scaled via StandardScaler) |
| **Serialization** | joblib (`.pkl` format) |
| **OOB Score** | ~99.5% |

### Derived Feature Engineering

The system dynamically computes the following features from raw inputs:

| Derived Feature | Formula / Logic |
|----------------|-----------------|
| `premium_to_income_ratio` | `premium_amount / income` |
| `vehicle_depreciation_ratio` | `vehicle_age / (policy_tenure + 1)` |
| `claim_to_premium_ratio` | `claim_amount / (premium_amount + 1)` |
| `is_high_risk_vehicle` | `1` if vehicle_type ∈ {SUV, Truck} else `0` |
| `young_driver_flag` | `1` if age < 25 else `0` |
| `low_credit_flag` | `1` if credit_score < 600 else `0` |
| `high_claim_frequency` | `1` if no_of_claims ≥ 3 else `0` |

### Inference Pipeline Flow

```
Raw JSON Input (17 fields)
    ↓
Input Validation (range checks, categorical checks)
    ↓
Derived Feature Computation (+8 engineered columns = 25 total)
    ↓
DataFrame Construction (column-ordered)
    ↓
Serialized sklearn Pipeline (model.predict + predict_proba)
    ↓
Decision Output (approved/rejected + probability + confidence + risk factors)
```

---

## 🖥 Frontend Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | **Home** | Hero section, feature cards, stats, tech stack display, and CTA |
| `/predict` | **Predict** | Multi-step form (4 sections) with demo data presets, real-time results with donut chart, risk factors, and derived features |
| `/dashboard` | **Dashboard** | Analytics panel with bar charts, pie charts, model config info, and a mock audit log |
| `/about` | **About** | System specs, pipeline architecture, technology grid, and API endpoint docs |

---

## ⚙️ Environment Variables

The application works out of the box with sensible defaults. No `.env` file is required for local development.

| Variable | Default | Location | Description |
|----------|---------|----------|-------------|
| Flask Port | `5000` | `backend/app.py` | Backend API port |
| Vite Dev Port | `5173` | `frontend/vite.config.js` | Frontend dev server port |
| API Proxy | `/api → localhost:5000` | `frontend/vite.config.js` | Dev proxy configuration |
| CORS Origins | `localhost:5173, 5174, 5175, 3000` | `backend/app.py` | Allowed frontend origins |

---

## 🤝 Contributing

1. **Fork** this repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a **Pull Request**

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 👨‍🎓 Academic Context

This project was designed and implemented as a **Final Year Capstone Project** for the **Bachelor of Engineering (B.E.)** program, demonstrating the integration of machine learning systems with modern full-stack web technologies.

---

<div align="center">

**Built with ❤️ using Python, React & scikit-learn**

</div>
]]>
