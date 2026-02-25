import { useState } from 'react'
import LoginForm from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm'
import Icon from '../components/ui/Icon'
import styles from './AuthPage.module.css'

export default function AuthPage({ onLogin, addToast }) {
  const [tab, setTab] = useState('login')

  const handleRegisterSuccess = () => setTab('login')

  return (
    <div className={styles.page}>
      {/* Background pattern */}
      <div className={styles.bgPattern} />

      <div className={styles.container}>
        {/* Left panel - branding */}
        <div className={styles.left}>
          <div className={styles.brandIcon}>
            <Icon name="wallet" size={36} color="#fff" />
          </div>
          <h1 className={styles.brandTitle}>PhonePe<br />Wallet</h1>
          <p className={styles.brandSub}>
            Fast, secure, and simple digital payments at your fingertips.
          </p>

          <ul className={styles.features}>
            {[
              'Instant money transfers',
              'Real-time balance tracking',
              'Complete transaction history',
              'Safe & encrypted',
            ].map((f) => (
              <li key={f} className={styles.feature}>
                <span className={styles.featureDot} />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Right panel - form */}
        <div className={styles.right}>
          <div className={styles.card}>
            {/* Tab switcher */}
            <div className={styles.tabBar}>
              {['login', 'register'].map((t) => (
                <button
                  key={t}
                  className={[styles.tabBtn, tab === t ? styles.tabBtnActive : ''].join(' ')}
                  onClick={() => setTab(t)}
                >
                  {t === 'login' ? 'Sign In' : 'Register'}
                </button>
              ))}
            </div>

            {/* Heading */}
            <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>
                {tab === 'login' ? 'Welcome back!' : 'Create an account'}
              </h2>
              <p className={styles.formSub}>
                {tab === 'login'
                  ? 'Enter your credentials to access your wallet.'
                  : 'Sign up to start sending and receiving money.'}
              </p>
            </div>

            {/* Form */}
            {tab === 'login' ? (
              <LoginForm onSuccess={onLogin} addToast={addToast} />
            ) : (
              <RegisterForm onSuccess={handleRegisterSuccess} addToast={addToast} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
