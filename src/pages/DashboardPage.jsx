import { useState } from 'react'
import Header from '../components/layout/Header'
import BalanceCard from '../components/wallet/BalanceCard'
import QuickActions from '../components/wallet/QuickActions'
import AddMoneyModal from '../components/wallet/AddMoneyModal'
import SendMoneyModal from '../components/transaction/SendMoneyModal'
import TransactionList from '../components/transaction/TransactionList'
import { useWallet } from '../hooks/useWallet'
import styles from './DashboardPage.module.css'

export default function DashboardPage({ user, onLogout, addToast }) {
  const { wallet, txs, loadingW, loadingT, refresh } = useWallet(user.upiId)
  const [modal, setModal] = useState(null) // null | 'send' | 'add'

  return (
    <div className={styles.page}>
      <Header user={user} onLogout={onLogout} />

      <main className={styles.main}>
        <div className={styles.inner}>

          {/* Balance */}
          <section className={styles.section}>
            <BalanceCard
              wallet={wallet}
              user={user}
              loading={loadingW}
              onRefresh={refresh}
            />
          </section>

          {/* Quick actions */}
          <section className={styles.section}>
            <QuickActions onAction={setModal} />
          </section>

          {/* Transaction history */}
          <section className={styles.section}>
            <TransactionList
              txs={txs}
              loading={loadingT}
              currentUpi={user.upiId}
            />
          </section>

          {/* Account details */}
          <section className={styles.section}>
            <AccountDetails user={user} />
          </section>

        </div>
      </main>

      {/* Modals */}
      {modal === 'send' && (
        <SendMoneyModal
          user={user}
          onClose={() => setModal(null)}
          onSuccess={refresh}
          addToast={addToast}
        />
      )}
      {modal === 'add' && (
        <AddMoneyModal
          user={user}
          onClose={() => setModal(null)}
          onSuccess={refresh}
          addToast={addToast}
        />
      )}
    </div>
  )
}

/* ── Inline sub-component ───────────── */
function AccountDetails({ user }) {
  const rows = [
    ['Full Name',  user.name],
    ['Phone',      user.phoneNumber],
    ['UPI ID',     user.upiId],
    ['Account ID', `#${user.id}`],
  ]

  return (
    <div className={styles.detailCard}>
      <h3 className={styles.detailTitle}>Account Details</h3>
      {rows.map(([label, value]) => (
        <div key={label} className={styles.detailRow}>
          <span className={styles.detailLabel}>{label}</span>
          <span className={styles.detailValue}>{value}</span>
        </div>
      ))}
    </div>
  )
}
