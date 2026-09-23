# PAYSCRATCH

## Project Overview
PAYSCRATCH is a real-time, machine learning-powered transaction risk analysis application and fraud detection system. It provides an end-to-end architecture starting from a React frontend interface to a FastAPI backend that performs dynamic feature engineering, feeding into a pre-trained Random Forest model to instantly assess the risk of credit card transactions.

## Problem Statement
Credit card fraud continues to cost the global economy billions annually. Traditional rule-based systems are often too rigid, resulting in high false positive rates and missed fraudulent transactions. While advanced ML solutions exist, there is a gap in lightweight, full-stack, transparent architectures that can be easily understood and deployed without relying on proprietary black-box APIs.

## Why Fraud Detection is Needed
As digital transactions scale, so do the methods of fraudsters. Manual review is impossible at scale, and static thresholds fail to adapt to new patterns. Automated, intelligent fraud detection is strictly necessary to protect both merchants from chargebacks and customers from unauthorized transactions, all within milliseconds of the swipe.

## Proposed Solution
PAYSCRATCH solves this by implementing a supervised Machine Learning approach using a Random Forest classifier. Instead of relying on static rules, the system dynamically calculates time-based and velocity features from incoming transactions and evaluates them against an optimized probability threshold to accurately classify transactions as safe or fraudulent in real time.

## Main Features
- **Real-Time Fraud Detection:** Instantaneous transaction risk evaluation.
- **Dynamic Feature Engineering:** Converts basic transaction data into 20 complex model-ready features.
- **Optimized Recall:** Tuned decision threshold (0.15) to minimize missed frauds.
- **Live Risk Signals:** Surfaces readable runtime risk factors (e.g., nighttime indicators) to the end-user UI.
- **Full-Stack Integration:** Connects a modern React frontend directly to a Python ML backend.

## How the System Works
1. **User** initiates a transaction on the **React frontend**.
2. Frontend sends a `POST /predict` request to the **FastAPI backend**.
3. Backend validates the request.
4. Backend dynamically engineers the 20 necessary features based on time and velocity.
5. Features are passed to the **Random Forest model**.
6. The model outputs a **fraud probability**.
7. If probability >= **0.15 threshold**, it's flagged as FRAUD. Otherwise, SAFE.
8. The backend returns the status and runtime risk signals back to the frontend.

## Overall Architecture
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
1. **Dataset/Source:** Used the open-source Fraud Detection Handbook simulated dataset (covering 1.75 million transactions from 2018).
2. **Data Preprocessing & Feature Engineering:** Extracted time of day, weekend indicators, and aggregated customer/terminal transaction velocities over 1-day, 7-day, and 30-day windows.
3. **Model Comparison:** Compared standard approaches; Random Forest was selected for its robust performance on tabular data and interpretability (feature importance).
4. **Threshold Optimization:** The default 0.5 threshold was lowered to 0.15 to prioritize Recall, effectively casting a wider net to catch fraudulent activity in a highly imbalanced dataset (fraud rate ~0.837%).
5. **Inference:** The model is serialized via `joblib` and loaded into the FastAPI server for fast, synchronous predictions.

## Final Model Information
- **Final Selected Model:** Random Forest
- **Final Decision Threshold:** 0.15 (Probability >= 0.15 → FRAUD)
- **Final Evaluation Metrics (Evaluation only, not live production accuracy):**
  - Precision: ~89.45%
  - Recall: ~70.79%
  - F1 Score: ~79.04%
  - PR-AUC: ~0.7338
  - ROC-AUC: ~0.8905

## FastAPI Backend
The backend is built with **FastAPI**. The core entry point is `backend/main.py`. It exposes a `POST /predict` endpoint that receives raw transaction data. It engineers the 20 necessary features (like `TX_DURING_NIGHT`), passes them to the serialized model, applies the 0.15 threshold, and returns the classification along with human-readable runtime risk signals.

## React Frontend
The frontend is a React application featuring several pages: Landing, Login, Signup, Forgot Password, Dashboard, Transactions, Alerts, Analytics, and Settings. It allows users to simulate and submit transaction requests, directly interacting with the backend to display the prediction result, fraud probability, and relevant risk signals in real-time.

## Supabase / Database Status
**Status:** CURRENTLY IN PROGRESS
PAYSCRATCH is integrating Supabase (a PostgreSQL-based BaaS) to store user profiles and historical transaction ledgers. Currently, historical velocity features (like 7-day transaction averages) are mocked in the FastAPI layer. Once the integration is complete, the backend will query real historical data to compute these features dynamically.

## Risk Signals Explanation
The application surfaces basic runtime risk signals (e.g., "Transaction amount: $150.00", "Transaction occurred during nighttime", "Transaction occurred during the weekend"). These are observable runtime variables derived from the feature preparation layer, not deep causal explanations extracted from the ML model's internal trees.

## Current Project Status
- The React frontend UI and FastAPI ML inference API are fully implemented and connected. 
- Real-time predictions based on current transaction context (time, amount) are working. 
- Database integration for historical velocity metrics is currently in progress.

## Current Limitations
- **Mocked Historical Data:** Since Supabase integration is ongoing, historical velocity metrics are hardcoded/mocked in the backend. They do not represent real user behavior yet.
- **Dataset:** The model relies on a simulated dataset rather than live, proprietary banking data.

## Future Scope
1. Complete Supabase integration to replace mocked historical features with real database queries.
2. Final end-to-end testing with persisted user accounts.
3. Production hardening and deployment configuration.
4. Expand risk signals to utilize actual SHAP (SHapley Additive exPlanations) values for deeper model interpretability.

## Security Considerations
**CRITICAL:** Secrets belong in the `.env` file and must **never** be committed to version control. This includes API keys, database passwords, Supabase service-role keys, and any private credentials. The large `.joblib` model file is also intentionally excluded from version control to preserve repository size and security.

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
# Activate virtual environment:
# Windows: .venv\Scripts\activate
# Mac/Linux: source .venv/bin/activate
pip install -r requirements.txt # (or manually install fastapi, uvicorn, scikit-learn, pandas, joblib)
uvicorn main:app --reload
```

## Project Folder Structure
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

## Important Files and Their Purpose
- `backend/main.py`: The FastAPI application defining the API endpoints and feature engineering logic.
- `backend/ml_models/payscratch_config.json`: The configuration file storing the optimal 0.15 decision threshold.
- `src/App.tsx`: The main React application router linking all frontend pages.
- `PROJECT_OVERVIEW.md`: A detailed guide specifically designed for onboarding new team members.
- `PRESENTATION_GUIDE.md`: A structured guide for preparing the project's official PPT and viva Q&A.
