import sharp from 'sharp'

type Point = { x: number; y: number; time: number }
export type RevealSlice = { d: string; at: number }

// Writing guides, not visible strokes. The reveal travels through the filled
// glyph, so neither the counters nor a neighbouring stroke can be jumped over.
const guides = [
  { start: 0, end: 5, d: 'M72 322 Q77 306 85 293 Q75 286 82 278 Q87 274 88 282 Q92 295 121 286' },
  { start: 5, end: 11, d: 'M121 286 C113 292 105 315 100 338 C92 370 127 345 143 317' },
  { start: 11, end: 19, d: 'M143 317 C155 289 178 278 193 291 C205 300 174 336 154 349 C131 361 134 335 143 317' },
  { start: 19, end: 25, d: 'M201 291 C197 307 194 318 191 339 C185 370 219 341 231 309' },
  { start: 25, end: 35, d: 'M231 309 C239 277 247 291 270 292 Q291 296 310 280 L230 353 C244 335 265 363 283 353 C306 340 312 320 318 303' },
  { start: 35, end: 45, d: 'M318 303 C321 276 333 292 355 292 Q376 296 394 280 L312 353 C327 335 345 364 368 351 C389 339 397 317 407 289' },
  { start: 45, end: 57, d: 'M407 289 C417 264 429 235 449 219 C470 200 477 216 460 242 C446 263 425 282 406 311 L387 361' },
  { start: 57, end: 65, d: 'M410 308 C430 284 462 270 451 301 L439 339 C430 373 469 347 485 308' }
]

function sample({ d, start, end }: typeof guides[number]): Point[] {
  const tokens = d.match(/[MLCQ]|-?\d+(?:\.\d+)?/g)!
  let i = 0
  let x = 0
  let y = 0
  const points: Point[] = []
  while (i < tokens.length) {
    const command = tokens[i++]
    if (command === 'M') {
      x = +tokens[i++]
      y = +tokens[i++]
      points.push({ x, y, time: 0 })
      continue
    }
    const count = command === 'C' ? 6 : command === 'Q' ? 4 : 2
    const values = tokens.slice(i, i + count).map(Number)
    i += count
    const [sx, sy] = [x, y]
    for (let step = 1; step <= 100; step++) {
      const t = step / 100
      const u = 1 - t
      if (command === 'C') {
        x = u ** 3 * sx + 3 * u ** 2 * t * values[0] + 3 * u * t ** 2 * values[2] + t ** 3 * values[4]
        y = u ** 3 * sy + 3 * u ** 2 * t * values[1] + 3 * u * t ** 2 * values[3] + t ** 3 * values[5]
      } else if (command === 'Q') {
        x = u ** 2 * sx + 2 * u * t * values[0] + t ** 2 * values[2]
        y = u ** 2 * sy + 2 * u * t * values[1] + t ** 2 * values[3]
      } else {
        x = u * sx + t * values[0]
        y = u * sy + t * values[1]
      }
      points.push({ x, y, time: 0 })
    }
  }
  let length = 0
  points.forEach((point, index) => {
    if (index) length += Math.hypot(point.x - points[index - 1].x, point.y - points[index - 1].y)
    point.time = length
  })
  return points.map(point => ({ ...point, time: start + point.time / length * (end - start) }))
}

class Queue {
  private values: { index: number; time: number }[] = []

  push(index: number, time: number) {
    const value = { index, time }
    let i = this.values.length
    this.values.push(value)
    while (i > 0) {
      const parent = (i - 1) >> 1
      if (this.values[parent].time <= time) break
      this.values[i] = this.values[parent]
      i = parent
    }
    this.values[i] = value
  }

  pop() {
    const first = this.values[0]
    const last = this.values.pop()!
    if (this.values.length) {
      let i = 0
      while (i * 2 + 1 < this.values.length) {
        let child = i * 2 + 1
        if (child + 1 < this.values.length && this.values[child + 1].time < this.values[child].time) child++
        if (last.time <= this.values[child].time) break
        this.values[i] = this.values[child]
        i = child
      }
      this.values[i] = last
    }
    return first
  }

  get length() { return this.values.length }
}

