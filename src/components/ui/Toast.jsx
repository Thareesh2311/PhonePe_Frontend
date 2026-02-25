import Icon from './Icon'
import styles from './Toast.module.css'

export default function Toast({ toasts }) {
  if (!toasts.length) return null

  return (
    <div className={styles.container}>
      {toasts.map((t) => (
        <div key={t.id} className={[styles.toast, styles[t.type]].join(' ')}>
          <span className={styles.icon}>
            <Icon
              name={t.type === 'success' ? 'check' : t.type === 'error' ? 'x' : 'info'}
              size={15}
            />
          </span>
          {t.message}
        </div>
      ))}
    </div>
  )
}
