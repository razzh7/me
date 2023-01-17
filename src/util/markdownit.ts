import MarkdownIt from 'markdown-it'
import Shiki from 'markdown-it-shiki'

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
    const defaultRender =
      this.md.renderer.rules.link_open ||
      function (tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options)
      }

    this.md.renderer.rules.link_open = function (tokens: any, idx, options, env, self) {
      // If you are sure other plugins can't add `target` - drop check below
      const aIndex = tokens[idx].attrIndex('target')

      if (aIndex < 0) {
        tokens[idx].attrPush(['target', '_blank']) // add new attribute
      } else {
        tokens[idx].attrs[aIndex][1] = '_blank' // replace value of existing attr
      }

      // pass token to default renderer.
      return defaultRender(tokens, idx, options, env, self)
    }
  }
}
