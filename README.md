# ClaimNet

### End-to-End ML-Powered Insurance Claim Prediction System

![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-2.x-000000?style=for-the-badge&logo=flask&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![scikit-learn](https://img.shields.io/badge/scikit--learn-1.x-F7931E?style=for-the-badge&logo=scikitlearn&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

An industrial-grade insurance claim decision support system built as a **Bachelor of Engineering (B.E.) Capstone Project**. Leverages a fully serialized scikit-learn pipeline with automated feature engineering, data preprocessing, and real-time prediction — guaranteeing **zero training-inference skew**.

---

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [API Reference](#api-reference)
- [Tech Stack](#tech-stack)
- [ML Model Details](#ml-model-details)
- [Frontend Pages](#frontend-pages)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

---

## Features

| Category | Feature | Description |
|----------|---------|-------------|
| ML Engine | Serialized Pipeline | End-to-end scikit-learn Pipeline (Imputer, OrdinalEncoder, StandardScaler, RandomForest) with zero training-inference skew |
| Performance | Sub-100ms Inference | Real-time predictions with low-latency response times |
| Analytics | Live Dashboard | Interactive charts (Recharts) with claims volumetrics, regional penetration, and asset class breakdowns |
| Risk Engine | Adaptive Risk Profiling | Automatically flags young drivers, low credit scores, high-risk vehicles, and claim frequency anomalies |
| Explainability | Confidence Scoring | Returns decision confidence (High/Medium/Low) with all derived feature computations visible to the user |
| Batch Processing | Bulk Predictions | Batch endpoint supports up to 100 claims per request |
| Design | Premium Dark UI | Glassmorphism effects, framer-motion animations, and a cyber-themed design system |
| Validation | Input Guardrails | Comprehensive server-side validation with descriptive error messages |

---

## Architecture

```
+-------------------------------------------------------------+
|                        CLIENT LAYER                          |
|  +---------+  +----------+  +-----------+  +------------+   |
|  |  Home   |  | Predict  |  | Dashboard |  |   About    |   |
|  |  Page   |  |  Panel   |  |  (Charts) |  |  (Specs)   |   |
|  +----+----+  +----+-----+  +-----+-----+  +------------+   |
|       |            |              |                           |
|       +------------+--------------+                           |
|                    |                                          |
|          React 18 + Vite + Tailwind CSS                       |
|          Framer Motion + Recharts + Lucide                    |
+--------------------+----------------------------------------+
                     |  HTTP (JSON)
                     |  Port 5173 -> Proxy -> Port 5000
+--------------------+----------------------------------------+
|                       API LAYER (Flask)                       |
|                                                              |
|  +----------+  +--------------+  +------------------------+  |
|  |  /health |  |   /predict   |  |    /predict/batch      |  |
|  |  /docs   |  |  (single)    |  |    (up to 100)         |  |
|  |  /model  |  |              |  |                        |  |
|  +----------+  +------+-------+  +-----------+------------+  |
|                       |                      |               |
|                +------+----------------------+------+        |
|                |        INFERENCE PIPELINE           |        |
|                |                                     |        |
|                |  Input Validation                   |        |
|                |       |                             |        |
|                |  Derived Feature Engineering        |        |
|                |  (7 computed columns)               |        |
|                |       |                             |        |
|                |  Serialized sklearn Pipeline        |        |
|                |  (joblib model.pkl)                 |        |
|                |       |                             |        |
|                |  Decision + Confidence + Risk Flags |        |
|                +-------------------------------------+        |
+--------------------------------------------------------------+
```

---

## Project Structure

```
ClaimNet/
|-- README.md                        # This file
|-- LICENSE                          # MIT License
|-- .gitignore                       # Git ignore rules
|-- start.bat                        # One-click Windows launcher
|-- start.sh                         # One-click Linux/macOS launcher
|
|-- backend/                         # Flask REST API
|   |-- app.py                       # Main application (routes, validation, inference)
|   |-- requirements.txt             # Python dependencies
|   |-- final_claimnet_model.pkl     # Serialized ML pipeline (joblib)
|   +-- insurance_claims_raw_10k.csv # Training reference dataset (10K records)
|
+-- frontend/                        # React SPA
    |-- index.html                   # HTML entry point
    |-- package.json                 # Node.js dependencies and scripts
    |-- vite.config.js               # Vite config (dev server + API proxy)
    |-- tailwind.config.js           # Tailwind CSS design tokens
    |-- postcss.config.js            # PostCSS configuration
    |-- public/
    |   +-- claimnet-icon.svg        # App favicon/icon
    +-- src/
        |-- main.jsx                 # React entry point
        |-- App.jsx                  # Root component (routing)
        |-- index.css                # Global styles and design system
        |-- components/
        |   |-- Layout.jsx           # App shell (navbar, footer, particles)
        |   +-- Particles.jsx        # Animated background particles
        +-- pages/
            |-- Home.jsx             # Landing page with hero and feature cards
            |-- Predict.jsx          # Multi-step prediction form + results
            |-- Dashboard.jsx        # Analytics dashboard with charts
            +-- About.jsx            # System specs and API documentation
```

---

## Quick Start

### Prerequisites

| Tool | Version | Purpose |
|------|---------|---------|
| Python | 3.10+ | Backend runtime |
| Node.js | 18+ | Frontend runtime |
| npm | 9+ | Package management |
| Git | Latest | Version control |

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

## API Reference

Base URL: `http://localhost:5000`

### Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API root with basic info |
| GET | `/health` | Health check |
| GET | `/model/info` | Model information and statistics |
| GET | `/docs` | API self-documentation |
| POST | `/predict` | Single claim prediction |
| POST | `/predict/batch` | Batch claim predictions (max 100) |

### POST /predict - Single Claim Prediction

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

### POST /predict/batch - Batch Predictions

**Request Body:**

```json
{
  "claims": [
    { "age": 34, "gender": "Male", "...": "..." },
    { "age": 45, "gender": "Female", "...": "..." }
  ]
}
```

### Input Validation Rules

| Field | Type | Range | Required |
|-------|------|-------|----------|
| age | integer | 18 to 100 | Yes |
| gender | string | Male / Female / Other | Yes |
| marital_status | string | Single / Married / Divorced / Widowed | Yes |
| income | number | 0 to 10,000,000 | Yes |
| education_level | string | High School / Bachelor / Master / PhD / Other | Yes |
| employment_status | string | Employed / Self-Employed / Unemployed / Retired / Student | Yes |
| credit_score | integer | 300 to 850 | Yes |
| vehicle_age | integer | 0 to 50 | Yes |
| vehicle_type | string | Sedan / SUV / Truck / Hatchback / Luxury / Sports | Yes |
| vehicle_price | number | 1,000 to 500,000 | Yes |
| policy_tenure | integer | 0 to 50 | Yes |
| premium_amount | number | 100 to 50,000 | Yes |
| no_of_claims | integer | 0 to 50 | Yes |
| accident_severity | string | Minor / Moderate / Major / Total Loss | Yes |
| region | string | North / South / East / West / Central | Yes |
| agent_rating | integer | 1 to 5 | Yes |
| claim_amount | number | 100 to 1,000,000 | Yes |
| fraudulent_flag | integer | 0 to 1 | No (default: 0) |

---

## Tech Stack

### Backend

| Technology | Purpose |
|------------|---------|
| Flask | Lightweight WSGI web framework for REST API |
| Flask-CORS | Cross-Origin Resource Sharing handling |
| scikit-learn | ML pipeline (RandomForestClassifier, preprocessing) |
| pandas | DataFrame operations for feature engineering |
| NumPy | Numerical computation |
| joblib | Model serialization and deserialization |

### Frontend

| Technology | Purpose |
|------------|---------|
| React 18 | Component-based UI framework |
| Vite 5 | Next-gen frontend build tool with HMR |
| React Router v6 | Client-side routing (SPA navigation) |
| Tailwind CSS 3 | Utility-first CSS framework |
| Framer Motion | Declarative animations and page transitions |
| Recharts | Composable charting library (bar, pie, donut) |
| Lucide React | Beautiful and consistent icon set |

---

## ML Model Details

| Property | Value |
|----------|-------|
| Algorithm | RandomForestClassifier |
| Max Depth | 15 |
| Number of Estimators | 100 |
| Training Dataset | 10,000 synthetic insurance records |
| Total Features | 25 (17 input + 8 derived) |
| Categorical Features | 7 (encoded via OrdinalEncoder) |
| Numerical Features | 11 (scaled via StandardScaler) |
| Serialization | joblib (.pkl format) |
| OOB Score | ~99.5% |

### Derived Feature Engineering

The system dynamically computes the following features from raw inputs:

| Derived Feature | Formula / Logic |
|----------------|-----------------|
| premium_to_income_ratio | premium_amount / income |
| vehicle_depreciation_ratio | vehicle_age / (policy_tenure + 1) |
| claim_to_premium_ratio | claim_amount / (premium_amount + 1) |
| is_high_risk_vehicle | 1 if vehicle_type is SUV or Truck, else 0 |
| young_driver_flag | 1 if age < 25, else 0 |
| low_credit_flag | 1 if credit_score < 600, else 0 |
| high_claim_frequency | 1 if no_of_claims >= 3, else 0 |

### Inference Pipeline Flow

```
Raw JSON Input (17 fields)
    |
    v
Input Validation (range checks, categorical checks)
    |
    v
Derived Feature Computation (+8 engineered columns = 25 total)
    |
    v
DataFrame Construction (column-ordered)
    |
    v
Serialized sklearn Pipeline (model.predict + predict_proba)
    |
    v
Decision Output (approved/rejected + probability + confidence + risk factors)
```

---

## Frontend Pages

| Route | Page | Description |
|-------|------|-------------|
| / | Home | Hero section, feature cards, stats, tech stack display, and CTA |
| /predict | Predict | Multi-step form (4 sections) with demo data presets, real-time results with donut chart, risk factors, and derived features |
| /dashboard | Dashboard | Analytics panel with bar charts, pie charts, model config info, and a mock audit log |
| /about | About | System specs, pipeline architecture, technology grid, and API endpoint docs |

---

## Environment Variables

The application works out of the box with sensible defaults. No `.env` file is required for local development.

| Variable | Default | Location | Description |
|----------|---------|----------|-------------|
| Flask Port | 5000 | backend/app.py | Backend API port |
| Vite Dev Port | 5173 | frontend/vite.config.js | Frontend dev server port |
| API Proxy | /api to localhost:5000 | frontend/vite.config.js | Dev proxy configuration |
| CORS Origins | localhost:5173, 5174, 5175, 3000 | backend/app.py | Allowed frontend origins |

---

## Contributing

1. **Fork** this repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a **Pull Request**

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Academic Context

This project was designed and implemented as a **Final Year Capstone Project** for the **Bachelor of Engineering (B.E.)** program, demonstrating the integration of machine learning systems with modern full-stack web technologies.

---

**Built with Python, React, and scikit-learn**
