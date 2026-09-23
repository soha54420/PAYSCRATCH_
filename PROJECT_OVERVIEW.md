# PAYSCRATCH Team Handoff & Project Overview

Welcome to the PAYSCRATCH project! This document is designed for new team members to quickly understand the internal workings of the project and how to get set up.

---

## 1. What is PAYSCRATCH?
PAYSCRATCH is a real-time, Machine Learning-powered transaction risk analysis application and fraud detection system. It consists of a React frontend UI and a Python/FastAPI backend that runs a predictive model.

## 2. What problem does it solve?
We are addressing the need for a transparent, deployable, and highly accurate fraud detection architecture. Instead of rigid rule-based systems (which produce many false alarms), we use Machine Learning to dynamically assess risk based on complex patterns and user velocity.

## 3. Why did we build it?
To bridge the gap between Data Science (where models sit in static Jupyter Notebooks) and Software Engineering (deploying models as real-time APIs). We wanted to demonstrate an end-to-end flow from a web interface to a live ML inference engine.

## 4. How does the fraud detection system work?
When a transaction is made, the system calculates features like the time of day, weekend status, and 7-day transaction averages. These are fed into the ML model which outputs a probability score (0.0 to 1.0) indicating how likely the transaction is to be fraudulent.

## 5. What is the role of ML?
Instead of hardcoding rules, the Machine Learning model learns the hidden, complex mathematical relationships between variables (like amount, time, and history) that distinguish legitimate transactions from fraudulent ones.

## 6. What is Random Forest?
It is a supervised learning ensemble method. It builds multiple "Decision Trees" (flowcharts of questions like "Is amount > 100?" -> "Is time = night?") and averages their results to produce a much more accurate and stable prediction.

## 7. Why was Random Forest selected in OUR project?
Random Forest performs exceptionally well on tabular (row/column) data. Unlike "black box" neural networks, Random Forests provide "Feature Importance," allowing us to understand exactly why a transaction was flagged—a strict requirement for financial compliance.

## 8. What does threshold = 0.15 mean?
By default, ML models classify something as "True" if the probability is > 0.50. Because financial fraud is extremely rare (highly imbalanced data), a 0.50 threshold would miss too many fraudulent transactions. We lowered the threshold to 0.15 to cast a wider net. This means we accept slightly more false alarms in order to successfully catch a much higher percentage of actual fraud.

## 9. High-Level ML Metrics Explained
*These metrics represent the model's evaluation performance, not live production accuracy.*
- **Precision:** When the system flags a transaction as fraud, how often is it actually fraud?
- **Recall:** Out of all the real fraud that occurred, what percentage did the system successfully catch?
- **F1 Score:** The harmonic mean of Precision and Recall, representing a balance between the two.
- **ROC-AUC:** Measures how well the model separates Safe vs Fraud. It can look artificially high because there are so many Safe transactions.
- **PR-AUC:** Precision-Recall Area Under Curve. This metric ignores the massive amount of Safe transactions and focuses strictly on the Fraud class, making it the most reliable metric for fraud detection.

## 10. What does FastAPI do?
FastAPI acts as our backend server. It receives a `POST /predict` request from the frontend containing raw data (Amount, Customer ID, Terminal ID). Before calling the ML model, FastAPI's "Feature Preparation" layer dynamically calculates the required time-based and velocity features. It then passes these 20 features to the model and returns the final verdict.

## 11. What does React do?
React provides the User Interface (Landing, Login, Dashboard, Transactions, Alerts, etc.). It captures the user's transaction input, sends it to the FastAPI backend, and visualizes the resulting prediction (SAFE or FRAUD) along with runtime risk signals (e.g., "Transaction occurred during nighttime").

## 12. What does Supabase do / what is its current status?
**Status: CURRENTLY IN PROGRESS**
Supabase serves as our PostgreSQL database. Once complete, it will store user accounts and transaction history, allowing the FastAPI backend to query real historical data to calculate velocity metrics (e.g., how many transactions a user made in the last 30 days).

## 13. How does a transaction move through the system?
1. **User** initiates a transaction on the **React frontend**.
2. Frontend sends a `POST /predict` request to the **FastAPI backend**.
3. Backend validates the request.
4. Backend dynamically engineers the 20 necessary features.
5. Features are passed to the **Random Forest model**.
6. The model outputs a **fraud probability**.
7. If probability >= **0.15 threshold**, it's flagged as FRAUD. Otherwise, SAFE.
8. The backend returns the status and runtime risk signals back to the frontend.

## 14. What is currently implemented?
- React Frontend (UI, Routing, API Integration)
- FastAPI Backend (API Endpoints, Feature Engineering layer)
- Machine Learning Inference (Random Forest serialization and threshold evaluation)

## 15. What is still in progress?
- Supabase database integration to replace the mocked historical velocity features with real data queries.

## 16. What are the current limitations?
- **Mocked Historical Data:** The customer and terminal historical features (velocity metrics like 1-day, 7-day, 30-day transaction counts) are currently hardcoded/mocked in the FastAPI layer. They do NOT represent real user behavior yet.
- **Model Training:** The model was trained on a simulated dataset (Fraud Detection Handbook) covering 2018 data, not live proprietary bank data.

---

# TEAM MEMBERS: HOW TO GET THE PROJECT

Follow these steps to safely clone and open the project on your local machine.

### Step 1 — Install Git
Ensure you have Git installed on your computer. You can verify this by opening your terminal (or Command Prompt) and typing:
`git --version`
If it returns a version number, you are good to go.

### Step 2 — Clone the repository
Use the terminal to clone the project from GitHub to your local machine:
```bash
git clone https://github.com/soha54420/PAYSCRATCH_.git
```

### Step 3 — Enter the project folder
Navigate into the newly cloned directory:
```bash
cd PAYSCRATCH_
```

### Step 4 — Open the project
Open the folder in your preferred code editor. For example, if you use VS Code:
```bash
code .
```

### Step 5 — Understand the project before running it
Before running any commands or modifying any files, please read the following documentation to understand how the system works:
1. `README.md`
2. `PROJECT_OVERVIEW.md` (this file)
3. `PRESENTATION_GUIDE.md`

### Step 6 — Environment variables (Security Warning)
**CRITICAL:** We never commit secrets, passwords, or API keys to GitHub. For security reasons, the `.env` files are intentionally ignored by Git.

If you are running the backend, you may need a `.env` file in the `backend/` directory.
- **Which variables are required:** (e.g., Supabase URL and Anon Key - *once integration is complete*).
- **Where to create it:** Create a new text file named `.env` inside the `backend` folder.
- **How to get the values:** Securely request the current environment variables from the project owner via Slack/Discord. 
- **DO NOT** commit your `.env` file to GitHub. The `.gitignore` is already set up to prevent this, but always be cautious.
