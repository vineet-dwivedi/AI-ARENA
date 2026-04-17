function ActionButton({
  children,
  className = '',
  icon,
  variant = 'primary',
  size = 'md',
  type = 'button',
  ...buttonProps
}) {
  const classNames = [
    'action-button',
    `action-button--${variant}`,
    `action-button--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button className={classNames} type={type} {...buttonProps}>
      {icon ? <span className="action-button__icon">{icon}</span> : null}
      {children ? <span>{children}</span> : null}
    </button>
  )
}

export default ActionButton
