import { defineConfig, s } from 'velite'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import process from 'process'

const cwd = process.cwd()

export default defineConfig({
  root: `${cwd}/posts`,
  collections: {
    posts: {
      name: 'Post',
      pattern: '**/*.mdx',
      schema: s.object({
        title: s.string(),
        date: s.isodate(),
        category: s.string(),
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
          raw: meta.content || ''
        }))
    }
  },
  mdx: {
    gfm: true,
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, {
        theme: 'vitesse-dark',
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