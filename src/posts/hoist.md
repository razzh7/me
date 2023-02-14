---
title: let 真的不提升吗？
date: 2023-02-14
tech: JS
---

## 前言
看到掘金上看到一些文章讨论 `let`，所以打算深入研究一下。

## 一个例子
```js
console.log(a) // undefined
var a = 1
```

用 `var` 声明的变量会 `Hoisting`，也就是变量提升，那如果把 `var` 变量换成 `let` 变量，代码执行就会报错：

```js
console.log(a)
let a = 1
// Uncaught ReferenceError: Cannot access 'a' before initialization
```
在报错中提到了 `initialization`，还记得我们经常碰到的变量未定义的报错吗？ `xx is not defined`。

为什么这里不会报“未定义”错误，而是说“初始化”错误？那什么是初始化？实际上 JS 是有一套**预编译的过程**，我们通过 `var` 和 `let` 在预编译中的表现说明一下为什么报错会是 `initialization` ，而不是 `not defined`。

先从 `var` 的角度切入：

```js
console.log(a)
var a = 1
```

在我们书写的代码中，JS 引擎并不是一开始就直接一行行执行代码，而是有一个预编译的环境，我们叫做 `GO` (全局上下文)，它会全局寻找 `var` 声明的变量，将它们提升到 `GO` 对象中，并给它们每一个赋值为 `undefined`，此时的 `GO`:

```js
GO {
  a: undefined
}
```
然后再执行我们的 JS 代码，`console.log(a)`，打印出 `GO` 中的 `undefined`。现在将 `var` 变量换成 `let` 变量，我们再看看：

```js
console.log(a)
var a = 1
```

这时在 JS 预编译的过程中，也会像我们刚刚那样，它会全局寻找 `let` 声明的变量，将它们提升到 `GO` 对象中，但它并不给 `let` 对象赋值为 `undefined`，而是什么都不做：

```js
GO {
  a: 
}
```

到这里，`let` 声明的变量 `a` 实际上已经被**提升**了全局的 `GO` 中，只不过**未初始化**，所以在后续执行 console.log 的时候会抛出 `Cannot access 'a' before initialization` 这个错误。

> [ECMA262](https://262.ecma-international.org/13.0/#sec-the-environment-record-type-hierarchy) 9.1章提到：If the binding exists but is uninitialized a ReferenceError is thrown, regardless of the value of S.

意译成中文：如果绑定应该没有完成**初始化**的值会抛出 ReferenceError 错误。

所以从严格意义上来讲，`let` 在它初始化(initialization)前的部分，是确实提升了。