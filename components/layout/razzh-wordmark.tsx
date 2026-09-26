'use client'

import styles from '@/styles/razzh-wordmark.module.css'
import { useId } from 'react'
import { RAZZH_OUTLINE, RAZZH_REVEAL, RAZZH_REVEAL_STEPS } from './razzh-wordmark-paths'
import { getWordmarkTiming, WORDMARK_CYCLE_MS } from './razzh-wordmark-timing'

// Each slice can only appear after it has a connection to the written ink.
// The generated mask follows the pen inside the original filled outline.
// This avoids broad stroke masks crossing counters or revealing neighbours.
const slices = RAZZH_REVEAL.map(({ d, at }) => ({ d, timing: getWordmarkTiming(at, RAZZH_REVEAL_STEPS) }))

export default function RazzhWordmark() {
  const maskId = `razzh-${useId().replace(/:/g, '')}`

  return (
    <svg
      className={styles.wordmark}
      viewBox="62 201 433 172"
      width="48"
      height="48"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Razzh"
    >
      <title>Razzh @ razzh.cn</title>
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="62" y="201" width="433" height="172" style={{ maskType: 'luminance' }}>
          {slices.map(({ d, timing }, i) => (
            <path
              key={i}
              className={styles.slice}
              style={{ animationTimingFunction: timing, animationDuration: `${WORDMARK_CYCLE_MS}ms` }}
              d={d}
              fill="white"
              fillRule="evenodd"
              stroke="white"
              strokeWidth="3"
              strokeLinejoin="round"
            />
          ))}
        </mask>
      </defs>
      <path className={styles.ink} d={RAZZH_OUTLINE} fill="currentColor" fillRule="evenodd" mask={`url(#${maskId})`} />
    </svg>
  )
}
