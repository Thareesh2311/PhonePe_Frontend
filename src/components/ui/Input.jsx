import { useState } from 'react'
import Icon from './Icon'
import styles from './Input.module.css'

export default function Input({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  hint,
  autoComplete,
}) {
  const [showPass, setShowPass] = useState(false)
  const isPassword = type === 'password'
  const inputType  = isPassword && showPass ? 'text' : type

  return (
    <div className={styles.wrapper}>
      {label && (
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
      )}

      <div className={styles.inputWrap}>
        <input
          id={name}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={[styles.input, error ? styles.inputError : ''].join(' ')}
        />
        {isPassword && (
          <button
            type="button"
            className={styles.eyeBtn}
            onClick={() => setShowPass((p) => !p)}
            tabIndex={-1}
          >
            <Icon name={showPass ? 'eyeOff' : 'eye'} size={17} />
          </button>
        )}
      </div>

      {error && <p className={styles.error}>{error}</p>}
      {hint && !error && <p className={styles.hint}>{hint}</p>}
    </div>
  )
}
