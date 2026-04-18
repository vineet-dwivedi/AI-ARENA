const MODEL_DETAILS = {
  solution_1: {
    model: 'Mistral',
    variant: 'mistral-small',
  },
  solution_2: {
    model: 'Cohere',
    variant: 'command-a',
  },
}

const LIST_ITEM_PATTERN = /^([-*\u2022]|\d+\.)\s+/

function normalizeText(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function toSentencePreview(text) {
  const normalizedText = normalizeText(text)

  if (!normalizedText) {
    return 'The judge did not provide a short summary for this round.'
  }

  const [firstSentence] = normalizedText.split(/(?<=[.!?])\s+/)
  return firstSentence || normalizedText
}

function toParagraphBlock(lines) {
  const text = lines.join(' ').trim()
  return text ? { type: 'paragraph', text } : null
}

/**
 * Converts mixed markdown/plain-text model output into the simple block shape
 * already used by the UI cards.
 */
export function createBlocksFromResponse(text) {
  const normalizedText = normalizeText(text)

  if (!normalizedText) {
    return [
      {
        type: 'paragraph',
        text: 'No response was generated for this model.',
      },
    ]
  }

  const lines = normalizedText.replace(/\r\n/g, '\n').split('\n')
  const blocks = []
  let paragraphLines = []

  const flushParagraph = () => {
    const paragraphBlock = toParagraphBlock(paragraphLines)

    if (paragraphBlock) {
      blocks.push(paragraphBlock)
    }

    paragraphLines = []
  }

  for (let index = 0; index < lines.length; index += 1) {
    const currentLine = lines[index].trim()

    if (!currentLine) {
      flushParagraph()
      continue
    }

    if (LIST_ITEM_PATTERN.test(currentLine)) {
      flushParagraph()

      const items = []

      while (index < lines.length) {
        const listLine = lines[index].trim()

        if (!LIST_ITEM_PATTERN.test(listLine)) {
          index -= 1
          break
        }

        items.push(listLine.replace(LIST_ITEM_PATTERN, '').trim())
        index += 1
      }

      if (items.length) {
        blocks.push({
          type: 'list',
          items,
        })
      }

      continue
    }

    paragraphLines.push(currentLine)
  }

  flushParagraph()

  return blocks.length
    ? blocks
    : [
        {
          type: 'paragraph',
          text: normalizedText,
        },
      ]
}

function getWinner(solutionOneScore, solutionTwoScore) {
  if (solutionOneScore === solutionTwoScore) {
    return null
  }

  return solutionOneScore > solutionTwoScore ? 'solution_1' : 'solution_2'
}

function createVerdict(result, winnerKey) {
  const solutionOneScore = result?.judge?.solution_1_score ?? 0
  const solutionTwoScore = result?.judge?.solution_2_score ?? 0
  const winnerModel = winnerKey ? MODEL_DETAILS[winnerKey].model : 'Tie'
  const winnerReasoning = winnerKey
    ? result.judge?.[`${winnerKey}_reasoning`] || ''
    : 'Both models scored evenly in this round.'

  const scoreLabel = winnerKey
    ? `Top score ${Math.max(solutionOneScore, solutionTwoScore)}/10`
    : `Tie at ${solutionOneScore}/10`

  const summary = winnerKey ? `${winnerModel} wins` : 'Tie between both models'
  const reasoning = [
    `${MODEL_DETAILS.solution_1.model} scored ${solutionOneScore}/10. ${normalizeText(result?.judge?.solution_1_reasoning)}`,
    `${MODEL_DETAILS.solution_2.model} scored ${solutionTwoScore}/10. ${normalizeText(result?.judge?.solution_2_reasoning)}`,
  ]
    .filter(Boolean)
    .join(' ')

  return {
    title: "Judge's Verdict",
    revealLabel: winnerKey ? 'Winner' : 'Result',
    summary,
    winnerModel,
    winnerNote: toSentencePreview(winnerReasoning),
    confidence: scoreLabel,
    reasoningLabel: 'View Reasoning',
    reasoning,
  }
}

export function createArenaViewFromGraphResult(result, fallbackPrompt) {
  const winnerKey = getWinner(
    result?.judge?.solution_1_score ?? 0,
    result?.judge?.solution_2_score ?? 0,
  )

  const responses = ['solution_1', 'solution_2'].map((solutionKey) => {
    const solutionScore = result?.judge?.[`${solutionKey}_score`] ?? 0

    return {
      id: solutionKey,
      model: MODEL_DETAILS[solutionKey].model,
      variant: MODEL_DETAILS[solutionKey].variant,
      latency: null,
      tokens: `${solutionScore}/10 score`,
      isWinner: solutionKey === winnerKey,
      blocks: createBlocksFromResponse(result?.[solutionKey]),
    }
  })

  return {
    prompt: normalizeText(result?.problem) || fallbackPrompt,
    responses,
    verdict: createVerdict(result, winnerKey),
  }
}
