---
title: this指向总结
date: 2022-07-10
---

[[toc]]

`this` 指向在[《你不知道的 JavaScript》](https://book.douban.com/subject/26351021/)上卷中花了很大篇幅去介绍，可见它对开发者的重要性，本文就根据《你不知道的 JavaScript》来做 `this` 指向总结。

## this 指向的特性 {#character}
`this` 指向的位置与**函数执行时的上下文**相关，来看具体例子。
## 默认绑定
```js
function foo() {
  console.log(this.a)
}
var a = 2
foo() // 2
```
默认绑定指的是函数**独立调用**。 

在非严格模式下，函数在**单独调用时**，`this` 指向 `window` 全局对象。  
严格模式下，`this` 将指向 `undefined`。

## 隐式绑定 {#stealth}
```js
function foo() {
  console.log(this.a)
}
var obj = {
  a: 2,
  foo: foo
}
var a = 3
obj.foo() // 2
```
隐式绑定是指函数调用的位置是否有上下文对象，或者说是否被某个对象拥有或者包含。  

在 `foo` 函数被调用时，它前面加上了对 `obj` 的引用，当函数引用上下文对象时，隐式绑定规则会把函数调用中的 `this` 绑定到这个上下文对象。因为调用的 `foo()` 时 `this` 被绑定到 `obj`，因此 `this.a` 和 `obj.a` 是一样的。

## 对象嵌套 {#nested}
```js
function foo() {
  console.log(this.a)
}

var obj2 = {
  a: 42,
  foo: foo
}

var obj1 = {
  a: 2,
  obj2: obj2
}

obj1.obj2.foo() // 42
```
对象属性引用链中只有上一层或者说是最后一层在函数调用位置中起作用。

## 隐式丢失 {#loss}
```js
function foo() {
  console.log(this.a)
}

var obj = {
  a: 2,
  foo: foo
}

var bar = obj.foo
var a = 'oops, global'
bar() // 'oops, global'
```
虽然 `bar` 是 `obj.foo` 的一个引用，但实际上，它引用的是 `foo` 函数本身在堆中的内存地址，因此此时的 `bar()` 其实是一个不带任何修饰的函数调用，因此应用了**默认绑定**。

一种变相的情况：
```js
function foo() {
  console.log(this.a)
}

function doFoo(fn) {
  // fn 其实引用的是 foo
  fn() // 调用的位置
}

var obj = {
  a: 2,
  foo: foo
}

var a = "oops, global"
doFoo(obj.foo) // "oops, global"
```
在执行 `doFoo` 函数时传入 `obj.foo`，在 `doFoo` 函数在预编译阶段实际上会执行 `fn = obj.foo` 这样的操作，所以参数传递其实就是一种**隐式赋值**，所以结果就是在单独执行 `foo（）` 函数，应用默认指向，所以 `this` 指向全局 `window` 全局对象。

## 显式绑定 {#obvious-bind}
1. 硬绑定  

可以通过 `call`、`apply`、`bind` 等函数改变 `this` 指向。  

2. API调用的上下文  
```js {12}
function foo(el) {
  console.log(el, this.id)
  // 1 'awesome' 
  // 2 'awesome' 
  // 3 'awesome' 
}

var obj = {
  id: 'awesome',
}
var arr = [1, 2, 3]
arr.forEach(foo, obj)
```
一些原生方法中，可以通过传入参数的方式改变 `this` 指向，如果不传，默认指向的是 `window` 全局对象。

## new 绑定 {#new-bind}
```js
function foo(a) {
  this.a = a
}

var bar = new foo(2)
console.log(bar.a) // 2
```
在使用 `new` 关键字来调用函数，或者说发生构造函数调用时，会自动执行下面的操作。
- 创建一个全新对象
- 新对象的 `__proto__` 会被挂上构造函数的 `prototype`
- 使用 `call` 来执行 `new` 之后的构造函数，将其指向新创建的对象上
- 返回函数执行结果或返回创建的对象

## this 指向优先级 {#priority}
显式绑定 > 隐式绑定
```js
function foo() {
  console.log(this.a)
}

var obj1 = {
  a: 2,
  foo: foo
}

var obj2 = {
  a: 3,
  foo: foo
}

obj1.foo() // 2
obj2.foo() // 3

obj1.foo.call(obj2) // 3
obj2.foo.call(obj1) // 2
```
可以看到，显式绑定优先级更高。  

`new` 绑定 > 隐式绑定  
```js {18,19}
function foo(something) {
  this.a = something
}

var obj1 = {
  foo: foo
}

var obj2 = {}

obj1.foo(2)
console.log(obj1.a) // 2

obj1.foo.call(obj2, 3)
console.log(obj2.a) // 3

var bar = new obj1.foo(4)
console.log(obj1.a) // 2
console.log(bar.a) // 4
```
可以看到 `new` 绑定的优先级比隐式绑定优先级高

`new` 绑定和显式绑定的对比
```js {15}
function foo(something) {
  this.a = something
}

var obj1 = {}

var bar = foo.bind(obj1)
bar(2)
console.log(obj1.a) // 2

obj1.foo.call(obj2, 3)
console.log(obj2.a) // 3
var baz = new bar(3)
console.log(obj1.a) // 2
console.log(baz.a) // 3
```
在最后一行可以看到，硬绑定的 `this` 指向被改变了 `new` 绑定改变了。所以 `new` 绑定的 `this` 指向是大于硬性绑定的 `this` 指向的。  
## 被忽略的 this {#ignore-this}
如果把 `null` 或 `undefined` 作为 `this` 的绑定对象传入 `call`、`apply` 或者 `bind`，这些值在调用时会被忽略，实际应用的是**默认绑定**规则：  
```js
function foo() {
  console.log(this.a)
}
var a = 2
foo.call(null) // 2
```
那么什么情况会传入 `null` 作为参数呢？  

一种非常常见的做法是 `apply` 来展开一个数组，并当作参数传入一个函数。
类似地，`bind(...)` 可以对参数进行**柯里化**（预先设置一些参数），这种方法有时非常有用：
```js
function foo(a, b) {
  console.log("a:" + a + ",b:" + b)
}

// 把数组“展开”成参数

foo.apply(null, [2, 3]) // a:2, b:3

// 使用 bind(...) 进行柯里化
var bar = foo.bind(null, 2)
bar(3) // a:2, b:3
```

## 间接引用 {#indirect}
```js
function foo() {
  console.log(this.a)
}
var a = 2
var o = { a: 3, foo: foo }
var p = { a: 4 }

o.foo() // 3
(p.foo = o.foo)() // 2
```
赋值表达式 `p.foo = o.foo` 的返回值是目标函数的引用，因此调用位置是 `foo()` 而不是 `p.foo()` 或者 `o.foo()`。也就是我们之前说的**隐式丢失**，它会应用**默认绑定**（在严格模式下 `this` 指向会被绑定到全局对象。

## 箭头函数 this 指向 {#arrow-function}
箭头函数的 `this` 指向是根据外层（函数或者全局）作用域来决定 `this`。来看一个普通函数的例子：
```js
var name = 'window'; // 其实是window.name = 'window'

var A = {
   name: 'A',
   sayHello: function(){
      console.log(this.name)
   }
}

A.sayHello() // 输出 A

var B = {
  name: 'B'
}

A.sayHello.call(B) // 输出 B

A.sayHello.call() // window
```
从上面可以看到：  
- 第一条应用了**隐式绑定**规则，`this` 指向 对象 `A`。
- 第二条应用了**硬绑定**规则，将 `this` 指向 `B` 对象
- 第二条应用了**硬绑定**规则，但没有将对象传入 `call` 中，`this` 默认指向 `window`  

同样的例子，我们来看看箭头函数的 `this` 指向：
```js
var name = 'window'; 

var A = {
   name: 'A',
   sayHello: () => {
      console.log(this.name)
   }
}

A.sayHello();// 还是以为输出A ? 错啦，其实输出的是 window
```
箭头函数的 `this` 指向由**函数所在的作用域**来决定。这里的箭头函数，也就是 `sayHello`，所在的作用域其实是最外层的 `JS` 环境，因为没有其他函数包裹；然后最外层的 `JS` 环境指向的对象是 `winodw` 对象，所以这里的 `this` 指向的是 `window` 对象。

## 总结 {#summary}
如果要判断一个运行中函数的 `this` 绑定，就需要找到这个函数的直接调用位置。找到之后就可以顺序应用下面这四条规则来判断 `this` 的绑定对象。
1. 由 `new` 调用？`this` 绑定到新创建的对象  
2. 由 `call` 或者 `apply` (或者 `bind`)调用？`this` 绑定到指定对象  
3. 由上下文对象调用？`this` 绑定到那个上下文对象  
4. 默认：在严格模式下绑定到 `undefined`，否则 `this` 绑定到全局对象
