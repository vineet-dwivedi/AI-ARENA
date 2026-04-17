import ThemeToggle from '../common/ThemeToggle'
import { ArenaMark } from '../icons/ArenaIcons'

function AppHeader({ theme, onThemeToggle }) {
  return (
    <header className="app-header">
      <div className="app-header__brand">
        <ArenaMark />
        <span className="app-header__title">AI Arena</span>
      </div>

      <ThemeToggle theme={theme} onToggle={onThemeToggle} />
    </header>
  )
}

export default AppHeader
