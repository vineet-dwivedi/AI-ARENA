import ActionButton from './ActionButton'
import { MoonIcon, SunIcon } from '../icons/ArenaIcons'

function ThemeToggle({ theme, onToggle }) {
  const isDarkTheme = theme === 'dark'

  return (
    <ActionButton
      className="theme-toggle"
      variant="icon"
      size="sm"
      icon={isDarkTheme ? <SunIcon /> : <MoonIcon />}
      aria-label={isDarkTheme ? 'Switch to light theme' : 'Switch to dark theme'}
      onClick={onToggle}
    />
  )
}

export default ThemeToggle
