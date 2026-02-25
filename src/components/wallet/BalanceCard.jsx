import { useState } from 'react'
import Icon from '../ui/Icon'
import Spinner from '../ui/Spinner'
import { formatCurrency } from '../../utils'
import styles from './BalanceCard.module.css'

export default function BalanceCard({ wallet, user, loading, onRefresh }) {
  const [hidden, setHidden] = useState(false)

  if (loading) {
    return (
      <div className={`${styles.card} ${styles.skeleton}`}>
        <Spinner size={28} color="rgba(255,255,255,0.6)" />
      </div>
    )
  }

  return (
    <div className={styles.card}>
      {/* Decorative blobs */}
      <div className={styles.blob1} />
      <div className={styles.blob2} />

      {/* Top row */}
      <div className={styles.top}>
        <div>
          <p className={styles.label}>Total Balance</p>
          <div className={styles.balanceRow}>
            <h2 className={styles.amount}>
              {hidden ? '₹ ••••••' : formatCurrency(wallet?.balance)}
            </h2>
            <button className={styles.eyeBtn} onClick={() => setHidden((h) => !h)}>
              <Icon name={hidden ? 'eye' : 'eyeOff'} size={16} />
            </button>
          </div>
        </div>

        <button className={styles.refreshBtn} onClick={onRefresh}>
          <Icon name="refresh" size={14} />
          Refresh
        </button>
      </div>

      {/* Divider */}
      <div className={styles.divider} />

      {/* User info */}
      <div className={styles.userRow}>
        <div className={styles.avatar}>
          {user?.name?.[0]?.toUpperCase() ?? 'U'}
        </div>
        <div>
          <p className={styles.userName}>{user?.name}</p>
          <p className={styles.upiId}>{user?.upiId}</p>
        </div>
        <div className={styles.walletId}>
          <span className={styles.walletLabel}>Wallet</span>
          <span className={styles.walletNum}>#{wallet?.walletId}</span>
        </div>
      </div>
    </div>
  )
}
