import ActionButton from '../common/ActionButton'
import { BattleIcon } from '../icons/ArenaIcons'

function PromptComposer({
  prompt,
  onPromptChange,
  onStartBattle,
  isLoading,
  isPromptEmpty,
  helperMessage,
  errorMessage,
}) {
  const handleKeyDown = (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
      event.preventDefault()
      onStartBattle()
    }
  }

  return (
    <div className="prompt-composer">
      <textarea
        className="prompt-composer__input"
        aria-label="Battle prompt"
        value={prompt}
        disabled={isLoading}
        onChange={(event) => onPromptChange(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask the arena to compare responses..."
        rows="4"
      />

      <div className="prompt-composer__footer">
        <div className="prompt-composer__meta">
          <p className="prompt-composer__helper">{helperMessage}</p>
          {errorMessage ? (
            <p className="prompt-composer__error" role="alert">
              {errorMessage}
            </p>
          ) : null}
        </div>

        <ActionButton
          icon={<BattleIcon />}
          onClick={onStartBattle}
          disabled={isPromptEmpty || isLoading}
        >
          {isLoading ? 'Battling...' : 'Start Battle'}
        </ActionButton>
      </div>
    </div>
  )
}

export default PromptComposer
