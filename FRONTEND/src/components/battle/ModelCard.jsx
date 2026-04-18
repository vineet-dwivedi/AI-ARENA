import { motion } from 'framer-motion'
import StatusPill from '../common/StatusPill'
import { ClockIcon } from '../icons/ArenaIcons'
import { cardReveal, transitionEase } from '../../motion/variants'
import ResponseBlocks from './ResponseBlocks'

const MotionCard = motion.article
const MotionWinner = motion.div

function ModelCard({ index, response }) {
  const hasLatency = Boolean(response.latency)
  const hasSecondaryStat = Boolean(response.tokens)
  const cardClassName = [
    'model-card',
    response.isWinner ? 'model-card--winner' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <MotionCard
      className={cardClassName}
      custom={index}
      variants={cardReveal}
      whileHover={{
        y: -6,
        transition: {
          duration: 0.24,
          ease: transitionEase,
        },
      }}
    >
      {response.isWinner ? (
        <MotionWinner
          className="model-card__winner"
          initial={{ opacity: 0, y: -10, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.42, delay: 0.24, ease: transitionEase }}
        >
          <StatusPill tone="accent">Winner</StatusPill>
        </MotionWinner>
      ) : null}

      <header className="model-card__header">
        <div className="model-card__title-group">
          <h2 className="model-card__title">{response.model}</h2>
          <StatusPill>{response.variant}</StatusPill>
        </div>

        {hasLatency || hasSecondaryStat ? (
          <div className="model-card__meta">
            {hasLatency ? (
              <span className="model-card__stat">
                <ClockIcon />
                {response.latency}
              </span>
            ) : null}

            {hasSecondaryStat ? (
              <span className="model-card__stat">{response.tokens}</span>
            ) : null}
          </div>
        ) : null}
      </header>

      <ResponseBlocks blocks={response.blocks} />
    </MotionCard>
  )
}

export default ModelCard
