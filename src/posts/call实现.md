---
title: call实现
date: 2022-08-19
---

实现思路：将想要改变的 `this` 指向的函数放入指向的对象（`context`）中

首先考虑一下这样的实现方式：

```js
Function.prototype.myCall = function (context) {
  const args = [...arguments].slice(1)
  context = context || window
  context.fn = this
  const res = context.fn(...args)
  delete context.fn

  return res
}
```

我们来测试一下上面这段代码：

```js {8}
let a = 1
let bar = {
  a: 2,
  fn() {}
}

function fn() {
  console.log(this.a) // 2
}

fn.myCall(bar)
console.log(bar) // {a: 2}
```

我们可以看到函数 `fn` 的 `this` 已经指向 `obj`，但是 `bar` 中的 `fn` 函数被删除了！

这是因为我们将 `fn` 挂载到 `bar` 上，但 `bar` 本来就有 `fn` 函数，因为被覆盖后被 `delete` 删除，这污染了 `bar` 的变量。所以我们可以使用 `Symbol` 创建一个唯一（`unique`）的变量，来确保不会对 `bar` 对象造成影响。`call` 代码实现如下：

```js
Function.prototype.myCall = function (context) {
  const args = [...arguments].slice(1) // 获取函数形参
  const fn = Symbol() // 防止context上存在同名的fn属性，执行完后会将其删除，污染对象变量
  context = context || window // 获取指向的对象
  context[fn] = this // 将想要改变的 this 指向的函数放入指向的对象中
  const res = context[fn](...args) // 执行函数，此时 this 指向 context 对象
  delete context[fn] // 删除对象中的函数

  return res
}
```

我们再来测试一下：

```js
let a = 1
let bar = {
  a: 2,
  fn() {}
}

function fn() {
  console.log(this.a) // 2
}

fn.myCall(bar)
console.log(bar) // { a: 2, fn: [Function: fn] }
```

可以看到执行 `myCall`后，并没有对 `bar` 中的 `fn` 的函数影响，`this` 的指向也已经指向了 `bar`。
