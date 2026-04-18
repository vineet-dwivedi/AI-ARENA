import { motion } from 'framer-motion'
import { badgeReveal } from '../../motion/variants'

const MotionBadge = motion.div

function VsBadge() {
  return (
    <MotionBadge className="battle-board__vs" variants={badgeReveal}>
      VS
    </MotionBadge>
  )
}

export default VsBadge
