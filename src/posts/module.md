---
title: JS 模块化
date: 2022-08-07
tech: JS
---

[[toc]]

介绍：  
当今主流的模块化方案主要有四种：

- AMD
- CMD
- CommonJS
- ESModule

`AMD/RequireJS` 规范能使浏览器异步加载模块，原则是**依赖前置**

`CMD/SeaJS` 规范和 AMD 规范类似，都用于浏览器环境的模块化加载，原则是**就近依赖**

`CommonJS` 规范主要用于**服务端编程**，由于它的同步加载机制导致的代码阻塞，并不适合浏览器环境，因此就有了 `AMD` 和 `CMD` 解决方案。

`ESModule` 是 **ES6 提供的**的模块化标准，关键字有 `import` 、`export` 、`exprot default` 、`as`、`from`

## 模块化的优点

- 可复用性高
- 代码可以解耦，更好维护
- 避免命名冲突（全局变量污染）
- 可异步加载模块，避免发送多个请求
- 依赖明确，不需要关注依赖引入的顺序问题

## AMD

`AMD` ，异步模块定义（Asynchronous Module Definition），它的特点是**依赖前置**，依赖必须在最先定义好，等到异步加载完成这些依赖后会**立刻执行**这些依赖代码。

```js
// 依赖必须一开始就写好
define(['./a', './b'], function (a, b) {
  a.doSomething()
  // 此处省去 100 行
  b.doSomething()
})
```

## CMD

`CMD` ，通用模块定义（Common Module Definition），它的特点是**就近依赖**，也就是什么时候 `require` ，就什么时候执行依赖代码。

```js
define(function (require, exports, module) {
  var a = require('./a')
  a.doSomething()
  // 此处省略 100 行
  var b = require('./b')
  b.doSomething()
  // ...
})
```

## AMD/CMD 区别

1、`AMD` 推崇**依赖前置**，在定义模块的时候就要声明其依赖的模块  
2、`CMD` 推崇**就近依赖**，只有在用到某个模块的时候再去 `require`

## CommonJS

`CommonJS` 模块中，通过 `require` 导入模块，通过 `exports/modeule.exports`来导出。

```js
// 导入
const sum = require('./add.js')
console.log(sum(2, 3)) // 5
```

```js
// 导出
module.exports = {
  sum
}
// 或
exports.sum = sum
```

其内在机制是将 `exports` 指向了 `module.exports` ，而 `module.exports` 在初始化时是一个空对象。我们可以简单地理解为，`CommonJS` 在每个模块的首部默认添加了以下代码：

```js
var module = {
  exports: {}
}
var exports = module.exports
```

此外 每个模块加载完成**一次**之后会被缓存，对于原始类型来说，在模块内修改导入的原始类型，被导入模块中的原始
类型是不会改变的，引用类型除外。也可以理解为每个模块在加载一次之后就会被缓存。

总结一下 `CommonJS` :  
优点：

- 每个文件都是一个模块实例，代码运行在**模块作用域**，不会污染全局作用域
- 文件内通过 `require` 对象引入指定模块，通过 `exports` 对象来向外暴漏 `API`，文件内定义的变量、函数，都是 私有 的，对其他文件不可见
- 每个模块加载一次之后就会被缓存
- 所有文件加载均是 同步 完成，加载的顺序，按照其在代码中出现的顺序
- 模块输出的是一个值的拷贝，修改模块内部的原始类型的值并不会改变模块内原始类型的值

缺点：

- 发送多个请求，模块同步加载，资源消耗和等待时间 ，适用于服务器编程
- 引入的 js 文件顺序不能搞错，否则会报错

## ESModule

ESModule 是 ES6 的模块化规范，它的特点是输出的是值的引用，脚本执行时，根据引用，到模块里面取值，若原始值变了，`import` 加载的值也会跟着变）。[基本语法](https://zh.javascript.info/import-export)：

```js
// export
export { sum, sub, div, mult }
// import
import { sum, sub, div, mult } from './math'
sum(2, 3)
sub(2, 3)
div(2, 3)
mult(2, 3)
```

觉得上面看着太冗余，可以使用这样的写法：

```js
// export
export { sum, sub, div, mult }
// import
import * as myMath from './math'
myMath.sum(2, 3)
myMath.sub(2, 3)
myMath.div(2, 3)
myMath.mult(2, 3)
```

## CommonJS 和 ESModule 区别

|          | CommonJS 模块                                                | ESModule                                             |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
|    关键字      | `require` `exports`                                          | `import、export、default、as、from`                          |
|    执行方式      | `require` 需要代码同步执行 - 不适合浏览器端                  | 异步                                                         |
| 输出     | 输出的是一个值的**拷贝**<br />（一旦输出一个值，模块内部的变化就影响不到这个值） | 输出的是**值的引用**<br />（动态引用，脚本执行时，再根据引用，到模块里面取值，若原始值变了，`import` 加载的值也会跟着变） |
| 时机     | **运行时加载**，加载的是 **整个模块 - 所有接口**，只有在 <u>脚本运行</u> 完才会生成 | **编译时输出** 接口，**可以单独加载某个接口**，在代码 <u>静态解析</u> 阶段就会生成 |
| 加载原理 | 一个模块就是一个脚本，`require` 命令第一次加载该脚本，就会执行整个脚本，然后在内存生成一个对象<br>以后需要用到这个模块的时候，就会到 `exports` 属性上面取值。也就是说，**不会再次执行该模块，而是到 缓存 之中取值，只会在第一次加载时运行一次** |

## 参考文章
[segmentfault - 前端模块化](https://segmentfault.com/a/1190000017466120)  
[blog - 前端模块化](https://codingwithalice.github.io/2020/03/17/%E9%9D%A2%E8%AF%95-AMD%E5%92%8CCMD%E5%8C%BA%E5%88%AB/)  
[掘金 - 前端模块化](https://juejin.cn/post/6844903469933920263)
