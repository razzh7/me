export const WORDMARK_CYCLE_MS = 10000
export const WORDMARK_TIMELINE = {
  drawStart: 200,
  drawEnd: 4000,
  reverseStart: 7800,
  reverseEnd: 9600
}

export function getWordmarkTiming(at: number, steps: number) {
  const { drawStart, drawEnd, reverseStart, reverseEnd } = WORDMARK_TIMELINE
  const drawDuration = drawEnd - drawStart
  const reverseDuration = reverseEnd - reverseStart
  const percent = (ms: number) => `${ms / WORDMARK_CYCLE_MS * 100}%`
  const start = drawStart + at * drawDuration
  const end = start + drawDuration / steps
  // Later slices retract first. The same connected prefix remains visible in
  // both directions, including the partial slice at the moving pen tip.
  const retractStart = reverseStart + (1 - at - 1 / steps) * reverseDuration
  const retractEnd = reverseStart + (1 - at) * reverseDuration
  return `linear(0 0%, 0 ${percent(start)}, 1 ${percent(end)}, 1 ${percent(retractStart)}, 0 ${percent(retractEnd)}, 0 100%)`
}

export function getWordmarkProgress(ms: number) {
  const time = ms % WORDMARK_CYCLE_MS
  const { drawStart, drawEnd, reverseStart, reverseEnd } = WORDMARK_TIMELINE
  if (time <= drawStart) return 0
  if (time < drawEnd) return (time - drawStart) / (drawEnd - drawStart)
  if (time <= reverseStart) return 1
  if (time < reverseEnd) return (reverseEnd - time) / (reverseEnd - reverseStart)
  return 0
}
