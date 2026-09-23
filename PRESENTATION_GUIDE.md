# PAYSCRATCH Presentation & Viva Guide

Use this document to quickly prepare for the team presentation and Q&A/viva sessions.

## 30-Second Project Explanation
"PAYSCRATCH is a real-time, end-to-end credit card fraud detection system. A user submits a transaction via a React frontend, which is sent to a Python FastAPI backend. The backend dynamically engineers features like time of day and transaction velocity, then runs them through a trained Random Forest model to instantly determine if the transaction is safe or fraudulent based on a customized threshold."

## 1-Minute Architecture Explanation
"Our architecture bridges data science and full-stack engineering. We capture raw inputs—like transaction amount and IDs—via our React UI. This data is sent as a JSON payload to our FastAPI backend. The backend acts as a feature engineering layer, calculating 20 complex features on the fly, such as whether the transaction occurred at night or how many transactions the user made recently. These 20 features are fed into a serialized Scikit-Learn Random Forest model. We evaluate the resulting probability against a 0.15 threshold and return the final safe/fraud verdict, along with readable risk signals, back to the frontend."

## Problem Statement
Credit card fraud costs billions annually. Traditional rule-based systems (e.g., "flag if amount > $500") are rigid, easily bypassed by fraudsters, and generate massive amounts of false positives.

## Why Fraud Detection is Difficult
Fraud is adversarial and constantly evolving. Unlike static classification problems, fraudsters actively try to trick the system. Additionally, the data is extremely imbalanced, meaning the vast majority of transactions are legitimate, making it hard for models to learn the minority "fraud" pattern without overfitting.

## Why Fraud Class Imbalance Matters
In our dataset, fraud represents only ~0.837% of transactions. If a model simply guessed "SAFE" every time, it would be 99.1% accurate, but entirely useless for detecting fraud. This imbalance forces us to use specialized metrics (like PR-AUC) and custom probability thresholds rather than standard accuracy.

## Why Random Forest was Selected as the Final Model
- **Performance on Tabular Data:** Ensembles of decision trees perform exceptionally well on structured, row/column financial data.
- **Interpretability:** Unlike deep neural networks ("black boxes"), Random Forests provide feature importance, allowing us to understand exactly which variables (e.g., transaction amount, time of day) drove the decision—a strict requirement in financial regulations.
- **Robustness:** By averaging multiple decision trees, the model is highly resistant to overfitting.

## Why Threshold 0.15 was Used
By default, ML models classify a prediction as True if the probability is > 0.50. Because fraud is so rare, a 0.50 threshold misses too many fraudulent transactions. By lowering the threshold to 0.15, we cast a wider net. We accept a slight increase in false alarms in exchange for catching significantly more actual fraud.

## Precision vs Recall
- **Precision:** When the model says a transaction is fraud, how often is it actually fraud? (Minimizing false alarms).
- **Recall:** Out of all the real fraud that happened, how much did the model successfully catch? (Minimizing missed fraud).
In fraud detection, catching the fraud (high Recall) is generally prioritized over avoiding false alarms.

## Why PR-AUC is Useful for Fraud Detection
ROC-AUC can look artificially high in highly imbalanced datasets because of the massive number of True Negatives (safe transactions). PR-AUC (Precision-Recall Area Under Curve) completely ignores True Negatives and focuses strictly on how well the model handles the minority Fraud class. It is the most reliable metric for this specific problem.

## What FastAPI Does
FastAPI is a modern, high-performance Python web framework. It acts as the bridge between the frontend and the Machine Learning model. It receives HTTP requests, engineers the required data features, invokes the model, and returns the HTTP response.

## What an API Endpoint Is
An API endpoint is a specific URL where an application can receive and process requests. In our project, it's the digital "doorway" where the frontend sends transaction data to the backend.

## What POST /predict Does
`POST /predict` is our specific FastAPI endpoint. It accepts a JSON payload containing `customer_id`, `terminal_id`, and `tx_amount`. It triggers the backend logic to prepare features, run the Random Forest prediction, and return the `SAFE` or `FRAUD` result.

## What Supabase Does
*Status: Integration Currently In Progress.*
Supabase is an open-source Firebase alternative based on PostgreSQL. In our final architecture, it will act as the persistent database ledger storing user accounts and historical transactions. This allows the backend to query real historical data to compute velocity metrics (like 7-day transaction averages).

## How the 20 Features are Used
The Random Forest model cannot make predictions based solely on the raw amount and IDs. It expects exactly 20 engineered mathematical columns. These include the original amount, dynamically calculated time features (like `TX_DURING_NIGHT`), and aggregated velocity metrics (like `CUSTOMER_ID_NB_TX_7DAY_WINDOW`). The backend calculates these 20 features and passes them to the model as an array.

## What Happens From Transaction Input to Final Prediction
1. **Input:** User submits amount, customer ID, and terminal ID on the React UI.
2. **Transmission:** React sends this data via a POST request to `/predict`.
3. **Engineering:** FastAPI takes the raw data and calculates the 20 necessary features (using current time and mocked historical data).
4. **Inference:** The 20 features are passed to the loaded Random Forest model.
5. **Evaluation:** The model outputs a probability. If it's >= 0.15, the transaction is marked FRAUD; otherwise, SAFE.
6. **Output:** The result, probability score, and readable risk signals are sent back to React and displayed to the user.

## What Current Limitations Are
- **Mocked Historical Data:** Because Supabase integration is currently in progress, historical velocity features (like 7-day averages) are mocked in the backend. They do not represent real user behavior yet.
- **Dataset Source:** The model was trained on the simulated Fraud Detection Handbook dataset, not proprietary live banking data.

## Likely Viva Questions and Short Accurate Answers

**Q: Why didn't you use Deep Learning/Neural Networks?**
A: Deep learning is often overkill for tabular data and acts as a "black box." Random Forests provide the interpretability required for financial regulatory compliance.

**Q: How do you handle class imbalance?**
A: We evaluate the model using PR-AUC instead of standard Accuracy, and we lowered the decision threshold to 0.15 to prioritize catching fraud (Recall).

**Q: Where is the model running?**
A: The pre-trained model is serialized using `joblib`. When the FastAPI server starts up, it loads the model into memory. Inference happens synchronously via the `/predict` endpoint.

**Q: If I only send the amount and IDs, how does the model get 20 features?**
A: The FastAPI backend acts as a feature engineering layer. It dynamically calculates time-based features using the server's current time and retrieves historical velocity metrics to build the full 20-feature array before passing it to the model.

**Q: Is your database integration complete?**
A: We have completed the ML pipeline and frontend integration. The Supabase database integration for persisting historical user data is currently in progress. For now, historical velocity features are mocked in the backend.
