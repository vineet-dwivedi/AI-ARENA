import { motion } from 'framer-motion'
import { boardReveal } from '../../motion/variants'
import ModelCard from './ModelCard'
import VsBadge from './VsBadge'

const MotionBoard = motion.div

function BattleBoard({ battleRound, responses }) {
  return (
    <MotionBoard
      key={`battle-board-${battleRound}`}
      className="battle-board"
      initial="hidden"
      animate="visible"
      variants={boardReveal}
    >
      {responses.map((response, index) => (
        <ModelCard key={response.id} index={index} response={response} />
      ))}

      <VsBadge />
    </MotionBoard>
  )
}

export default BattleBoard
