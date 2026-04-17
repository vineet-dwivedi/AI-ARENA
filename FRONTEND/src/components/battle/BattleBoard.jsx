import ModelCard from './ModelCard'
import VsBadge from './VsBadge'

function BattleBoard({ responses }) {
  return (
    <div className="battle-board">
      {responses.map((response) => (
        <ModelCard key={response.id} response={response} />
      ))}

      <VsBadge />
    </div>
  )
}

export default BattleBoard
