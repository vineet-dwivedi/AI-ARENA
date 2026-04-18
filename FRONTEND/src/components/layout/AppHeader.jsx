import { motion } from 'framer-motion'
import ThemeToggle from '../common/ThemeToggle'
import { ArenaMark } from '../icons/ArenaIcons'
import { transitionEase } from '../../motion/variants'

const MotionHeader = motion.header
const MotionBrand = motion.div

function AppHeader({ theme, onThemeToggle }) {
  return (
    <MotionHeader
      className="app-header"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.58, ease: transitionEase }}
    >
      <MotionBrand
        className="app-header__brand"
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55, delay: 0.08, ease: transitionEase }}
      >
        <ArenaMark />
        <span className="app-header__title">AI Arena</span>
      </MotionBrand>

      <ThemeToggle theme={theme} onToggle={onThemeToggle} />
    </MotionHeader>
  )
}

export default AppHeader
