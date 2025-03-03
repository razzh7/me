'use client'
import { useState, useEffect, useRef, useMemo } from 'react'
import { useWindowSize } from 'react-use'
import styles from '@/styles/plum.module.css'
import clsx from 'clsx'
import { useRafFn } from '@/hooks/useRafFn'
import { usePathname } from 'next/navigation'

type Fn = () => void

const Plum = () => {
  const pathname = usePathname()
  const size = useWindowSize()
  const r180 = Math.PI
  const r90 = Math.PI / 2
  const r15 = Math.PI / 12
  const MIN_BRANCH = 30
  const color = '#88888825'

  const { random } = Math
  const [mouted, setMouted] = useState(false)
  const start = useRef<Fn>()
  const len = useRef(6)
  const stopped = useRef(false)

  const el = useRef<HTMLCanvasElement | null>(null)

  const initCanvas = (canvas: HTMLCanvasElement, width = 400, height = 400, _dpi?: number) => {
    // eslint-disable-next-line
    const ctx = canvas.getContext('2d')!

    const dpr = window.devicePixelRatio || 1
    const bsr =
      // @ts-expect-error vendor
      ctx.webkitBackingStorePixelRatio ||
      // @ts-expect-error vendor
      ctx.mozBackingStorePixelRatio ||
      // @ts-expect-error vendor
      ctx.msBackingStorePixelRatio ||
      // @ts-expect-error vendor
      ctx.oBackingStorePixelRatio ||
      // @ts-expect-error vendor
      ctx.backingStorePixelRatio ||
      1

    const dpi = _dpi || dpr / bsr

    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    canvas.width = dpi * width
    canvas.height = dpi * height
    ctx.scale(dpi, dpi)

    return { ctx, dpi }
  }

  const polar2cart = (x = 0, y = 0, r = 0, theta = 0) => {
    const dx = r * Math.cos(theta)
    const dy = r * Math.sin(theta)
    return [x + dx, y + dy]
  }

  let steps: Fn[] = []
  let prevSteps: Fn[] = []

  let lastTime = performance.now()
  const interval = 1000 / 40
  // eslint-disable-next-line
  let controls: ReturnType<typeof useRafFn>
  const frame = () => {
    if (performance.now() - lastTime < interval) return
    prevSteps = steps
    steps = []
    lastTime = performance.now()
    if (!prevSteps.length) {
      controls.pause()
      stopped.current = true
    }

    // Execute all the steps from the previous frame
    prevSteps.forEach(i => {
      // 50% chance to keep the step for the next frame, to create a more organic look
      if (random() < 0.5) {
        steps.push(i)
      } else {
        i()
      }
    })
  }
  controls = useRafFn(frame)
  const renderPages = ['/', '/posts/', '/books/', '/projects/']
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const isRender = useMemo(() => renderPages.includes(pathname), [pathname])
  const fn = async () => {
    if (!isRender && mouted) {
      setMouted(false)
      return
    }
    if (el.current === null) return
    const canvas = el.current
    const { ctx } = initCanvas(canvas, size.width, size.height)
    const { width, height } = canvas

    const step = (x: number, y: number, rad: number, counter: { value: number } = { value: 0 }) => {
      const length = random() * len.current
      const [nx, ny] = polar2cart(x, y, length, rad)
      counter.value += 1
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(nx, ny)
      ctx.stroke()
      const rad1 = rad + random() * r15
      const rad2 = rad - random() * r15

      // out of bounds
      if (nx < -100 || nx > size.width + 100 || ny < -100 || ny > size.height + 100) return

      const rate = counter.value <= MIN_BRANCH
        ? 0.8
        : 0.5

      // left branch
      if (random() < rate) {
        steps.push(() => step(nx, ny, rad1, counter))
      }

      if (random() < rate) {
        steps.push(() => step(nx, ny, rad2, counter))
      }
    }

    /**
   * 0.2 - 0.8
   */
    const randomMiddle = () => random() * 0.6 + 0.2

    start.current = () => {
      controls.pause()
      ctx.clearRect(0, 0, width, height)
      ctx.lineWidth = 1
      ctx.strokeStyle = color
      prevSteps = []
      steps = [
        () => step(randomMiddle() * size.width, -5, r90),
        () => step(randomMiddle() * size.width, size.height + 5, -r90),
        () => step(-5, randomMiddle() * size.height, 0),
        () => step(size.width + 5, randomMiddle() * size.height, r180)
      ]
      if (size.width < 500) steps = steps.slice(0, 2)
      controls.resume()
      stopped.current = false
    }
    start.current()
  }

  useEffect(() => {
    fn()
    // eslint-disable-next-line
  }, [pathname])

  return isRender ? (
    <div className={clsx(styles.plum, styles.mask_image)}>
      <canvas ref={el} width="400" height="400" />
    </div>
  ) : null
}

export default Plum
