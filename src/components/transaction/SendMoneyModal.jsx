import { useState } from 'react'
import Modal from '../ui/Modal'
import Input from '../ui/Input'
import Button from '../ui/Button'
import Icon from '../ui/Icon'
import { transactionApi } from '../../api'
import { validators } from '../../utils'
import styles from './SendMoneyModal.module.css'

const QUICK_AMOUNTS = [100, 500, 1000, 2000]

export default function SendMoneyModal({ user, onClose, onSuccess, addToast }) {
  const [form, setForm]     = useState({ receiverUpi: '', amount: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const validate = () => {
    const e = {
      receiverUpi: validators.required(form.receiverUpi, 'Receiver UPI ID'),
      amount:      validators.amount(form.amount),
    }
    const clean = Object.fromEntries(Object.entries(e).filter(([, v]) => v))
    setErrors(clean)
    return Object.keys(clean).length === 0
  }

  const submit = async () => {
    if (!validate()) return
    setLoading(true)
    try {
      const res = await transactionApi.send({
        senderUpi:   user.upiId,
        receiverUpi: form.receiverUpi,
        amount:      Number(form.amount),
      })
      if (res.success) {
        addToast(
          `₹${Number(form.amount).toLocaleString('en-IN')} sent to ${form.receiverUpi}!`,
          'success'
        )
        onSuccess()
        onClose()
      } else {
        addToast(res.message || 'Transfer failed', 'error')
      }
    } catch {
      addToast('Request failed. Check backend.', 'error')
    }
    setLoading(false)
  }

  return (
    <Modal title="Send Money" onClose={onClose} width={420}>
      {/* Sender info */}
      <div className={styles.senderChip}>
        <Icon name="wallet" size={15} color="var(--primary)" />
        <span>Sending from:</span>
        <strong>{user.upiId}</strong>
      </div>

      <Input
        label="Receiver UPI ID"
        name="receiverUpi"
        value={form.receiverUpi}
        onChange={set('receiverUpi')}
        placeholder="receiver@upi"
        error={errors.receiverUpi}
        hint="e.g. priya@okicici"
      />

      <Input
        label="Amount (₹)"
        name="amount"
        type="number"
        value={form.amount}
        onChange={set('amount')}
        placeholder="0.00"
        error={errors.amount}
      />

      {/* Quick picks */}
      <div className={styles.quickRow}>
        {QUICK_AMOUNTS.map((a) => (
          <button
            key={a}
            className={[styles.quickBtn, form.amount == a ? styles.quickActive : ''].join(' ')}
            onClick={() => { setForm((f) => ({ ...f, amount: String(a) })); setErrors((e) => ({ ...e, amount: '' })) }}
          >
            ₹{a}
          </button>
        ))}
      </div>

      <Button onClick={submit} loading={loading} style={{ marginTop: 20 }}>
        <Icon name="send" size={16} color="#fff" />
        Send Money
      </Button>
    </Modal>
  )
}
