import Icon from '../ui/Icon'
import styles from './QuickActions.module.css'

const actions = [
  {
    id: 'send',
    label: 'Send Money',
    icon: 'send',
    iconColor: 'var(--primary)',
    bg: 'var(--primary-light)',
    hoverBorder: 'var(--primary)',
    hoverShadow: 'rgba(99,102,241,0.2)',
  },
  {
    id: 'add',
    label: 'Add Money',
    icon: 'plus',
    iconColor: 'var(--accent-green)',
    bg: 'var(--accent-green-light)',
    hoverBorder: 'var(--accent-green)',
    hoverShadow: 'rgba(13,148,136,0.2)',
  },
]

export default function QuickActions({ onAction }) {
  return (
    <div className={styles.grid}>
      {actions.map((a) => (
        <button
          key={a.id}
          className={styles.tile}
          onClick={() => onAction(a.id)}
          data-action={a.id}
        >
          <div className={styles.iconWrap} style={{ background: a.bg }}>
            <Icon name={a.icon} size={22} color={a.iconColor} />
          </div>
          <span className={styles.label}>{a.label}</span>
        </button>
      ))}
    </div>
  )
}
