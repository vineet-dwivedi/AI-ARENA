import ActionButton from '../common/ActionButton'
import { BattleIcon } from '../icons/ArenaIcons'

function PromptComposer({
  prompt,
  onPromptChange,
  onStartBattle,
  isPromptEmpty,
}) {
  return (
    <div className="prompt-composer">
      <textarea
        className="prompt-composer__input"
        aria-label="Battle prompt"
        value={prompt}
        onChange={(event) => onPromptChange(event.target.value)}
        placeholder="Ask the arena to compare responses..."
        rows="4"
      />

      <div className="prompt-composer__footer">
        <ActionButton
          icon={<BattleIcon />}
          onClick={onStartBattle}
          disabled={isPromptEmpty}
        >
          Start Battle
        </ActionButton>
      </div>
    </div>
  )
}

export default PromptComposer
