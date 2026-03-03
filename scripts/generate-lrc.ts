export function normalizeLrcTime(lrcText: string): string {
  const timeRegex = /\[(\d{2}):(\d{2})(?:\.(\d+))?\]/g

  const normalized = lrcText.replace(
    timeRegex,
    (_match, mm, ss, ms) => {
      const minutes = Number(mm)
      const seconds = Number(ss)
      const milliseconds = ms ? Number(`0.${ms}`) : 0

      let totalSeconds = minutes * 60 + seconds + milliseconds
      totalSeconds = Math.round(totalSeconds * 100) / 100

      const newMinutes = Math.floor(totalSeconds / 60)
      const newSeconds = Math.floor(totalSeconds % 60)
      const newMilliseconds = Math.round(
        (totalSeconds - Math.floor(totalSeconds)) * 100
      )

      return `[${String(newMinutes).padStart(2, '0')}:${String(
        newSeconds
      ).padStart(2, '0')}.${String(newMilliseconds).padStart(2, '0')}]`
    }
  )

  return normalized
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .join('\\n')
}