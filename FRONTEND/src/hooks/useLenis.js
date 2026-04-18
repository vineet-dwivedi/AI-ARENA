import { useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'
import Lenis from 'lenis'

/**
 * Lenis adds a smoother scroll feel while respecting users who prefer reduced
 * motion by opting out entirely in that case.
 */
function useLenis() {
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || typeof window === 'undefined') {
      return undefined
    }

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.92,
      touchMultiplier: 1.1,
    })

    let frameId = 0

    const animate = (time) => {
      lenis.raf(time)
      frameId = window.requestAnimationFrame(animate)
    }

    frameId = window.requestAnimationFrame(animate)

    return () => {
      window.cancelAnimationFrame(frameId)
      lenis.destroy()
    }
  }, [prefersReducedMotion])
}

export default useLenis
