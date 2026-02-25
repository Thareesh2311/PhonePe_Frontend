import { useState } from 'react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { userApi } from '../../api'
import { validators } from '../../utils'
import styles from './AuthForms.module.css'

export default function LoginForm({ onSuccess, addToast }) {
  const [form, setForm]     = useState({ phoneNumber: '', pin: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const validate = () => {
    const e = {
      phoneNumber: validators.phone(form.phoneNumber),
      pin:         validators.pin(form.pin),
    }
    const clean = Object.fromEntries(Object.entries(e).filter(([, v]) => v))
    setErrors(clean)
    return Object.keys(clean).length === 0
  }

  const submit = async () => {
    if (!validate()) return
    setLoading(true)
    try {
      const res = await userApi.login({ phoneNumber: form.phoneNumber, pin: form.pin })
      if (res.success) {
        addToast('Welcome back! 👋', 'success')
        onSuccess(res.data)
      } else {
        addToast(res.message || 'Login failed', 'error')
      }
    } catch {
      addToast('Cannot reach backend. Is Spring Boot running on :8080?', 'error')
    }
    setLoading(false)
  }

  return (
    <div className={styles.form}>
      <Input
        label="Phone Number"
        name="phoneNumber"
        type="tel"
        value={form.phoneNumber}
        onChange={set('phoneNumber')}
        placeholder="9876543210"
        error={errors.phoneNumber}
        autoComplete="tel"
      />
      <Input
        label="PIN"
        name="pin"
        type="password"
        value={form.pin}
        onChange={set('pin')}
        placeholder="Enter your 4–6 digit PIN"
        error={errors.pin}
        autoComplete="current-password"
      />
      <Button onClick={submit} loading={loading} style={{ marginTop: 4 }}>
        Sign In →
      </Button>
    </div>
  )
}
