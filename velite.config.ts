import { defineConfig, defineCollection, s } from 'velite'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import process from 'process'
import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { remark } from 'remark'
import { visit } from 'unist-util-visit'

const cwd = process.cwd()
const introCharacters = new RegExp(String.raw`[\p{Script=Han}\u3000-\u303f\uff01-\uff60\u2014\u201c\u201d\u2026]`, 'gu')

function introFont(title: string, markdown: string) {
  let text = title
  for (const block of remark().parse(markdown).children) {
    if (block.type === 'code' || text.length >= 400) break
    visit(block, 'text', node => { text += node.value })
  }
  const glyphs = Array.from(new Set(text.slice(0, Math.max(title.length, 400))
    .match(introCharacters))).sort().join('')
  if (!glyphs) return null
  const id = createHash('sha256').update('intro-v1:' + glyphs).digest('hex').slice(0, 20)
  return { id, glyphs }
}

const schema = s.object({
  title: s.string(),
  date: s.isodate(),
  updatedTime: s.isodate().optional(),
  toc: s.boolean().default(true),
  link: s.string().optional(),
  preview: s.boolean().optional(),
  publish: s.boolean().default(true),
  body: s.mdx()
})
  .transform((data, { meta }) => ({
    ...data,
    slug: meta.basename!.replace(/\.mdx$/, ''),
    introFont: introFont(data.title, meta.content || ''),
    raw: meta.content || ''
  }))

const posts = defineCollection({
  name: 'Post',
  pattern: 'posts/**/*.mdx',
  schema
})

const memoirs = defineCollection({
  name: 'Memoirs',
  pattern: 'memoirs/**/*.mdx',
  schema
})

export default defineConfig({
  root: `${cwd}/content`,
  prepare({ posts, memoirs }) {
    const missing = [...posts, ...memoirs].filter(post => post.publish)
      .map(post => post.introFont).filter(font => font && !existsSync(`public/fonts/intro/${font.id}.woff2`))
    if (missing.length) {
      execFileSync('uv', ['run', '--script', 'scripts/build-intro-fonts.py'], {
        input: JSON.stringify(missing), stdio: ['pipe', 'inherit', 'inherit']
      })
    }
  },
  collections: {
    posts,
    memoirs
  },
  mdx: {
    gfm: true,
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, {
        theme: {
          dark: 'vitesse-dark',
          light: {
            name: 'shittori-light',
            type: 'light',
            colors: { 'editor.background': '#f2eee4', 'editor.foreground': '#2b2926' },
            tokenColors: [
              { scope: ['keyword', 'storage', 'entity.name.tag', 'support.type'], settings: { foreground: '#42602d' } },
              { scope: ['string', 'entity.other.attribute-name'], settings: { foreground: '#8a4b2d' } },
              { scope: ['constant.numeric', 'constant.language'], settings: { foreground: '#7d5f16' } },
              { scope: ['entity.name.function', 'entity.name.type', 'support.function'], settings: { foreground: '#1f5a73' } },
              { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: '#857d70' } }
            ]
          }
        },
        transformers: [
          {
            name: 'preserve-raw-string',
            // 在代码块处理时，将原始代码存储到 pre 元素的属性上
            pre(node: any) {
              node.properties['data-raw-string'] = (this as any).source
            }
          }
        ]
      }],
      [rehypeAutolinkHeadings, {
        properties: {
          className: ["subheading-anchor"],
          ariaLabel: "Link to section"
        }
      }]
    ]
  }
})
