import Icon from '../ui/Icon'
import { formatCurrency, formatDate } from '../../utils'
import styles from './TransactionRow.module.css'

const STATUS_STYLE = {
  SUCCESS: { label: 'Success', color: 'var(--accent-green)',  bg: 'var(--accent-green-light)' },
  FAILED:  { label: 'Failed',  color: 'var(--accent-red)',    bg: 'var(--accent-red-light)' },
  PENDING: { label: 'Pending', color: 'var(--accent-amber)',  bg: '#fffbeb' },
}

export default function TransactionRow({ tx, currentUpi }) {
  const isSent  = tx.senderUpi === currentUpi
  const status  = STATUS_STYLE[tx.status] ?? STATUS_STYLE.PENDING
  const peer    = isSent ? tx.receiverUpi : tx.senderUpi

  return (
    <div className={styles.row}>
      {/* Direction icon */}
      <div className={[styles.iconBox, isSent ? styles.sent : styles.received].join(' ')}>
        <Icon
          name={isSent ? 'arrowUp' : 'arrowDown'}
          size={18}
          color={isSent ? 'var(--accent-red)' : 'var(--accent-green)'}
        />
      </div>

      {/* Details */}
      <div className={styles.info}>
        <p className={styles.peer}>
          {isSent ? 'To' : 'From'}: <strong>{peer}</strong>
        </p>
        <p className={styles.meta}>
          {formatDate(tx.date)}
          <span className={styles.status} style={{ color: status.color, background: status.bg }}>
            {status.label}
          </span>
        </p>
      </div>

      {/* Amount */}
      <p
        className={styles.amount}
        style={{ color: isSent ? 'var(--accent-red)' : 'var(--accent-green)' }}
      >
        {isSent ? '−' : '+'}{formatCurrency(tx.amount)}
      </p>
    </div>
  )
}
