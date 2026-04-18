import { AnimatePresence, motion } from 'framer-motion'
import ActionButton from './ActionButton'
import { MoonIcon, SunIcon } from '../icons/ArenaIcons'
import { transitionEase } from '../../motion/variants'

const MotionWrapper = motion.div
const MotionIcon = motion.span

function ThemeToggle({ theme, onToggle }) {
  const isDarkTheme = theme === 'dark'

  return (
    <MotionWrapper whileHover={{ y: -2 }} whileTap={{ scale: 0.94 }}>
      <ActionButton
        className="theme-toggle"
        variant="icon"
        size="sm"
        icon={
          <span className="theme-toggle__icon-shell">
            <AnimatePresence initial={false} mode="wait">
              <MotionIcon
                key={theme}
                className="theme-toggle__icon"
                initial={{
                  opacity: 0,
                  rotate: isDarkTheme ? -90 : 90,
                  scale: 0.5,
                }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  rotate: isDarkTheme ? 90 : -90,
                  scale: 0.5,
                }}
                transition={{ duration: 0.28, ease: transitionEase }}
              >
                {isDarkTheme ? <SunIcon /> : <MoonIcon />}
              </MotionIcon>
            </AnimatePresence>
          </span>
        }
        aria-label={
          isDarkTheme ? 'Switch to light theme' : 'Switch to dark theme'
        }
        onClick={onToggle}
      />
    </MotionWrapper>
  )
}

export default ThemeToggle
