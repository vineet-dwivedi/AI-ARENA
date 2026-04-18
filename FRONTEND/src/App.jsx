import { MotionConfig, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import BattleBoard from './components/battle/BattleBoard'
import PromptComposer from './components/battle/PromptComposer'
import AppHeader from './components/layout/AppHeader'
import JudgeVerdict from './components/verdict/JudgeVerdict'
import { arenaBattleMock } from './data/mockBattle'
import useLenis from './hooks/useLenis'
import useTheme from './hooks/useTheme'
import { pageStagger, sectionReveal, transitionEase } from './motion/variants'
import { requestArenaBattle } from './services/arenaApi'
import { createArenaViewFromGraphResult } from './utils/arenaTransformers'

const MotionAmbient = motion.div
const MotionMain = motion.main
const MotionSection = motion.section

function App() {
  const [arenaView, setArenaView] = useState(arenaBattleMock)
  const [prompt, setPrompt] = useState(arenaBattleMock.prompt)
  const [isReasoningOpen, setIsReasoningOpen] = useState(true)
  const [battleRound, setBattleRound] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [lastSubmittedPrompt, setLastSubmittedPrompt] = useState(
    arenaBattleMock.prompt,
  )
  const { theme, toggleTheme } = useTheme()
  const activeRequestRef = useRef(null)

  useLenis()

  useEffect(
    () => () => {
      activeRequestRef.current?.abort()
    },
    [],
  )

  const isPromptEmpty = !prompt.trim()

  const runBattle = async (rawPrompt) => {
    const normalizedPrompt = rawPrompt.trim()

    if (!normalizedPrompt || isLoading) {
      return
    }

    activeRequestRef.current?.abort()

    const requestController = new AbortController()
    activeRequestRef.current = requestController

    setPrompt(normalizedPrompt)
    setLastSubmittedPrompt(normalizedPrompt)
    setErrorMessage('')
    setIsLoading(true)

    try {
      const graphResult = await requestArenaBattle(normalizedPrompt, {
        signal: requestController.signal,
      })

      setArenaView(createArenaViewFromGraphResult(graphResult, normalizedPrompt))
      setBattleRound((currentRound) => currentRound + 1)
      setIsReasoningOpen(true)
    } catch (error) {
      if (error?.name === 'AbortError') {
        return
      }

      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Unable to connect to the backend right now.',
      )
    } finally {
      if (activeRequestRef.current === requestController) {
        activeRequestRef.current = null
      }

      setIsLoading(false)
    }
  }

  const handleStartBattle = () => {
    void runBattle(prompt)
  }

  const handleRunAgain = () => {
    void runBattle(lastSubmittedPrompt || prompt)
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
              isLoading={isLoading}
              isPromptEmpty={isPromptEmpty}
              helperMessage={
                isLoading
                  ? 'Comparing live model responses through the backend...'
                  : 'Press Ctrl/Cmd + Enter to launch a live round through the backend.'
              }
              errorMessage={errorMessage}
            />
          </MotionSection>

          <MotionSection className="arena-page__section" variants={sectionReveal}>
            <BattleBoard
              battleRound={battleRound}
              responses={arenaView.responses}
            />
          </MotionSection>

          <MotionSection className="arena-page__section" variants={sectionReveal}>
            <JudgeVerdict
              battleRound={battleRound}
              verdict={arenaView.verdict}
              isReasoningOpen={isReasoningOpen}
              isLoading={isLoading}
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
