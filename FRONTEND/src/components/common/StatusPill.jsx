function StatusPill({ children, className = '', tone = 'neutral' }) {
  const classNames = ['status-pill', `status-pill--${tone}`, className]
    .filter(Boolean)
    .join(' ')

  return <span className={classNames}>{children}</span>
}

export default StatusPill
