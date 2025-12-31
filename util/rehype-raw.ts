import { visit } from 'unist-util-visit'

/**
 * 在 rehypePrettyCode 之前使用
 * 保存代码块的原始文本到 __rawString__ 属性
 */
export function rehypePreRaw() {
  return (tree: any) => {
    visit(tree, (node) => {
      if (node?.type === 'element' && node?.tagName === 'pre') {
        const [codeEl] = node.children
        if (codeEl?.tagName !== 'code') {
          return
        }
        // 获取代码文本
        let rawString = ''
        if (codeEl.children?.[0]?.type === 'text') {
          rawString = codeEl.children[0].value
        }
        // 存储到 pre 节点上
        node.__rawString__ = rawString
      }
    })
  }
}

/**
 * 在 rehypePrettyCode 之后使用
 * 将 __rawString__ 传递到 pre 元素的 properties，供复制按钮使用
 */
export function rehypePostRaw() {
  return (tree: any) => {
    visit(tree, (node) => {
      // 直接在 pre 元素上处理
      if (node?.type === 'element' && node?.tagName === 'pre') {
        // 如果 pre 节点上有 __rawString__，移动到 properties
        if (node.__rawString__) {
          node.properties['__rawString__'] = node.__rawString__
        }
      }
    })
  }
}

