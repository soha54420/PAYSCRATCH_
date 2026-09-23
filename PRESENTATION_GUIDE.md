# PAYSCRATCH Presentation Guide

Our official PPT structure is EXACTLY:

## 1. Overview
- **Project Name:** PAYSCRATCH
- **Type:** Real-time Machine Learning-powered transaction risk analysis application and fraud detection system.
- **Core Concept:** Utilizes a custom-trained Random Forest machine learning model to instantly analyze transaction requests and flag fraudulent activity.
- **Target Outcome:** Provide an end-to-end architecture (React Frontend to FastAPI Backend) demonstrating how to operationalize an ML model for real-time inference.

## 2. Introduction
- **The Problem:** Credit card fraud costs the global economy billions annually, necessitating robust, automated detection systems.
- **Beyond Rule-Based Systems:** Traditional static rules (e.g., "flag if amount > $500") are easily bypassed by sophisticated fraudsters and result in high false positive rates.
- **The PAYSCRATCH Approach:** Implements supervised machine learning to dynamically assess risk based on transaction interaction patterns, velocity metrics, and time-based features in real time.

## 3. Motivation
- **Real-Time Requirement:** Fraud detection is only useful if it happens in milliseconds before a transaction is authorized.
- **Need for Interpretability:** Financial systems require models where decisions can be traced and explained (hence, Random Forest over deep black-box neural networks).
- **Bridging Data Science and Engineering:** Many fraud detection projects remain as static Jupyter notebooks. PAYSCRATCH wraps a predictive model in a fully functional web application.

## 4. Literature Survey
- **Traditional Rule-Based Systems:** Rely on static if-then rules.
  - *Approach:* Expert systems manually encode fraud patterns.
  - *Drawback:* High false positive rates; unable to adapt to novel fraud typologies without manual intervention.
- **Unsupervised Anomaly Detection:** 
  - *Approach:* Algorithms like Isolation Forest or K-Means clustering identify outliers in transaction data without labeled examples.
  - *Drawback:* Often yields lower accuracy on known fraud patterns compared to supervised methods.
- **Supervised Machine Learning Ensembles:**
  - *Research:* Bhattacharyya et al. (2011) demonstrated that Random Forests and Support Vector Machines outperform standard logistic regression in credit card fraud detection.
  - *Research:* Dal Pozzolo et al. (2015) highlighted the necessity of specialized calibration and thresholding when dealing with extreme class imbalance (e.g., fraud rates < 1%).
- **What PAYSCRATCH Implements:** While academic papers often focus on offline batch prediction, PAYSCRATCH implements an end-to-end operationalized pipeline. We use a supervised Random Forest classifier, but we distinguish our project by engineering 20 complex temporal and velocity features dynamically within a FastAPI real-time layer.

## 5. Research Gap
- **The Gap:** While large financial institutions possess proprietary, robust ML infrastructures, there is a lack of transparent, end-to-end open-source templates that demonstrate both real-time web request handling and complex ML feature engineering for mid-sized applications.
- **Evidence-Based Context:** Most open-source educational resources on fraud detection provide only offline analysis (Jupyter notebooks) on static datasets like Kaggle's credit card dataset. They do not demonstrate how to serve the model as an API or how to compute temporal features (like "transactions in the last 7 days") on live incoming requests.
- **The Solution:** PAYSCRATCH fills this gap by providing a full-stack architectural template demonstrating real-time inference, featuring an optimized classification threshold (0.15) tailored specifically for highly imbalanced financial data.

## 6. Objective
- **Primary:** Build an end-to-end web application capable of classifying credit card transactions as fraudulent or legitimate in real-time.
- **Technical:** Implement a live feature-engineering pipeline in FastAPI that translates raw frontend inputs into the exact 20-feature format required by the predictive model.
- **Operational:** Deploy a calibrated Random Forest model optimized for high Recall (using a customized 0.15 threshold) to minimize missed fraudulent transactions.

## 7. Design – System Architecture
- **Frontend Layer (React/TypeScript):** Captures raw transaction data (Customer ID, Terminal ID, Amount) and displays real-time prediction feedback and risk signals.
- **Backend API (FastAPI):** Receives the raw request, calculates real-time time-based features (e.g., night-time, weekend flags). *(Note: Historical velocity features are currently mocked).*
- **Inference Engine (Scikit-Learn/Joblib):** The prepared 20-feature array is passed to the pre-trained Random Forest model, outputting a fraud probability score.
- **Thresholding:** Evaluates Probability against a 0.15 threshold.
- **Database Layer (Supabase):** *(Status: Currently in progress)* Intended to act as the PostgreSQL ledger to persist historical transaction states, replacing the mocked historical data.

*Flow Diagram:*
React Frontend → FastAPI Backend → Feature Preparation → Random Forest Model → Fraud Probability → Threshold = 0.15 → SAFE / FRAUD → Frontend Result

## 8. Tech Stack
- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Backend:** Python, FastAPI, Uvicorn
- **Machine Learning:** Scikit-Learn, Pandas, Joblib (Random Forest Classifier)
- **Database / Backend-as-a-Service:** Supabase (PostgreSQL) - *Integration in progress*

