export const motionTokens = {
  scrollSpring: {
    stiffness: 120,
    damping: 28,
    mass: 0.42,
    restDelta: 0.0005,
  },
  velocitySpring: {
    stiffness: 95,
    damping: 24,
    mass: 0.55,
  },
  softSpring: {
    type: 'spring' as const,
    stiffness: 150,
    damping: 24,
    mass: 0.55,
  },
  snappySpring: {
    type: 'spring' as const,
    stiffness: 260,
    damping: 28,
    mass: 0.42,
  },
  ease: [0.22, 1, 0.36, 1] as const,
  scene: {
    blurIn: 14,
    travelY: 48,
    inactiveScale: 0.965,
  },
} as const
