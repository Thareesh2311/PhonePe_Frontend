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
│   └── index.js              
├── components/
│   ├── auth/
│   │   ├── LoginForm.jsx     
│   │   └── RegisterForm.jsx  
│   ├── layout/
│   │   └── Header.jsx        
│   ├── transaction/
│   │   ├── SendMoneyModal.jsx 
│   │   ├── TransactionList.jsx# 
│   │   └── TransactionRow.jsx 
│   ├── ui/
│   │   ├── Button.jsx       
│   │   ├── Icon.jsx         
│   │   ├── Input.jsx        
│   │   ├── Modal.jsx         
│   │   ├── Spinner.jsx     
│   │   └── Toast.jsx      
│   └── wallet/
│       ├── AddMoneyModal.jsx  
│       ├── BalanceCard.jsx    
│       └── QuickActions.jsx  
├── hooks/
│   ├── useToast.js        
│   └── useWallet.js        
├── pages/
│   ├── AuthPage.jsx          
│   └── DashboardPage.jsx    
├── styles/
│   └── global.css            
├── utils.js            
├── App.jsx            
└── main.jsx         
```

