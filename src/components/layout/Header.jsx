import Icon from '../ui/Icon'
import Button from '../ui/Button'
import styles from './Header.module.css'

export default function Header({ user, onLogout }) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.logo}>
            <Icon name="wallet" size={20} color="#fff" />
          </div>
          <span className={styles.brandName}>PhonePe</span>
        </div>

        {/* User & actions */}
        <div className={styles.right}>
          <div className={styles.userChip}>
            <div className={styles.avatar}>
              {user?.name?.[0]?.toUpperCase() ?? 'U'}
            </div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>{user?.name}</span>
              <span className={styles.userUpi}>{user?.upiId}</span>
            </div>
          </div>

          <Button
            variant="secondary"
            size="sm"
            fullWidth={false}
            onClick={onLogout}
            style={{ gap: 6, color: 'var(--accent-red)', borderColor: 'var(--border)' }}
          >
            <Icon name="logout" size={15} color="var(--accent-red)" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}
