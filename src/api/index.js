// All API calls to the Spring Boot backend (http://localhost:8080)
// Vite proxies /api → http://localhost:8080/api in dev mode

const BASE = '/api'

async function request(method, path, body) {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
  }
  if (body) options.body = JSON.stringify(body)

  const res = await fetch(`${BASE}${path}`, options)
  if (!res.ok && res.status !== 400 && res.status !== 401 && res.status !== 404) {
    throw new Error(`HTTP ${res.status}`)
  }
  return res.json()
}

// ── User ──────────────────────────────────────────────────────
export const userApi = {
  register: (data) => request('POST', '/users/register', data),
  login:    (data) => request('POST', '/users/login', data),
  profile:  (upiId) => request('GET', `/users/profile/${upiId}`),
}

// ── Wallet ────────────────────────────────────────────────────
export const walletApi = {
  getBalance: (upiId)  => request('GET', `/wallet/${upiId}`),
  addMoney:   (data)   => request('POST', '/wallet/add', data),
}

// ── Transactions ──────────────────────────────────────────────
export const transactionApi = {
  send:    (data)   => request('POST', '/transaction/send', data),
  history: (upiId)  => request('GET', `/transaction/history/${upiId}`),
}
