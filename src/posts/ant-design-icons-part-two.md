---

title: Ant-Design-Icons 的生成之旅(下)

date: 2023-10-26

tech: JS

---

[[toc]]

## 背景

在[上文](https://kanmalu.com/blog/ant-design-icons-part-one/)中，我们已经看到了 `Icons Ast` 的生成过程，这篇文章讲述的是生成入口文件和将优化后的 SVGAST 转换成 SVG 文件的过程。

## Icons 入口文件生成
代码还是位于 [gulpfile.ts](https://github.com/ant-design/ant-design-icons/blob/master/packages/icons-svg/gulpfile.ts) 入口文件中：

```ts
// 3.1 generate entry file: src/index.ts
generateEntry({
  entryName: 'index.ts',
  from: ['src/asn/*.ts'],
  toDir: 'src',
  banner: '// This index.ts file is generated automatically.\n',
  template: `export { default as <%= identifier %> } from '<%= path %>';`,
  mapToInterpolate: ({ name: identifier }) => ({
    identifier,
    path: `./asn/${identifier}`
  })
})
```

作者封装了一个函数，用于将 src下的 `asn` (Abstract Node)文件生成导出文件 index.ts，进到方法里面看看：

```ts
export const generateEntry = ({
  from,
  toDir,
  template,
  mapToInterpolate,
  entryName,
  banner = ''
}: GenerateEntryOptions) =>
  function GenerateEntry() {
    return src(from)
      .pipe(
        useTemplate({
          template,
          mapToInterpolate
        })
      )
      .pipe(concat(entryName))
      .pipe(header(banner))
      .pipe(dest(toDir));
  };
```
总的来说使用了 useTemplate 函数来渲染传入的模版，并使用 gulp-concat 插件，将 pipe 中的文件合成到 index.ts 中，再使用 gulp-header 插件，将 banner 添加到文件的开头，最后使用 dest 方法将处理后的 index.ts 文件将输出到 src 目录下。

## AST To SVG File

```ts
// 3.2 generate inline SVG files
generateInline({
  from: ['src/asn/*.ts'],
  toDir: ({ _meta }) => `inline-svg/${_meta && _meta.theme}`,
  getIconDefinitionFromSource: (content: string): IconDefinition => {
    const extract = ExtractRegExp.exec(content);
    if (extract === null || !extract[1]) {
      throw new Error('Failed to parse raw icon definition: ' + content);
    }
    return new Function(`return ${extract[1]}`)() as IconDefinition;
  }
}),
// 3.3 generate inline SVG files with namespace
generateInline({
  from: ['src/asn/*.ts'],
  toDir: ({ _meta }) => `inline-namespaced-svg/${_meta && _meta.theme}`,
  getIconDefinitionFromSource: (content: string): IconDefinition => {
    const extract = ExtractRegExp.exec(content);
    if (extract === null || !extract[1]) {
      throw new Error('Failed to parse raw icon definition: ' + content);
    }
    return new Function(`return ${extract[1]}`)() as IconDefinition;
  },
  renderOptions: {
    extraSVGAttrs: { xmlns: 'http://www.w3.org/2000/svg' }
  }
})
```

之后生成 SVG 文件，看到这里其实还是有点好奇作者为啥这么做？因为我看到源码中已经有了 SVG 文件夹，但是我想了一下，作者之前使用 `SVGO` 对 SVG 文件夹下 的SVG 文件进行了`optimize` (优化)处理，所以需要让优化后的 SVGAST 重新渲染生成 SVG 文件，或许作者就是这样的出发点去编写的这段代码吧。

仔细观察它们传入的参数只有 `renderOptions` 不同，这一点作者也给出了注释，是专门为了生成 SVG 的命名空间的，关于命名空间的作用可能是为了更好的兼容浏览器的解析器，避免出现不必要的错误。

```ts
export const generateInline = ({
  from,
  toDir,
  getIconDefinitionFromSource,
  renderOptions = {}
}: GenerateInlineOptions) =>
  function GenerateInline() {
    return src(from)
      .pipe(
        useRender({
          getIconDefinitionFromSource,
          renderOptions
        })
      )
      .pipe(dest(toDir));
  };
```

主要是使用了 `useRender` 函数对 src/ans/.ts 文件做处理：

```ts
export const useRender = ({
  getIconDefinitionFromSource,
  renderOptions
}: RenderOptions) =>
  createTrasformStream((content, file) => {
    const def = getIconDefinitionFromSource(content);
    file.extname = '.svg';
    file.stem = def.name;
    file._meta = {
      theme: def.theme
    } as RenderCustomData;
    return renderIconDefinitionToSVGElement(def, renderOptions);
  });
```
由于 `content` 是一个 SVGAST 字符串，所以需要使用 getIconDefinitionFromSource 函数中利用正则 `/({\s*".*});/` ，去匹配 “{"icon": {...}}”, 这样的内容，这个函数中有一个细节就是正则匹配到的是一个 String 类型的字符串，而我们需要的是对象类型的 SVGAST，作者使用了new Function 构造出了一个 SVGAST 对象，再使用 `renderIconDefinitionToSVGElement` 方法进行 **AST to SVG** 的操作。

```ts
function renderAbstractNodeToSVGElement(
  node: AbstractNode,
  options: HelperRenderOptions
): string {
  const targetAttrs =
    node.tag === 'svg'
      ? {
          ...node.attrs,
          ...(options.extraSVGAttrs || {})
        }
      : node.attrs;
  const attrs = Object.keys(targetAttrs).reduce((acc: string[], nextKey) => {
    const key = nextKey;
    const value = targetAttrs[key];
    const token = `${key}="${value}"`;
    acc.push(token);
    return acc;
  }, []);
  const attrsToken = attrs.length ? ' ' + attrs.join(' ') : '';
  const children = (node.children || [])
    .map((child) => renderAbstractNodeToSVGElement(child, options))
    .join('');

  if (children && children.length) {
    return `<${node.tag}${attrsToken}>${children}</${node.tag}>`;
  }
  return `<${node.tag}${attrsToken} />`;
}
```

这段代码比较长，总的来说就是通过递归将传入的 SVGAST 对象拼接成 SVG 字符串，并返回，再通过 dest 方法输出到各自的目录中。

## 最后
最后其实我在读源码的过程中经常能看到 `refactor` 的字样，`4.x`是作者从`2.x`版本的重构而来的，所以我把分支切换到2.x看到整体的源码是使用 `rxjs` 编写，好奇为什么要在稳定版本的代码上重构呢？最后在 [Issue](https://github.com/ant-design/ant-design-icons/issues/104) 找到了答案。
![img](/img/icons1.png)
这个重构的变动之一主要是为了优化 [Issue](https://github.com/vueComponent/ant-design-vue/issues/1109) 而做的按需导入，我看了一下`2.x`版本打包出来的 `lib` 文件夹
![img](/img/icons2.png)
其中 `dist.js` 和 `manifest.js` ，在新版本的 `4.x` 都被剔除了，并新增了用于 `tree-shaking` 的 `es` 目录，都是为了减少打包后的体积而做的改变。
为什么从 `rxjs` 转变到 `gulp`？作者也给出了答案：
![img](/img/icons3.png)
这样，我的 Ant-Design-Icons 的源码之旅也要结束了，研究完源码之后我觉得作者对每个函数的封装都恰到好处，函数式编程非常优雅，源码是值得借鉴和欣赏的，谢谢作者 [HeskeyBaozi](https://github.com/HeskeyBaozi) 的贡献，让我学到很多东西。