## 9. References
1. Le Borgne, Y.-A., Siblini, O., Lebichot, B., & Bontempi, G. (2022). *Reproducible Machine Learning for Credit Card Fraud Detection - Practical Handbook*. Université Libre de Bruxelles.
2. Bhattacharyya, S., Jha, S., Tharakunnel, K., & Westland, J. C. (2011). *Data mining for credit card fraud: A comparative study*. Decision Support Systems, 50(3), 602-613.
3. Dal Pozzolo, A., Caelen, O., Johnson, R. A., & Bontempi, G. (2015). *Calibrating Probability with Undersampling for Unbalanced Classification*. 2015 IEEE Symposium Series on Computational Intelligence.
4. FastAPI Documentation: https://fastapi.tiangolo.com/
5. Supabase Documentation: https://supabase.com/docs
6. Scikit-learn Documentation: https://scikit-learn.org/

## 10. Conclusion
- PAYSCRATCH successfully demonstrates a deployable architecture for real-time credit card fraud detection.
- By combining a modern web stack (React, FastAPI) with a calibrated Random Forest model (optimized at a 0.15 threshold), the system effectively balances the trade-off between catching fraud and minimizing false positives.
- Future scope includes completing the Supabase integration to replace mocked historical velocity features with live database queries.

---

# Team Presentation Quick Prep

Use this section to prepare for the presentation and Q&A.

### 30-second explanation
"PAYSCRATCH is a real-time credit card fraud detection system. A user submits a transaction via a React frontend, which is sent to a Python FastAPI backend. The backend dynamically engineers features like time of day and transaction velocity, then runs them through a trained Random Forest model to instantly determine if the transaction is safe or fraudulent based on a 0.15 threshold."

### 1-minute explanation
"Our architecture bridges data science and full-stack engineering. We capture raw inputs—like transaction amount and IDs—via our React UI. This data is sent as a JSON payload to our FastAPI backend. The backend acts as a feature engineering layer, calculating 20 complex features on the fly, such as whether the transaction occurred at night or how many transactions the user made recently. These 20 features are fed into a serialized Scikit-Learn Random Forest model. We evaluate the resulting probability against a 0.15 threshold and return the final safe/fraud verdict, along with readable risk signals, back to the frontend."

### Architecture explanation
1. **React UI:** User inputs transaction details.
2. **FastAPI Backend:** Receives raw JSON payload via `POST /predict`.
3. **Feature Engineering Layer:** Calculates `TX_TIME_SECONDS`, `TX_DURING_NIGHT`, and aggregates historical data (currently mocked).
4. **Model Inference:** Passes the 20 features to the `joblib` Random Forest model.
5. **Thresholding:** Evaluates `fraud_probability >= 0.15`.
6. **Response:** Returns JSON with `status`, `probability`, and `signals` back to the UI.

### ML explanation
- **Dataset:** Fraud Detection Handbook (1.75M transactions, ~0.83% fraud).
- **Preprocessing:** Transactions grouped by user/terminal to calculate velocity windows (1, 7, 30 days).
- **Model:** Random Forest classifier trained on 1.4M transactions.
- **Threshold:** Custom 0.15 threshold applied to the prediction probability.
- **Inference:** Fast, synchronous prediction returning a safe/fraud status.

### Why Random Forest?
- **Tabular Data:** Ensembles of decision trees perform exceptionally well on structured, row/column financial data compared to neural networks.
- **Interpretability:** Provides feature importance, allowing us to understand which variables drove the decision—a strict requirement in financial applications.
- **Robustness:** Averages multiple decision trees to resist overfitting.

### Why threshold = 0.15?
Financial fraud is highly imbalanced (~0.83% of transactions). At a default 0.50 threshold, the model might miss a lot of fraud (poor Recall). By analyzing our evaluation metrics, lowering the threshold to 0.15 casts a wider net—we accept slightly more false alarms in exchange for catching much more actual fraud.

### Precision vs Recall
- **Precision:** When the system says "FRAUD," how often is it actually fraud? (Focuses on minimizing false alarms).
- **Recall:** Out of all the real fraud that happened, how much did the system successfully catch? (Focuses on minimizing missed fraud). In banking, Recall is heavily prioritized.

### PR-AUC vs ROC-AUC
- **ROC-AUC** can look artificially high in imbalanced datasets because of the massive number of True Negatives (safe transactions).
- **PR-AUC (Precision-Recall Area Under Curve)** ignores True Negatives and focuses entirely on the minority class (Fraud). It is the strictly better metric for evaluating our model.

### Current limitations
- **Mocked Historical Data:** Because Supabase database integration is currently in progress, historical velocity features (like 7-day average transaction amounts) are hardcoded/mocked in the FastAPI backend. They do not represent real user behavior yet.
- **Dataset Source:** The model relies on a simulated dataset rather than live proprietary banking data.

### Likely viva questions
- **Q: Why didn't you use Deep Learning/Neural Networks?**
  - *A:* Deep learning is often overkill for tabular data and acts as a "black box." Random Forests provide better interpretability which is required for regulatory compliance in finance.
- **Q: How do you handle the class imbalance in your dataset?**
  - *A:* We evaluate the model using PR-AUC instead of Accuracy, and we specifically adjusted the decision threshold down to 0.15 to prioritize Recall over Precision.
- **Q: Where does the model run?**
  - *A:* The model is serialized using `joblib` and loaded directly into the FastAPI application memory upon server startup. Inference happens synchronously via the `/predict` endpoint.
- **Q: If I only send the amount and IDs, how does the model get 20 features?**
  - *A:* The FastAPI backend acts as a feature engineering layer. It dynamically calculates time-based features based on the current server time and adds velocity metrics to build the full 20-feature array before passing it to the model.
- **Q: Is your database integration complete?**
  - *A:* We have completed the ML pipeline and frontend integration. The Supabase integration for persisting historical user data is currently in progress. For now, historical velocity features are mocked in the backend.
