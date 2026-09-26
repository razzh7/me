/** Visual regression for detached ink and gaps during the SVG reveal. */
import fs from 'node:fs/promises'
import sharp from 'sharp'
import { RAZZH_OUTLINE, RAZZH_REVEAL, RAZZH_REVEAL_STEPS } from '../components/layout/razzh-wordmark-paths'
import { getWordmarkProgress, WORDMARK_CYCLE_MS, WORDMARK_TIMELINE } from '../components/layout/razzh-wordmark-timing'

function components(alpha: Buffer, width: number, height: number) {
  const seen = new Uint8Array(width * height)
  const sizes: number[] = []
  for (let i = 0; i < seen.length; i++) {
    if (seen[i] || alpha[i * 4 + 3] < 128) continue
    seen[i] = 1
    const pending = [i]
    let size = 0
    while (pending.length) {
      const p = pending.pop()!
      size++
      const x = p % width
      const y = Math.floor(p / width)
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if ((!dx && !dy) || x + dx < 0 || x + dx >= width || y + dy < 0 || y + dy >= height) continue
          const n = (y + dy) * width + x + dx
          if (seen[n] || alpha[n * 4 + 3] < 128) continue
          seen[n] = 1
          pending.push(n)
        }
      }
    }
    if (size >= 3) sizes.push(size)
  }
  return sizes.sort((a, b) => b - a)
}

const svg = (progress: number, width: number, height: number, mask = true) => {
  const paths = RAZZH_REVEAL.map(({ d, at }) => {
    const opacity = Math.max(0, Math.min(1, (progress - at) * RAZZH_REVEAL_STEPS))
    return opacity ? `<path d="${d}" fill="white" fill-rule="evenodd" stroke="white" stroke-width="3" stroke-linejoin="round" opacity="${opacity}"/>` : ''
  }).join('')
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="62 201 433 172" width="${width}" height="${height}"><defs><mask id="m" maskUnits="userSpaceOnUse" x="62" y="201" width="433" height="172">${paths}</mask></defs><path d="${RAZZH_OUTLINE}" fill="white" fill-rule="evenodd" ${mask ? 'mask="url(#m)"' : ''}/></svg>`
}

async function main() {
  await fs.mkdir('out/wordmark-qa', { recursive: true })
  const cells: sharp.OverlayOptions[] = []
  let checked = 0
  let maxMissing = 0
  for (const width of [240, 480]) {
    const height = Math.round(width * 172 / 433)
    const original = await sharp(Buffer.from(svg(1, width, height, false))).ensureAlpha().raw().toBuffer()
    const final = await sharp(Buffer.from(svg(1, width, height))).ensureAlpha().raw().toBuffer()
    let total = 0
    let missing = 0
    for (let p = 3; p < final.length; p += 4) {
      total += original[p]
      missing += Math.max(0, original[p] - final[p])
    }
    const missingPercent = missing / total * 100
    if (missingPercent > 0.05) throw new Error(`Missing ${missingPercent}% of the final glyph at ${width}px`)
    maxMissing = Math.max(maxMissing, missingPercent)
    for (let frame = 1; frame <= RAZZH_REVEAL_STEPS; frame++) {
      const progress = frame / RAZZH_REVEAL_STEPS
      const frameSvg = svg(progress, width, height)
      const raw = await sharp(Buffer.from(frameSvg)).ensureAlpha().raw().toBuffer()
      const islands = components(raw, width, height)
      if (islands.length > 1) throw new Error(`Detached ink at reveal frame ${frame}/${RAZZH_REVEAL_STEPS}, ${width}px: ${islands.join(', ')} pixels`)
      checked++
      if (width === 240 && frame % 15 === 0) {
        const column = (frame / 15 - 1) % 4
        const row = Math.floor((frame / 15 - 1) / 4)
        cells.push({ input: await sharp(Buffer.from(frameSvg)).flatten({ background: '#111' }).png().toBuffer(), left: column * 272 + 16, top: row * 130 + 26 })
        cells.push({ input: Buffer.from(`<svg width="240" height="22"><text x="0" y="16" fill="#aaa" font-family="sans-serif" font-size="12">${((WORDMARK_TIMELINE.drawStart + progress * (WORDMARK_TIMELINE.drawEnd - WORDMARK_TIMELINE.drawStart)) / 1000).toFixed(2)}s</text></svg>`), left: column * 272 + 16, top: row * 130 + 4 })
      }
    }
  }
  await sharp({ create: { width: 1088, height: 780, channels: 3, background: '#111' } }).composite(cells).png().toFile('out/wordmark-qa/frames.png')
  const reverseCells: sharp.OverlayOptions[] = []
  const { reverseStart, reverseEnd } = WORDMARK_TIMELINE
  let previous = 1
  for (let frame = 0; frame <= 60; frame++) {
    const time = reverseStart + frame / 60 * (reverseEnd - reverseStart)
    const progress = getWordmarkProgress(time)
    if (progress > previous) throw new Error('Reverse playback advanced the pen')
    previous = progress
    const frameSvg = svg(progress, 240, 95)
    const raw = await sharp(Buffer.from(frameSvg)).ensureAlpha().raw().toBuffer()
    if (components(raw, 240, 95).length > 1) throw new Error(`Detached ink during reverse at ${time}ms`)
    if (frame % 10 === 0) {
      reverseCells.push({ input: await sharp(Buffer.from(frameSvg)).flatten({ background: '#111' }).png().toBuffer(), left: 16, top: frame / 10 * 125 + 25 })
      reverseCells.push({ input: Buffer.from(`<svg width="240" height="22"><text x="0" y="16" fill="#aaa" font-family="sans-serif" font-size="12">${(time / 1000).toFixed(2)}s</text></svg>`), left: 16, top: frame / 10 * 125 + 3 })
    }
  }
  if (getWordmarkProgress(reverseEnd) !== 0 || getWordmarkProgress(WORDMARK_CYCLE_MS) !== 0) throw new Error('Loop did not finish with blank ink')
  await sharp({ create: { width: 272, height: 875, channels: 3, background: '#111' } }).composite(reverseCells).png().toFile('out/wordmark-qa/reverse.png')
  console.log(`PASS: ${checked} rendered frames; no detached ink >= 3 pixels; final missing ink ${maxMissing.toFixed(5)}%`)
  console.log('PASS: 61 reverse frames stay connected and shrink to blank before the next loop')
  console.log('Contact sheet: out/wordmark-qa/frames.png')
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
