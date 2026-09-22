import json
import joblib
import datetime
import pandas as pd
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# --- ML Model Loading ---
# Reliable path logic based on main.py's location
BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "ml_models" / "payscratch_random_forest.joblib"
CONFIG_PATH = BASE_DIR / "ml_models" / "payscratch_config.json"

try:
    payscratch_model = joblib.load(MODEL_PATH)
    with open(CONFIG_PATH, "r") as f:
        payscratch_config = json.load(f)
    print("🧠 ML Model and Config successfully loaded!")
    print("⚙️ Threshold loaded:", payscratch_config.get("threshold"))


except Exception as e:
    print("❌ Model load hone mein error aayi:", e)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Pydantic Data Model ---
# Frontend ab sirf raw transaction info bhejega, poori history nahi
class RawTransactionRequest(BaseModel):
    customer_id: int
    terminal_id: int
    tx_amount: float

@app.get("/")
def read_root():
    return {"message": "Hello from PAYSCRACTH Backend !"}

def prepare_features(req: RawTransactionRequest) -> pd.DataFrame:
    """
    Feature Preparation Layer:
    Converts raw frontend data into the 20 engineered features required by the Random Forest.
    """
    now = datetime.datetime.now()
    tx_hour = now.hour
    tx_day_of_week = now.weekday()
    tx_month = now.month
    tx_during_weekend = 1 if tx_day_of_week >= 5 else 0
    tx_during_night = 1 if tx_hour <= 6 else 0
    
    # --- ML SEMANTICS FIX ---
    # Training data used elapsed simulation days (0-183), NOT calendar day of year.
    # MVP approach: Use calendar day modulo 183 to stay within the model's trained range.
    tx_time_days = now.timetuple().tm_yday % 183
    # TX_TIME_SECONDS in training was total elapsed seconds since simulation start
    tx_time_seconds = tx_time_days * 86400 + tx_hour * 3600 + now.minute * 60 + now.second
    
    # --- MOCK HISTORY FEATURES ---
    # IMPORTANT: These are temporary placeholders! Real MVP will fetch this from DB.
    customer_id_nb_tx_1day = 1
    customer_avg_amount_1day = req.tx_amount
    customer_id_nb_tx_7day = 3
    customer_avg_amount_7day = req.tx_amount
    customer_id_nb_tx_30day = 10
    customer_avg_amount_30day = req.tx_amount
    
    terminal_nb_tx_1day = 5
    terminal_risk_1day = 0.0
    terminal_nb_tx_7day = 20
    terminal_risk_7day = 0.0
    terminal_nb_tx_30day = 100
    terminal_risk_30day = 0.0

    # 3. FINAL 20-FEATURE PREPARATION (Exactly as model expects, using exact names)
    feature_dict = {
        "TX_AMOUNT": req.tx_amount,
        "TX_TIME_SECONDS": tx_time_seconds,
        "TX_TIME_DAYS": tx_time_days,
        "TX_DURING_WEEKEND": tx_during_weekend,
        "TX_DURING_NIGHT": tx_during_night,
        "CUSTOMER_ID_NB_TX_1DAY_WINDOW": customer_id_nb_tx_1day,
        "CUSTOMER_ID_AVG_AMOUNT_1DAY_WINDOW": customer_avg_amount_1day,
        "CUSTOMER_ID_NB_TX_7DAY_WINDOW": customer_id_nb_tx_7day,
        "CUSTOMER_ID_AVG_AMOUNT_7DAY_WINDOW": customer_avg_amount_7day,
        "CUSTOMER_ID_NB_TX_30DAY_WINDOW": customer_id_nb_tx_30day,
        "CUSTOMER_ID_AVG_AMOUNT_30DAY_WINDOW": customer_avg_amount_30day,
        "TERMINAL_ID_NB_TX_1DAY_WINDOW": terminal_nb_tx_1day,
        "TERMINAL_ID_RISK_1DAY_WINDOW": terminal_risk_1day,
        "TERMINAL_ID_NB_TX_7DAY_WINDOW": terminal_nb_tx_7day,
        "TERMINAL_ID_RISK_7DAY_WINDOW": terminal_risk_7day,
        "TERMINAL_ID_NB_TX_30DAY_WINDOW": terminal_nb_tx_30day,
        "TERMINAL_ID_RISK_30DAY_WINDOW": terminal_risk_30day,
        "TX_HOUR": tx_hour,
        "TX_DAY_OF_WEEK": tx_day_of_week,
        "TX_MONTH": tx_month
    }
    
    # Return as DataFrame to avoid sklearn's missing feature-name warnings
    return pd.DataFrame([feature_dict])

@app.post("/predict")
def predict_transaction(req: RawTransactionRequest):
    # Data ko feature preparation layer se pass karna
    input_data = prepare_features(req)

    # Model se prediction lena
    probabilities = payscratch_model.predict_proba(input_data)[0]
    fraud_probability = float(probabilities[1])  # Class 1 (Fraud) ki probability
    
    # Config wale threshold se compare karna
    threshold = payscratch_config.get("threshold", 0.5)
    is_fraud = bool(fraud_probability >= threshold)
    
    # Extract real available signals
    signals = []
    
    amount = float(input_data.iloc[0]["TX_AMOUNT"])
    signals.append(f"Transaction amount: ${amount:.2f}")
    
    hour = int(input_data.iloc[0]["TX_HOUR"])
    signals.append(f"Transaction hour: {hour}:00")
    
    if int(input_data.iloc[0]["TX_DURING_NIGHT"]) == 1:
        signals.append("Transaction occurred during nighttime")
        
    if int(input_data.iloc[0]["TX_DURING_WEEKEND"]) == 1:
        signals.append("Transaction occurred during the weekend")
    
    status_label = "FRAUD" if is_fraud else "SAFE"
    
    # Frontend ko result return karna
    return {
        "status": status_label,
        "fraud_probability": fraud_probability,
        "is_fraud": is_fraud,
        "threshold_used": threshold,
        "signals": signals
    }