export async function buildReveal(outline: string) {
  const scale = 2
  const width = 866
  const height = 344
  const frames = 360
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="62 201 433 172" width="${width}" height="${height}"><path d="${outline}" fill="white" fill-rule="evenodd"/></svg>`
  const pixels = await sharp(Buffer.from(svg)).ensureAlpha().raw().toBuffer()
  const ink = Uint8Array.from({ length: width * height }, (_, i) => pixels[i * 4 + 3] >= 128 ? 1 : 0)
  const points = guides.flatMap(sample)
  const desired = new Float64Array(ink.length)
  let seed = 0
  let seedDistance = Infinity
  for (let index = 0; index < ink.length; index++) {
    if (!ink[index]) continue
    const x = (index % width + 0.5) / scale + 62
    const y = (Math.floor(index / width) + 0.5) / scale + 201
    let distance = Infinity
    for (const point of points) {
      const d = (point.x - x) ** 2 + (point.y - y) ** 2
      if (d < distance) {
        distance = d
        desired[index] = point.time
      }
    }
    const fromStart = (x - 72) ** 2 + (y - 322) ** 2
    if (fromStart < seedDistance) {
      seedDistance = fromStart
      seed = index
    }
  }

  // Minimax flood constrained to ink. Every pixel's arrival has an earlier
  // parent inside the glyph: every prefix is connected, even at a crossing.
  // A small travel cost prevents a whole region popping in at a bottleneck.
  const arrival = new Float64Array(ink.length).fill(Infinity)
  const parents = new Int32Array(ink.length).fill(-1)
  const queue = new Queue()
  arrival[seed] = 0
  queue.push(seed, 0)
  while (queue.length) {
    const { index, time } = queue.pop()
    if (time !== arrival[index]) continue
    const x = index % width
    const neighbours = [index - width, index + width]
    if (x) neighbours.push(index - 1)
    if (x + 1 < width) neighbours.push(index + 1)
    for (const next of neighbours) {
      if (next < 0 || next >= ink.length || !ink[next]) continue
      const nextTime = Math.max(desired[next], time + 0.012)
      if (nextTime >= arrival[next]) continue
      arrival[next] = nextTime
      parents[next] = index
      queue.push(next, nextTime)
    }
  }
  let end = 0
  for (let i = 0; i < ink.length; i++) {
    if (!ink[i]) continue
    if (!Number.isFinite(arrival[i])) throw new Error('Disconnected glyph in reference')
    if (i !== seed && (parents[i] < 0 || arrival[parents[i]] > arrival[i])) throw new Error('Detached reveal pixel')
    end = Math.max(end, arrival[i])
  }
  const bands = Int16Array.from(arrival, (time, i) => ink[i] ? Math.min(frames - 1, Math.floor(time / end * frames)) : -1)

  // Vectorize the time bands. Neighbouring slices share exact pixel edges;
  // the component overlaps their masks slightly to remove antialiasing seams.
  const edges = Array.from({ length: frames }, () => new Map<number, number[]>())
  const stride = width + 1
  const edge = (band: number, from: number, to: number) => {
    const destinations = edges[band].get(from) || []
    destinations.push(to)
    edges[band].set(from, destinations)
  }
  for (let index = 0; index < ink.length; index++) {
    const band = bands[index]
    if (band < 0) continue
    const x = index % width
    const y = Math.floor(index / width)
    const a = y * stride + x
    if (y === 0 || bands[index - width] !== band) edge(band, a, a + 1)
    if (x + 1 === width || bands[index + 1] !== band) edge(band, a + 1, a + stride + 1)
    if (y + 1 === height || bands[index + width] !== band) edge(band, a + stride + 1, a + stride)
    if (x === 0 || bands[index - 1] !== band) edge(band, a + stride, a)
  }
  const slices: RevealSlice[] = []
  edges.forEach((boundary, band) => {
    let d = ''
    while (boundary.size) {
      const start = boundary.keys().next().value as number
      let cursor = start
      const ring: number[] = []
      do {
        ring.push(cursor)
        const destinations = boundary.get(cursor)!
        const next = destinations.pop()!
        if (!destinations.length) boundary.delete(cursor)
        cursor = next
      } while (cursor !== start)
      const corners = ring.filter((point, i) => {
        const before = ring[(i + ring.length - 1) % ring.length]
        const after = ring[(i + 1) % ring.length]
        return point - before !== after - point
      })
      corners.forEach((point, i) => {
        const x = (point % stride) / scale + 62
        const y = Math.floor(point / stride) / scale + 201
        if (!i) d += `M${x} ${y}`
        else if (point % stride === corners[i - 1] % stride) d += `V${y}`
        else d += `H${x}`
      })
      d += 'Z'
    }
    if (d) slices.push({ at: +(band / frames).toFixed(6), d })
  })
  console.log(`Reveal: ${slices.length} vector slices; every prefix connected; ${ink.reduce((sum, p) => sum + p, 0)} ink pixels`)
  return { slices, ink, bands, width, height, frames }
}
