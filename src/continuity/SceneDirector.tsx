import { useActor } from '@xstate/react'
import { assign, setup } from 'xstate'
import { createContext, type ReactNode, useContext, useMemo } from 'react'

type Direction = 'forward' | 'back' | 'jump'

type DirectorContext = {
  index: number
  count: number
  direction: Direction
  locked: boolean
}

type DirectorEvent =
  | { type: 'NEXT' }
  | { type: 'PREVIOUS' }
  | { type: 'GOTO'; index: number }
  | { type: 'RESET' }
  | { type: 'LOCK' }
  | { type: 'UNLOCK' }

type DirectorInput = {
  count: number
  initialIndex: number
}

const directorMachine = setup({
  types: {
    context: {} as DirectorContext,
    events: {} as DirectorEvent,
    input: {} as DirectorInput,
  },
  guards: {
    canNext: ({ context }) => !context.locked && context.index < context.count - 1,
    canPrevious: ({ context }) => !context.locked && context.index > 0,
    canGo: ({ context, event }) =>
      event.type === 'GOTO' &&
      !context.locked &&
      event.index >= 0 &&
      event.index < context.count &&
      event.index !== context.index,
  },
  actions: {
    next: assign({
      index: ({ context }) => context.index + 1,
      direction: () => 'forward' as const,
    }),
    previous: assign({
      index: ({ context }) => context.index - 1,
      direction: () => 'back' as const,
    }),
    goTo: assign({
      index: ({ context, event }) =>
        event.type === 'GOTO' ? Math.max(0, Math.min(context.count - 1, event.index)) : context.index,
      direction: ({ context, event }) => {
        if (event.type !== 'GOTO') return context.direction
        if (event.index > context.index) return 'forward'
        if (event.index < context.index) return 'back'
        return 'jump'
      },
    }),
    reset: assign({
      index: () => 0,
      direction: () => 'back' as const,
      locked: () => false,
    }),
    lock: assign({ locked: () => true }),
    unlock: assign({ locked: () => false }),
  },
}).createMachine({
  context: ({ input }) => ({
    index: Math.max(0, Math.min(input.initialIndex, Math.max(0, input.count - 1))),
    count: Math.max(1, input.count),
    direction: 'forward',
    locked: false,
  }),
  initial: 'active',
  states: { active: {} },
  on: {
    NEXT: { guard: 'canNext', actions: 'next' },
    PREVIOUS: { guard: 'canPrevious', actions: 'previous' },
    GOTO: { guard: 'canGo', actions: 'goTo' },
    RESET: { actions: 'reset' },
    LOCK: { actions: 'lock' },
    UNLOCK: { actions: 'unlock' },
  },
})

type SceneDirectorValue = {
  beat: string
  beats: readonly string[]
  index: number
  count: number
  direction: Direction
  locked: boolean
  next: () => void
  previous: () => void
  goTo: (index: number) => void
  reset: () => void
  lock: () => void
  unlock: () => void
  is: (beat: string) => boolean
  reached: (beat: string) => boolean
}

const SceneDirectorContext = createContext<SceneDirectorValue | null>(null)

type SceneDirectorProps = {
  beats: readonly string[]
  initialIndex?: number
  children: ReactNode
}

export function SceneDirector({ beats, initialIndex = 0, children }: SceneDirectorProps) {
  if (beats.length === 0) throw new Error('SceneDirector requires at least one beat')

  const [snapshot, send] = useActor(directorMachine, {
    input: { count: beats.length, initialIndex },
  })

  const { index, count, direction, locked } = snapshot.context
  const beat = beats[index] ?? beats[0]

  const value = useMemo<SceneDirectorValue>(() => ({
    beat,
    beats,
    index,
    count,
    direction,
    locked,
    next: () => send({ type: 'NEXT' }),
    previous: () => send({ type: 'PREVIOUS' }),
    goTo: (target) => send({ type: 'GOTO', index: target }),
    reset: () => send({ type: 'RESET' }),
    lock: () => send({ type: 'LOCK' }),
    unlock: () => send({ type: 'UNLOCK' }),
    is: (name) => beat === name,
    reached: (name) => {
      const target = beats.indexOf(name)
      return target >= 0 && index >= target
    },
  }), [beat, beats, count, direction, index, locked, send])

  return <SceneDirectorContext.Provider value={value}>{children}</SceneDirectorContext.Provider>
}

export function useSceneDirector() {
  const context = useContext(SceneDirectorContext)
  if (!context) throw new Error('useSceneDirector must be used inside SceneDirector')
  return context
}
