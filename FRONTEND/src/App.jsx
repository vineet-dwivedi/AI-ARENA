import { useState } from 'react'
import BattleBoard from './components/battle/BattleBoard'
import PromptComposer from './components/battle/PromptComposer'
import AppHeader from './components/layout/AppHeader'
import JudgeVerdict from './components/verdict/JudgeVerdict'
import { arenaBattleMock } from './data/mockBattle'
import useTheme from './hooks/useTheme'

function App() {
  const [prompt, setPrompt] = useState(arenaBattleMock.prompt)
  const [isReasoningOpen, setIsReasoningOpen] = useState(true)
  const { theme, toggleTheme } = useTheme()

  const isPromptEmpty = !prompt.trim()

  const handleStartBattle = () => {
    if (isPromptEmpty) {
      return
    }

    setPrompt((currentPrompt) => currentPrompt.trim())
  }

  const handleRunAgain = () => {
    setPrompt(arenaBattleMock.prompt)
    setIsReasoningOpen(true)
  }

  return (
    <div className="app-shell">
      <AppHeader theme={theme} onThemeToggle={toggleTheme} />

      <main className="arena-page">
        <section className="arena-page__section">
          <PromptComposer
            prompt={prompt}
            onPromptChange={setPrompt}
            onStartBattle={handleStartBattle}
            isPromptEmpty={isPromptEmpty}
          />
        </section>

        <section className="arena-page__section">
          <BattleBoard responses={arenaBattleMock.responses} />
        </section>

        <section className="arena-page__section">
          <JudgeVerdict
            verdict={arenaBattleMock.verdict}
            isReasoningOpen={isReasoningOpen}
            onToggleReasoning={() =>
              setIsReasoningOpen((currentState) => !currentState)
            }
            onRunAgain={handleRunAgain}
          />
        </section>
      </main>
    </div>
  )
}

export default App
