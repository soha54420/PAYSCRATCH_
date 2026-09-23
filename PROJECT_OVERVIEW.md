# PAYSCRATCH Team Handoff & Project Overview

This document is specifically designed for team members to quickly understand the internal workings of the PAYSCRATCH project.

## What is PAYSCRATCH?
PAYSCRATCH is a real-time, Machine Learning-powered transaction risk analysis application and fraud detection system. It consists of a React frontend and a Python/FastAPI backend that runs a predictive model.

## What problem are we solving?
We are addressing the need for a transparent, deployable, and highly accurate fraud detection architecture. Instead of rigid rule-based systems (which produce many false alarms), we use Machine Learning to dynamically assess risk based on complex patterns and user velocity.

## What does the ML model do?
The Random Forest model takes in 20 specific mathematical features (like the time of day, weekend status, and 7-day transaction averages) and outputs a probability score (0.0 to 1.0) indicating how likely a transaction is to be fraudulent.

## What does FastAPI do?
FastAPI acts as the backend server. It receives a simple `POST /predict` request from the frontend containing raw data (Amount, Customer ID, Terminal ID). Before calling the ML model, FastAPI's "Feature Preparation" layer calculates the required time-based and velocity features dynamically. It then passes these 20 features to the model and returns the final verdict.

## What does React do?
React provides the User Interface. It contains pages like the Dashboard, Transactions, and Alerts. It captures the user's transaction input, sends it to the FastAPI backend, and visualizes the resulting prediction (SAFE or FRAUD) along with runtime risk signals (e.g., "Transaction occurred during nighttime").

## What does Supabase do?
Supabase serves as our PostgreSQL database. 
*Note: Supabase integration is CURRENTLY IN PROGRESS.*
Once complete, it will store user accounts and transaction history, allowing the FastAPI backend to query real historical data to calculate velocity metrics (e.g., how many transactions a user made in the last 30 days).

## What is the prediction flow?
1. **User** initiates a transaction on the **React frontend**.
2. Frontend sends a `POST /predict` request to the **FastAPI backend**.
3. Backend validates the request.
4. Backend dynamically engineers the 20 necessary features.
5. Features are passed to the **Random Forest model**.
6. The model outputs a **fraud probability**.
7. If probability >= **0.15 threshold**, it's flagged as FRAUD. Otherwise, SAFE.
8. The backend returns the status and runtime risk signals back to the frontend.

## What is the 0.15 threshold?
By default, ML models classify something as "True" if the probability is > 0.50. Because financial fraud is extremely rare (highly imbalanced data), a 0.50 threshold would miss too many fraudulent transactions. We lowered the threshold to 0.15 to cast a wider net. This means we accept slightly more false alarms in order to successfully catch a much higher percentage of actual fraud.

## High-Level ML Metrics Explained
*These metrics represent the model's evaluation performance, not live production accuracy.*
- **Precision (89.45%):** When the system flags a transaction as fraud, how often is it actually fraud?
- **Recall (70.79%):** Out of all the real fraud that occurred, what percentage did the system successfully catch?
- **F1 Score (79.04%):** The harmonic mean of Precision and Recall, representing a balance between the two.
- **ROC-AUC (0.8905):** Measures how well the model separates Safe vs Fraud. However, it can look artificially high because there are so many Safe transactions.
- **PR-AUC (0.7338):** Precision-Recall Area Under Curve. This metric ignores the massive amount of Safe transactions and focuses strictly on the Fraud class, making it the most reliable metric for fraud detection.

## What are the important project limitations?
- **Mocked Historical Data:** Currently, the customer and terminal historical features (velocity metrics like 1-day, 7-day, 30-day transaction counts) are mocked/hardcoded in the FastAPI layer. They do NOT represent real user behavior yet. The ongoing Supabase integration will fix this.
- **Model Training:** The model was trained on a simulated dataset (Fraud Detection Handbook) covering 2018 data, not live proprietary bank data.

## What should a team member understand before presenting?
- Know that the system is an end-to-end template demonstrating how to operationalize an ML model, rather than a production-ready enterprise banking system.
- Be clear about what is implemented (Frontend, FastAPI, live feature engineering for time-based features, Random Forest inference) versus what is in progress (Supabase database integration for historical velocity features).
- Understand the "Why": We used Random Forest for interpretability and lowered the threshold to 0.15 to prioritize Recall over Precision in a highly imbalanced dataset.
