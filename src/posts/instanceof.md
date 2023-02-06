---
title: instanceof 实现
date: 2022-08-18
tech: JS
---



[instanceof](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof) 是用于检测对象的原型链上是否与检测函数的 `prototype` 原型是否是**同一引用**。  
 那么是不是我在一个对象的 `__proto__` 上指向检测函数的 `prototype` ，那么经过 `instanceof` 检测之后是否就会返回 `true` 了呢？那我们来试试：

```js
function mine() {}
mine.prototype.name = 'razzh'

var obj = {}
obj.__proto__ = mine.prototype

console.log(obj instanceof mine) // true
```

可以看到上述结果返回了 `true` 证实了这个猜想，接下来就依据它来实现一下 `instanceof` 。

## 实现

思路：  
1、获取检测对象的原型链  
2、循环对象的原型链与函数的原型进行全等对比，若符合 if 分支条件则返回 true，反之 false

```js
fucntion _myInstanceof(target, origin) {
  if (typeof target !== 'object') throw Error('target must be Object')
  if (typeof origin !== 'function') throw Error('origin must be origin')

  let proto = Object.getPrototypeOf(target) // 相当于 proto = target.__proto__
  while (proto) {
    if (proto === origin.prototype) return true
    proto = Object.getPrototypeOf(proto.prototype)
  }
  return false
}
```