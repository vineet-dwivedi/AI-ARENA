import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { useLayoutEffect, useRef } from 'react'
import ActionButton from '../common/ActionButton'
import StatusPill from '../common/StatusPill'
import {
  ChevronIcon,
  RefreshIcon,
  ScalesIcon,
} from '../icons/ArenaIcons'
import { transitionEase } from '../../motion/variants'

const MotionVerdict = motion.section
const MotionContentWrap = motion.div
const MotionContent = motion.div

function JudgeVerdict({
  battleRound,
  verdict,
  isReasoningOpen,
  isLoading,
  onToggleReasoning,
  onRunAgain,
}) {
  const verdictRef = useRef(null)
  const glowRef = useRef(null)
  const revealRef = useRef(null)
  const summaryRef = useRef(null)
  const confidenceRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(
          [
            glowRef.current,
            revealRef.current,
            summaryRef.current,
            confidenceRef.current,
          ],
          {
            clearProps: 'all',
            opacity: 1,
          },
        )

        return
      }

      const timeline = gsap.timeline({
        defaults: {
          ease: 'power3.out',
        },
      })

      timeline
        .fromTo(
          glowRef.current,
          {
            autoAlpha: 0,
            scale: 0.72,
          },
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.84,
          },
        )
        .fromTo(
          revealRef.current,
          {
            autoAlpha: 0,
            y: 24,
            scale: 0.93,
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.76,
            ease: 'back.out(1.45)',
          },
          0.16,
        )
        .fromTo(
          [summaryRef.current, confidenceRef.current],
          {
            autoAlpha: 0,
            y: 14,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.44,
            stagger: 0.08,
          },
          0.36,
        )
    }, verdictRef)

    return () => ctx.revert()
  }, [battleRound, prefersReducedMotion])

  return (
    <MotionVerdict ref={verdictRef} className="judge-verdict" layout>
      <div className="judge-verdict__glow" ref={glowRef} aria-hidden="true" />

      <div className="judge-verdict__top-row">
        <div className="judge-verdict__summary">
          <div className="judge-verdict__title-wrap">
            <span className="judge-verdict__icon">
              <ScalesIcon />
            </span>

            <div className="judge-verdict__title-block">
              <div className="judge-verdict__reveal" ref={revealRef} aria-live="polite">
                <span className="judge-verdict__reveal-label">
                  {verdict.revealLabel || 'Winner'}
                </span>
                <strong className="judge-verdict__reveal-name">
                  {verdict.winnerModel}
                </strong>
                <span className="judge-verdict__reveal-note">
                  {verdict.winnerNote}
                </span>
              </div>

              <h2 className="judge-verdict__title">{verdict.title}</h2>
              <div className="judge-verdict__badges">
                <span className="judge-verdict__summary-text" ref={summaryRef}>
                  {verdict.summary}
                </span>
                <span ref={confidenceRef}>
                  <StatusPill className="judge-verdict__confidence">
                    {verdict.confidence}
                  </StatusPill>
                </span>
              </div>
            </div>
          </div>
        </div>

        <ActionButton
          disabled={isLoading}
          icon={<RefreshIcon />}
          onClick={onRunAgain}
        >
          {isLoading ? 'Running...' : 'Run Again'}
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

      <AnimatePresence initial={false}>
        {isReasoningOpen ? (
          <MotionContentWrap
            key="judge-reasoning"
            className="judge-verdict__content-wrap"
            initial={
              prefersReducedMotion
                ? { opacity: 1, height: 'auto' }
                : { opacity: 0, height: 0 }
            }
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.34, ease: transitionEase }}
          >
            <MotionContent
              className="judge-verdict__content"
              initial={prefersReducedMotion ? false : { y: -8 }}
              animate={{ y: 0 }}
              exit={{ y: -8 }}
              transition={{ duration: 0.24, ease: transitionEase }}
            >
              <p>{verdict.reasoning}</p>
            </MotionContent>
          </MotionContentWrap>
        ) : null}
      </AnimatePresence>
    </MotionVerdict>
  )
}

export default JudgeVerdict
