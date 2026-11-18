'use client'

import { preload } from 'react-dom'

export default function ArticleIntroFont({ id, glyphs }: { id: string, glyphs: string }) {
  const url = `/fonts/intro/${id}.woff2`
  preload(url, { as: 'font', crossOrigin: 'anonymous' })
  const range = Array.from(glyphs, char => 'U+' + char.codePointAt(0)!.toString(16)).join(',')
  return <style>{`
    @font-face {
      font-family: Intro-${id};
      src: url(${url});
      font-weight: 250 900;
      font-display: optional;
      unicode-range: ${range};
    }
    .intro-${id} { --article-font: Intro-${id}, var(--article-base-font); }
  `}</style>
}
