import styles from './Spinner.module.css'

export default function Spinner({ size = 24, color = 'var(--primary)' }) {
  return (
    <span
      className={styles.spinner}
      style={{ width: size, height: size, borderTopColor: color }}
    />
  )
}
