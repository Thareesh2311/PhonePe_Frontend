// ── Currency ──────────────────────────────────────────────────
export const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  }).format(amount ?? 0)

// ── Date ──────────────────────────────────────────────────────
export const formatDate = (d) =>
  new Date(d).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

// ── Validation helpers ────────────────────────────────────────
export const validators = {
  required:    (v, label) => (!v?.trim() ? `${label} is required` : ''),
  phone:       (v) => (!/^[0-9]{10}$/.test(v) ? 'Must be exactly 10 digits' : ''),
  upiId:       (v) => (!/^[a-zA-Z0-9._-]+@[a-zA-Z]+$/.test(v) ? 'Format: name@bank (e.g. john@upi)' : ''),
  pin:         (v) => (!/^[0-9]{4,6}$/.test(v) ? 'PIN must be 4–6 digits' : ''),
  amount:      (v) => (!v || isNaN(v) || Number(v) < 1 ? 'Minimum amount is ₹1' : ''),
}
