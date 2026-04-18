export const transitionEase = [0.22, 1, 0.36, 1]

export const pageStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
}

export const sectionReveal = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.74,
      ease: transitionEase,
    },
  },
}

export const boardReveal = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
}

export const cardReveal = {
  hidden: {
    opacity: 0,
    y: 36,
    scale: 0.97,
  },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.68,
      delay: index * 0.08,
      ease: transitionEase,
    },
  }),
}

export const badgeReveal = {
  hidden: {
    opacity: 0,
    scale: 0.85,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.46,
      delay: 0.24,
      ease: transitionEase,
    },
  },
}
