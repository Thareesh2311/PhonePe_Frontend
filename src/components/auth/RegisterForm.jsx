import { useState } from 'react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { userApi } from '../../api'
import { validators } from '../../utils'
import styles from './AuthForms.module.css'

export default function RegisterForm({ onSuccess, addToast }) {
  const [form, setForm]       = useState({ name: '', phoneNumber: '', upiId: '', pin: '' })
  const [errors, setErrors]   = useState({})
  const [loading, setLoading] = useState(false)

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const validate = () => {
    const e = {
      name:        validators.required(form.name, 'Name'),
      phoneNumber: validators.phone(form.phoneNumber),
      upiId:       validators.upiId(form.upiId),
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
      const res = await userApi.register(form)
      if (res.success) {
        addToast('Account created! 🎉 Please log in.', 'success')
        onSuccess()
      } else {
        addToast(res.message || 'Registration failed', 'error')
      }
    } catch {
      addToast('Cannot reach backend. Is Spring Boot running on :8080?', 'error')
    }
    setLoading(false)
  }

  return (
    <div className={styles.form}>
      <Input
        label="Full Name"
        name="name"
        value={form.name}
        onChange={set('name')}
        placeholder="Rahul Sharma"
        error={errors.name}
        autoComplete="name"
      />
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
        label="UPI ID"
        name="upiId"
        value={form.upiId}
        onChange={set('upiId')}
        placeholder="rahul@upi"
        error={errors.upiId}
        hint="Format: name@bank  e.g. rahul@okicici"
      />
      <Input
        label="PIN"
        name="pin"
        type="password"
        value={form.pin}
        onChange={set('pin')}
        placeholder="Choose a 4–6 digit PIN"
        error={errors.pin}
        autoComplete="new-password"
      />
      <Button onClick={submit} loading={loading} style={{ marginTop: 4 }}>
        Create Account →
      </Button>
    </div>
  )
}
