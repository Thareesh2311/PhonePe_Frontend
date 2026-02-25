import { useState } from 'react'
import TransactionRow from './TransactionRow'
import Spinner from '../ui/Spinner'
import styles from './TransactionList.module.css'

const TABS = ['All', 'Sent', 'Received']

export default function TransactionList({ txs, loading, currentUpi }) {
  const [tab, setTab] = useState('All')

  const filtered = txs.filter((t) => {
    if (tab === 'Sent')     return t.senderUpi === currentUpi
    if (tab === 'Received') return t.receiverUpi === currentUpi
    return true
  })

  return (
    <div className={styles.card}>
      {/* Header */}
      <div className={styles.cardHeader}>
        <h3 className={styles.title}>Transactions</h3>

        <div className={styles.tabs}>
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={[styles.tab, tab === t ? styles.tabActive : ''].join(' ')}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className={styles.body}>
        {loading ? (
          <div className={styles.center}>
            <Spinner size={26} />
            <p className={styles.hint}>Loading transactions…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className={styles.center}>
            <span className={styles.emptyIcon}>📭</span>
            <p className={styles.hint}>No transactions yet</p>
          </div>
        ) : (
          filtered.map((tx) => (
            <TransactionRow key={tx.transactionId} tx={tx} currentUpi={currentUpi} />
          ))
        )}
      </div>
    </div>
  )
}
