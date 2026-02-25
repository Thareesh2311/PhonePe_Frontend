# PhonePe Wallet — React Frontend

A production-grade React frontend for the PhonePe Wallet Spring Boot backend.

## Prerequisites

- Node.js 18+
- Spring Boot backend running on `http://localhost:8080`

## Setup & Run

```bash
# 1. Install dependencies
npm install

# 2. Start development server (proxies /api → localhost:8080)
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Project Structure

```
src/
├── api/
│   └── index.js              # All backend API calls
├── components/
│   ├── auth/
│   │   ├── LoginForm.jsx     # Login form
│   │   └── RegisterForm.jsx  # Registration form
│   ├── layout/
│   │   └── Header.jsx        # Top navigation bar
│   ├── transaction/
│   │   ├── SendMoneyModal.jsx # Send money dialog
│   │   ├── TransactionList.jsx# Tx history with tabs
│   │   └── TransactionRow.jsx # Single tx row
│   ├── ui/
│   │   ├── Button.jsx        # Reusable button
│   │   ├── Icon.jsx          # SVG icon set
│   │   ├── Input.jsx         # Form input with label/error
│   │   ├── Modal.jsx         # Modal wrapper
│   │   ├── Spinner.jsx       # Loading spinner
│   │   └── Toast.jsx         # Toast notifications
│   └── wallet/
│       ├── AddMoneyModal.jsx  # Add money dialog
│       ├── BalanceCard.jsx    # Wallet balance card
│       └── QuickActions.jsx   # Send/Add action tiles
├── hooks/
│   ├── useToast.js           # Toast state manager
│   └── useWallet.js          # Wallet + tx data fetching
├── pages/
│   ├── AuthPage.jsx          # Login / Register page
│   └── DashboardPage.jsx     # Main dashboard
├── styles/
│   └── global.css            # CSS variables + resets
├── utils.js                  # Formatters & validators
├── App.jsx                   # Root component
└── main.jsx                  # Entry point
```

## API Endpoints Used

| Component         | Method | Endpoint                          |
|-------------------|--------|-----------------------------------|
| LoginForm         | POST   | `/api/users/login`                |
| RegisterForm      | POST   | `/api/users/register`             |
| BalanceCard       | GET    | `/api/wallet/{upiId}`             |
| AddMoneyModal     | POST   | `/api/wallet/add`                 |
| SendMoneyModal    | POST   | `/api/transaction/send`           |
| TransactionList   | GET    | `/api/transaction/history/{upiId}`|

## Tech Stack

- **React 18** with hooks
- **Vite** (dev server + proxy)
- **CSS Modules** (scoped styling, no extra libraries)
- **DM Sans** + **Syne** fonts (Google Fonts)
