---
title: 深入koa洋葱模型
date: 2022-10-18
---

[[toc]]

`koa` 最大的特点就是独特的中间件流程控制,也就是大名鼎鼎的“洋葱模型”。没图说个???
![img](/img/onion.png)

可以看到，一个箭头分两段贯穿洋葱模型，第一段一层层深入到洋葱的前半段的底部，也成为“葱心”，然后第二段从葱心一层层又“穿”出。  

好像这样讲也是挺难理解的喔，下面直接上 [koa-compose 源码](https://github.com/koajs/compose/blob/master/index.js) ，来分析一下好像很难的“洋葱模型”。
## 解析洋葱模型源码

```js
function compose (middleware) {
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }

  /**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */

  return function (context, next) {
    // last called middleware #
    let index = -1
    return dispatch(0)
    function dispatch (i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
```

就是这个 `compose` 函数了！除去前面的抛错代码，看似复杂的逻辑竟然就10多行代码！下面我们直接关注**核心逻辑**  
```js {22,23}
function compose (middleware) {
 // 返回一个闭包函数，返回 context 和 next 两个参数
  return function (context, next) {
    // 初始化index
    let index = -1
    // 从第一个中间件执行
    return dispatch(0)
    function dispatch (i) {
      // 在一个中间件执行两次 next 函数时,抛出异常
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      // 同上，通过闭包限制 next 在一个中间件中重复调用
      index = i
      // 根据 i 从 middleware 中取出对应中间件函数
      let fn = middleware[i]
      // 表示所有中间件执行完毕，fn = undefined，可以理解为让后面的逻辑截断做准备
      if (i === middleware.length) fn = next
      // fn 不存在直接 resolve
      if (!fn) return Promise.resolve()
      // fn 是用户传入函数，可能会有错误，需要try catch 捕获错误
      try {
        // 最核心环节，执行中间件函数，通过中间件函数中的next函数
        // 也就是调用自身dispatch（递归），去一个个执行下一个next函数
        // 执行到第一阶段最后，第二阶段依次执行栈顶函数，并弹出
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
      } catch (err) {
        // 捕获到错误，使用Promise.reject 返回错误
        return Promise.reject(err)
      }
    }
  }
}
```
可能你现在还是不怎么清楚，我们举个 🌰 来详细剖析
## 例子
```js
const m1 = async (context, next) => {
  console.log('in-1')
  await next()
  console.log('out-1', res)
};
const m2 = async (context, next) => {
  console.log('in-2')
  await next()
  console.log('out-2')
};
const m3 = async (context, next) => {
  console.log('in-3')
  await next()
  console.log('out-3')
};
compose([m1, m2, m3])()

//output
// in-1
// in-2
// in-3
// out-3
// out-2
// out-1
```
1. 执行 `compose` 函数，返回一个闭包函数  
2. 首先执行第一个中间件函数 `dispatch(0)`，也就是 `m1` ，打印 `in-1`  
3. 碰到 `next` 函数，继续执行 `dispatch(1)`，跳转到 `m2`， 打印 `in-2`  
4. 在 `m2` 中又碰到 `next` 函数， 继续执行 `dispatch(2)` ，跳转到 `m3`， 打印 `in-3`  
5. 继续执行 `dispatch(3)`  

至此，第一阶段已经结束，可以看看现在**上下文栈**执行的情况： 
| Stack        |
|------------- |
| dispatch(3)  |
| m3()         |
| dispatch(2)  |
| m2()         |
| dispatch(1)  |
| m1()         |
| dispatch(0)  |
| ~~compose~~  |

好，继续！  
6. `dispatch(3)` 执行完毕，从栈中弹出
7. 回到 `m3` ，执行剩余代码，打印 `out-3`  
8. `dispatch(2)` 执行完毕，从栈中弹出  
9. 回到 `m2`，执行剩余代码，打印 `out-2`  
10. `dispatch(1)` 执行完毕，从栈中弹出  
11. `回到`m1，执行剩余代码，打印`out-1`  
12. `dispatch(0)` 执行完毕，上下文栈清理完毕  
## 总结
1. 如果对**上下文执行栈**不是很了解的话，可以参考[执行上下文图解](https://www.jianshu.com/p/a6d37c77e8db)  
2. 如果对 **async await** 语法的执行机制不是很了解的话，可以参考这两篇文章：[async await 原理](https://juejin.cn/post/7007031572238958629) / [async/await 原理及执行顺序分析](https://juejin.cn/post/6844903988584775693)  

## 参考
[Koa 源码分析之洋葱模型](https://github.com/webfansplz/article/issues/10)
