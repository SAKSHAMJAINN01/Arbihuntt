# ArbiHunt 🎯

ArbiHunt is a production-grade, full-stack crypto arbitrage tracker. It monitors real-time prices on **Binance** and **Kraken**, identifies price discrepancies (arbitrage opportunities), and displays them in a live dashboard.

---

## Tech Stack

*   **Frontend**: React.js, TypeScript, Vite
*   **Backend**: Node.js, Express.js, TypeScript
*   **Database**: MongoDB (with Mongoose)
*   **Architecture**: Monorepo (Client + Server), Polling-based Engine

---

## 🛠️ Prerequisites

Before running the project, ensure you have the following installed:

1.  **Node.js** (v16 or higher)
2.  **MongoDB** (Running locally on port `27017`)

---

## 📥 Installation Guide

1.  **Clone the Repository** (if applicable) or navigate to the project folder:
    ```bash
    cd arbihunt
    ```

2.  **Install Dependencies**:
    We have a convenient script to install dependencies for both the Client and Server at once.
    ```bash
    npm install concurrently --save-dev
    npm run install:all
    ```
    *(Alternatively, you can run `npm install` manually in both `server/` and `client/` directories.)*

3.  **Configure Environment Variables**:
    The project comes with `.env` files pre-configured for local development.
    *   **Server**: `server/.env` (Port 5001, MongoDB URI)
    *   **Client**: `client/.env` (API Proxy settings)

---

## ▶️ How to Run

Start the full application (Frontend + Backend) with a single command:

bash
npm run dev


*   **Frontend Dashboard**: Open [http://localhost:3000](http://localhost:3000)
*   **Backend Server**: Runs on [http://localhost:5001](http://localhost:5001)

---

## 🧩 Project Structure


arbihunt/
├── server/                  # Backend Logic
│   ├── src/services/        # Arbitrage Engine & Exchange APIs
│   ├── src/models/          # MongoDB Schema
│   └── src/controllers/     # API Endpoints
│
└── client/                  # Frontend UI
    ├── src/components/      # React Components
    └── src/hooks/           # Data Fetching Logic
```

## 🔍 How It Works

1.  **The Engine**: The server polls Binance and Kraken every 5 seconds.
2.  **The Logic**: It normalizes prices and checks if `SellPrice (Exchange B) > BuyPrice (Exchange A)`.
3.  **The Storage**: Profitable trades (>0.5% spread) are saved to MongoDB (auto-deleted after 24h).
4.  **The View**: The frontend polls the server and updates the table in real-time.
