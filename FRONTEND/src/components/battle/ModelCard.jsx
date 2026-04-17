import StatusPill from '../common/StatusPill'
import { ClockIcon } from '../icons/ArenaIcons'
import ResponseBlocks from './ResponseBlocks'

function ModelCard({ response }) {
  const cardClassName = [
    'model-card',
    response.isWinner ? 'model-card--winner' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <article className={cardClassName}>
      {response.isWinner ? (
        <div className="model-card__winner">
          <StatusPill tone="accent">Winner</StatusPill>
        </div>
      ) : null}

      <header className="model-card__header">
        <div className="model-card__title-group">
          <h2 className="model-card__title">{response.model}</h2>
          <StatusPill>{response.variant}</StatusPill>
        </div>

        <div className="model-card__meta">
          <span className="model-card__stat">
            <ClockIcon />
            {response.latency}
          </span>
          <span className="model-card__stat">{response.tokens}</span>
        </div>
      </header>

      <ResponseBlocks blocks={response.blocks} />
    </article>
  )
}

export default ModelCard
