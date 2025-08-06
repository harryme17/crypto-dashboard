# 🪙 Crypto AI Dashboard (Local Version)

<img width="1897" height="857" alt="image" src="https://github.com/user-attachments/assets/bb0df26d-0717-4473-98dd-76370205dfa2" />


A modern, responsive web application for tracking cryptocurrency prices, managing a personal portfolio, and receiving AI-driven market insights. This project is designed to be run locally on your machine and uses React, Firebase, and Tailwind CSS.

---

## ✨ Key Features

*   **Live Cryptocurrency Data:** Fetches and displays real-time prices for the top 100 cryptocurrencies from the CoinGecko API.
*   **Real-time Search:** Instantly filter and search for any cryptocurrency by name or symbol.
*   **Interactive Price Charts:** Click on any currency to view a dynamic, interactive price chart with historical data (1D, 7D, 30D, 1Y) powered by Recharts.
*   **Secure User Authentication:** Full email/password sign-up and login functionality handled by Firebase Authentication.
*   **Portfolio Management:**
    *   Authenticated users can add coins they own to a personal portfolio.
    *   Portfolio data is securely stored and retrieved from your private Firestore database.
*   **Email Reports:** Users can have a snapshot of their dashboard sent to their email using Formspree (requires local configuration).
*   **Secure Configuration:** All API keys and secrets are handled via a local environment file (`.env`) and are never written directly in the code.

---

## 🛠️ Tech Stack & Services

*   **Frontend:**
    *   [**React**](https://reactjs.org/) (UI Library)
    *   [**Tailwind CSS**](https://tailwindcss.com/) (Styling via CDN)
    *   [**Recharts**](https://recharts.org/) (Chart Library)
    *   [**Axios**](https://axios-http.com/) (API Requests)
    *   [**React Router**](https://reactrouter.com/) (Client-side Routing)
    *   [**React Hot Toast**](https://react-hot-toast.com/) (Notifications)
*   **Backend & Database:**
    *   [**Firebase Authentication**](https://firebase.google.com/docs/auth) (User Management)
    *   [**Firestore Database**](https://firebase.google.com/docs/firestore) (Portfolio Storage)
*   **APIs & Services:**
    *   [**CoinGecko API**](https://www.coingecko.com/en/api) (Cryptocurrency Data)
    *   [**Formspree**](https://formspree.io/) (Email Form Handling)

---

## 🚀 How to Run This Project Locally

Follow these instructions to get the project up and running on your computer.

### Prerequisites

*   [Node.js](https://nodejs.org/en/) (v16 or later recommended)
*   [npm](https://www.npmjs.com/) (comes with Node.js)
*   A free [Firebase](https://firebase.google.com/) project
*   A free [Formspree](https://formspree.io/) account and form

### Installation & Setup Guide

1.  **Get the code:**
    If you have cloned the repository, navigate into the project folder.
    ```bash
    cd crypto-dashboard
    ```

2.  **Install dependencies:**
    This command reads the `package.json` file and installs all the necessary libraries.
    ```bash
    npm install
    ```

3.  **Set up your secret keys:**
    This project uses an environment file (`.env`) to keep secret keys separate from the code, which is a critical best practice.
    
    First, copy the example template to create your own local secrets file:
    ```bash
    cp .env.example .env
    ```
    Now, open the newly created `.env` file and fill in your unique keys.

    *   **Get Firebase Keys:** Go to your Firebase project -> Project Settings (⚙️) -> General tab -> Your apps -> SDK setup and configuration. Select "Config" and copy the values.
    *   **Get Formspree ID:** Go to your Formspree dashboard -> Select your form. The ID is the 8-character string in the endpoint URL (e.g., `mqkrvypb`).

4.  **Authorize Formspree for Local Use (Important!):**
    For the email feature to work on your machine, you must tell Formspree to trust `localhost`.
    *   Go to your Formspree form's **Settings** tab.
    *   Scroll down to **Domains**.
    *   Add `http://localhost:3000` and save.

5.  **Run the application:**
    ```bash
    npm start
    ```
    The app will automatically open in your browser at [http://localhost:3000](http://localhost:3000).

---

## ⚙️ Environment Variables

To run this project, you must create a `.env` file in the project root with the following variables:

# Firebase Keys

REACT_APP_FIREBASE_API_KEY=  
REACT_APP_FIREBASE_AUTH_DOMAIN=  
REACT_APP_FIREBASE_PROJECT_ID=  
REACT_APP_FIREBASE_STORAGE_BUCKET=  
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=  
REACT_APP_FIREBASE_APP_ID=

# Formspree Key

REACT_APP_FORMSPREE_ID=

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for details.
