import { MotionConfig, motion } from 'framer-motion'
import { useState } from 'react'
import BattleBoard from './components/battle/BattleBoard'
import PromptComposer from './components/battle/PromptComposer'
import AppHeader from './components/layout/AppHeader'
import JudgeVerdict from './components/verdict/JudgeVerdict'
import { arenaBattleMock } from './data/mockBattle'
import useLenis from './hooks/useLenis'
import useTheme from './hooks/useTheme'
import { pageStagger, sectionReveal, transitionEase } from './motion/variants'

const MotionAmbient = motion.div
const MotionMain = motion.main
const MotionSection = motion.section

function App() {
  const [prompt, setPrompt] = useState(arenaBattleMock.prompt)
  const [isReasoningOpen, setIsReasoningOpen] = useState(true)
  const [battleRound, setBattleRound] = useState(0)
  const { theme, toggleTheme } = useTheme()

  useLenis()

  const isPromptEmpty = !prompt.trim()

  const handleStartBattle = () => {
    if (isPromptEmpty) {
      return
    }

    setPrompt((currentPrompt) => currentPrompt.trim())
    setBattleRound((currentRound) => currentRound + 1)
    setIsReasoningOpen(true)
  }

  const handleRunAgain = () => {
    setPrompt(arenaBattleMock.prompt)
    setIsReasoningOpen(true)
    setBattleRound((currentRound) => currentRound + 1)
  }

  return (
    <MotionConfig transition={{ duration: 0.62, ease: transitionEase }}>
      <div className="app-shell">
        <MotionAmbient
          className="app-shell__ambient"
          aria-hidden="true"
          animate={
            theme === 'dark'
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 0.72, scale: 1.08, y: -20 }
          }
        />

        <AppHeader theme={theme} onThemeToggle={toggleTheme} />

        <MotionMain
          className="arena-page"
          initial="hidden"
          animate="visible"
          variants={pageStagger}
        >
          <MotionSection className="arena-page__section" variants={sectionReveal}>
            <PromptComposer
              prompt={prompt}
              onPromptChange={setPrompt}
              onStartBattle={handleStartBattle}
              isPromptEmpty={isPromptEmpty}
            />
          </MotionSection>

          <MotionSection className="arena-page__section" variants={sectionReveal}>
            <BattleBoard
              battleRound={battleRound}
              responses={arenaBattleMock.responses}
            />
          </MotionSection>

          <MotionSection className="arena-page__section" variants={sectionReveal}>
            <JudgeVerdict
              battleRound={battleRound}
              verdict={arenaBattleMock.verdict}
              isReasoningOpen={isReasoningOpen}
              onToggleReasoning={() =>
                setIsReasoningOpen((currentState) => !currentState)
              }
              onRunAgain={handleRunAgain}
            />
          </MotionSection>
        </MotionMain>
      </div>
    </MotionConfig>
  )
}

export default App
