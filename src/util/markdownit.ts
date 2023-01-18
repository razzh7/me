import MarkdownIt from 'markdown-it'
import Shiki from 'markdown-it-shiki'
import anchor from 'markdown-it-anchor'
import LinkAttributes from 'markdown-it-link-attributes'
// @ts-expect-error missing types
import TOC from 'markdown-it-table-of-contents'
import { slugify } from './slugify'
export default class Markdown {
  md: MarkdownIt
  constructor() {
    this.md = new MarkdownIt()
  }

  render(content: string) {
    return this.md.render(content)
  }

  setTheme() {
    this.md.use(Shiki, {
      highlightLines: true,
      theme: {
        light: 'vitesse-light',
        dark: 'vitesse-dark'
      }
    })
  }

  setLinkOpen() {
    this.md.use(LinkAttributes, {
      matcher: (link: string) => /^https?:\/\//.test(link),
      attrs: {
        target: '_blank',
        rel: 'noopener'
      }
    })
  }

  setAnchor() {
    this.md.use(anchor, {
      slugify,
      permalink: anchor.permalink.linkInsideHeader({
        symbol: '#',
        renderAttrs: () => ({ 'aria-hidden': 'true' })
      })
    })
  }

  setTableContent() {
    this.md.use(TOC, {
      includeLevel: [1, 2, 3],
      slugify
    })
  }
}
