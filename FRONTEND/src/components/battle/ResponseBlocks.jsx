/**
 * This tiny renderer keeps text formatting data-driven, which makes it easy to
 * swap in live API content later without rewriting the card component.
 */
function ResponseBlocks({ blocks }) {
  return (
    <div className="model-card__content">
      {blocks.map((block, index) => {
        if (block.type === 'list') {
          return (
            <ul key={`list-${index}`} className="model-card__list">
              {block.items.map((item, itemIndex) => (
                <li key={`${item}-${itemIndex}`}>{item}</li>
              ))}
            </ul>
          )
        }

        return (
          <p key={`paragraph-${index}`} className="model-card__paragraph">
            {block.text}
          </p>
        )
      })}
    </div>
  )
}

export default ResponseBlocks
