import ActionButton from '../common/ActionButton'
import StatusPill from '../common/StatusPill'
import {
  ChevronIcon,
  RefreshIcon,
  ScalesIcon,
} from '../icons/ArenaIcons'

function JudgeVerdict({
  verdict,
  isReasoningOpen,
  onToggleReasoning,
  onRunAgain,
}) {
  return (
    <section className="judge-verdict">
      <div className="judge-verdict__top-row">
        <div className="judge-verdict__summary">
          <div className="judge-verdict__title-wrap">
            <span className="judge-verdict__icon">
              <ScalesIcon />
            </span>

            <div className="judge-verdict__title-block">
              <h2 className="judge-verdict__title">{verdict.title}</h2>
              <div className="judge-verdict__badges">
                <span className="judge-verdict__summary-text">
                  {verdict.summary}
                </span>
                <StatusPill>{verdict.confidence}</StatusPill>
              </div>
            </div>
          </div>
        </div>

        <ActionButton icon={<RefreshIcon />} onClick={onRunAgain}>
          Run Again
        </ActionButton>
      </div>

      <button
        className="judge-verdict__accordion"
        type="button"
        aria-expanded={isReasoningOpen}
        onClick={onToggleReasoning}
      >
        <span>{verdict.reasoningLabel}</span>
        <ChevronIcon isOpen={isReasoningOpen} />
      </button>

      {isReasoningOpen ? (
        <div className="judge-verdict__content">
          <p>{verdict.reasoning}</p>
        </div>
      ) : null}
    </section>
  )
}

export default JudgeVerdict
