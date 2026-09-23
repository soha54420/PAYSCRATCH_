# PAYSCRATCH

## Project Overview
PAYSCRATCH is a machine learning-powered transaction risk analysis application and fraud detection system. It provides an end-to-end flow from a React frontend interface to a FastAPI backend that performs real-time feature engineering, feeding into a pre-trained Random Forest model to instantly assess the risk of credit card transactions.

## Problem Statement
Credit card fraud continues to cost the global economy billions annually. Traditional rule-based systems are often too rigid, resulting in high false positive rates and missed fraudulent transactions. While advanced ML solutions exist, there is a gap in lightweight, full-stack, and transparent architectures that can be easily understood and deployed by mid-sized merchants.

## Proposed Solution
PAYSCRATCH solves this by implementing a supervised Machine Learning approach using a Random Forest classifier. Instead of relying on static rules, the system dynamically calculates time-based and velocity features from incoming transactions and evaluates them against an optimized probability threshold to accurately classify transactions as safe or fraudulent in real time.

## Key Features
- **Real-Time Fraud Detection:** Instantaneous transaction risk evaluation.
- **Dynamic Feature Engineering:** Converts basic transaction data into 20 complex model-ready features.
- **Optimized Recall:** Tuned decision threshold (0.15) to minimize missed frauds.
- **Live Risk Signals:** Surfaces readable risk factors to the end-user UI.
- **Full-Stack Integration:** Connects a modern React frontend directly to a Python ML backend.

## System Architecture

```text
User Input (Amount, IDs)
       │
       ▼
 [ React Frontend ] ──(Displays Result & Signals)
       │
       │ POST /predict
       ▼
 [ FastAPI Backend ]
       │
       ├─► 1. Request Validation (Pydantic)
       │
       ├─► 2. Feature Preparation (Time/Velocity engineering)
       │      (Note: Historical data currently mocked, Supabase integration in progress)
       │
       ├─► 3. Inference Engine (Random Forest Model)
       │
       └─► 4. Threshold Evaluation (>= 0.15 → FRAUD)
```

## Technology Stack
- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Backend:** Python, FastAPI, Uvicorn
- **Machine Learning:** Scikit-Learn (Random Forest), Pandas, Joblib
- **Database:** Supabase / PostgreSQL (Integration currently in progress)

## ML Pipeline
1. **Dataset:** Used the Fraud Detection Handbook simulated dataset.
2. **Preprocessing & Features:** Extracted time of day, weekend indicators, and customer/terminal transaction velocities (1-day, 7-day, 30-day windows).
3. **Model Selection:** Random Forest was selected for its robust performance on tabular data and interpretability.
4. **Threshold Optimization:** The default 0.5 threshold was lowered to 0.15 to prioritize Recall, effectively casting a wider net to catch fraudulent activity in a highly imbalanced dataset.
5. **Inference:** The model is serialized via `joblib` and loaded into the FastAPI server for fast, synchronous predictions.

## Final Model Information
- **Model:** Random Forest
- **Decision Threshold:** 0.15 (Probability >= 0.15 → FRAUD)
- **Validation Metrics (Evaluation only, not live production accuracy):**
  - Precision: ~89.45%
  - Recall: ~70.79%
  - F1 Score: ~79.04%
  - PR-AUC: ~0.7338
  - ROC-AUC: ~0.8905

## Backend Explanation
The backend is built with **FastAPI**. The core entry point is `backend/main.py`. It exposes a `POST /predict` endpoint that receives raw transaction data. The backend first engineers 20 necessary features (like `TX_DURING_NIGHT`), passes them to the serialized Random Forest model, applies the 0.15 threshold, and returns the classification along with human-readable runtime risk signals.

## Frontend Explanation
The frontend is a React application featuring several pages: Landing, Login, Signup, Forgot Password, Dashboard, Transactions, Alerts, Analytics, and Settings. It allows users to simulate and submit transaction requests, directly interacting with the backend to display the prediction result, fraud probability, and relevant risk signals in real-time.

## Database Section
**Status:** CURRENTLY IN PROGRESS
PAYSCRATCH is integrating Supabase (a PostgreSQL-based BaaS) to store users and transaction ledgers. Currently, historical velocity features (like 7-day transaction averages) are mocked in the FastAPI layer. Once the Supabase integration is complete, the backend will query real historical data to compute these features.

## Local Setup Instructions
**Prerequisites:** Node.js, Python 3.9+

**Frontend:**
```bash
npm install
npm run dev
```

**Backend:**
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Or .venv\Scripts\activate on Windows
pip install -r requirements.txt # If available, otherwise install fastapi, uvicorn, scikit-learn, pandas, joblib
uvicorn main:app --reload
```

## Project Structure
```text
PAYSCRATCH/
├── backend/
│   ├── ml_models/
│   │   ├── payscratch_config.json
│   │   └── payscratch_random_forest.joblib (Excluded from Git)
│   ├── main.py
│   └── .env (Excluded from Git)
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.tsx
│   └── index.css
├── package.json
└── README.md
```

## Security Notes
**CRITICAL:** Secrets belong in the `.env` file and must **never** be committed to version control. This includes API keys, database passwords, Supabase service-role keys, and any private credentials.

## Current Project Status
The frontend UI and backend ML inference API are fully implemented and connected. Real-time predictions based on current transaction context (time, amount) are working. Database integration for historical velocity metrics is currently in progress.

## Future / Remaining Work
1. Complete Supabase integration to replace mocked historical features with real database queries.
2. Final end-to-end testing with persisted user accounts.
3. Production hardening and deployment configuration.
