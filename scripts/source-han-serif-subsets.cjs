// The packaged subsets contain a 250–900 weight axis but omit its CSS descriptor.
module.exports = () => ({
  postcssPlugin: 'source-han-serif-subsets',
  Once(root) {
    const file = root.source?.input.file || ''
    if (!/[\\/]cn-fontsource-source-han-serif-sc-vf[\\/]font\.css$/.test(file)) return
    root.walkAtRules('font-face', face => {
      face.append({ prop: 'font-weight', value: '250 900' })
      face.walkDecls('font-display', display => { display.value = 'swap' })
    })
  }
})
module.exports.postcss = true
