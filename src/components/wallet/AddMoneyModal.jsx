import { useState } from 'react'
import Modal from '../ui/Modal'
import Input from '../ui/Input'
import Button from '../ui/Button'
import Icon from '../ui/Icon'
import { walletApi } from '../../api'
import { validators } from '../../utils'
import styles from './AddMoneyModal.module.css'

const QUICK_AMOUNTS = [500, 1000, 2000, 5000]

export default function AddMoneyModal({ user, onClose, onSuccess, addToast }) {
  const [amount, setAmount]   = useState('')
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    const err = validators.amount(amount)
    if (err) { setError(err); return }
    setError('')
    setLoading(true)
    try {
      const res = await walletApi.addMoney({ upiId: user.upiId, amount: Number(amount) })
      if (res.success) {
        addToast(`₹${Number(amount).toLocaleString('en-IN')} added to wallet!`, 'success')
        onSuccess()
        onClose()
      } else {
        addToast(res.message || 'Failed to add money', 'error')
      }
    } catch {
      addToast('Request failed. Check backend.', 'error')
    }
    setLoading(false)
  }

  return (
    <Modal title="Add Money" onClose={onClose} width={380}>
      {/* Quick pick */}
      <div className={styles.quickGrid}>
        {QUICK_AMOUNTS.map((a) => (
          <button
            key={a}
            className={[styles.quickBtn, amount == a ? styles.quickActive : ''].join(' ')}
            onClick={() => { setAmount(String(a)); setError('') }}
          >
            ₹{a.toLocaleString('en-IN')}
          </button>
        ))}
      </div>

      <Input
        label="Or enter custom amount"
        name="amount"
        type="number"
        value={amount}
        onChange={(e) => { setAmount(e.target.value); setError('') }}
        placeholder="₹ 0.00"
        error={error}
      />

      <Button onClick={submit} loading={loading} variant="success">
        <Icon name="plus" size={17} color="#fff" />
        Add to Wallet
      </Button>
    </Modal>
  )
}
