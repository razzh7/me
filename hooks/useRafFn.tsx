import * as React from 'react'

type Fn = () => void

export function useRafFn(fn: Fn) {
  const isActive = React.useRef(false)
  const rafId = React.useRef<number | null>(null)

  const pause = React.useCallback(() => {
    isActive.current = false
    if (rafId.current !== null) {
      window.cancelAnimationFrame(rafId.current)
      rafId.current = null
    }
  }, [])

  React.useEffect(() => pause, [pause])

  const loop = () => {
    rafId.current = null
    if (!isActive.current) return

    fn()
    // The callback may pause the loop when its work is complete.
    if (isActive.current) {
      rafId.current = window.requestAnimationFrame(loop)
    }
  }

  const resume = () => {
    if (!isActive.current && typeof window !== 'undefined') {
      isActive.current = true
      loop()
    }
  }

  return {
    isActive,
    pause,
    resume
  }
}
