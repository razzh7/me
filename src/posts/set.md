---
title: Vue.set
date: 2022-09-17
---



由于 JavaScript 的限制，Vue 不能检测数组和对象的变化。尽管如此还是有一些办法来回避这些限制并保证它们的响应性，那就是 `Vue.set`。  

实际上 Vue 也可以使用 `Object.defineProperty` 来做到对数组的监听，但是出于[性能考虑](https://github.com/vuejs/vue/issues/8562) ，Vue 没有选择这个做法。

## 实际应用 {#application}

```javascript
var vm = new Vue({
  el: '#app',
  template: '<div @click="addItem">{{list}}</div>',
  data: {
    list: [1, 2, 3]
  },
  methods: {
    addItem() {
      this.list[0] = 'a'
    }
  }
})
```

上述代码点击 `div` 之后会将 `list` 中的第一位索引换成 `a` 字符，打印一下 `vm._data`  

![img](/img/vuesetimg.png)

已经可以看到这个时候 `list` 中的第一项已经变成了 `a`，但是这个时候页面视图却没有刷新，所以这个时候 `$set` 就该登场了:

```javascript
var vm = new Vue({
  el: '#app',
  template: '<div @click="addItem">{{list}}</div>',
  data: {
    list: [1, 2, 3]
  },
  methods: {
    addItem() {
      this.$set(this.list, 0, 'a')
    }
  }
})
```

这个时候点击 `div` 页面视图也随之更新为`['a', 2, 3]`。  

顺着这个思路，我想到在生命周期 `created` 中通过下标修改数组的值，那么此时视图会变吗？

```javascript
var vm = new Vue({
  el: '#app',
  template: '<div>{{list}}</div>',
  data: {
    list: [1, 2, 3]
  },
  created() {
    this.list[0] = 'a'
  }
})
```

这段代码执行完毕时，这个时候视图竟然跟着更新了！😅 奇怪了，不是说**由于 JS 限制，Vue 不能检测到数组通过索引来修改 data 中值**的情况吗？What happen ？  


> 解释：由于 `created` 阶段 `data` 数据已经初始化完成，可以修改其数据，以至于到后面的渲染函数拿到的也是修改后的 `list:['a' ,2 ,3]`，所以渲染的时候并不是视图发生了更新变化，而是第一次 `render` 拿到的 `list` 已经是修改后的数据，这样也就解释得通了。

## set 源码 {#source}

::: details 点击展开 Code

```js
function set(target, key, val) {
  if (process.env.NODE_ENV !== 'production' && (isUndef(target) || isPrimitive(target))) {
    warn(`Cannot set reactive property on undefined, null, or primitive value: ${target}`)
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key)
    target.splice(key, 1, val)
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val
    return val
  }
  const ob = target.__ob__
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' &&
      warn(
        'Avoid adding reactive properties to a Vue instance or its root $data ' +
          'at runtime - declare it upfront in the data option.'
      )
    return val
  }
  if (!ob) {
    target[key] = val
    return val
  }
  defineReactive(ob.value, key, val)
  ob.dep.notify()
  return val
}
```

:::
我们可以看到，除去开发环境下的报错提示也就 10 多行代码...，下面我们来关注核心逻辑

## 数组处理 {#array}

```js
function set(target, key, val) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key)
    target.splice(key, 1, val)
    return val
  }
  // ... ignore
}
```

通过 `Array.isArray` 来判断 `target` 是否是数组，并验证 `key` 是否是数组下标，可能你会对 `splice` 之前对 `target.length` 赋值的操作感到困惑，这里举一个小 🌰

```js
var key = 5
var arr1 = [1, 2, 3]
arr1.splice(key, 1, 666)
console.log(arr1) // [1, 2, 3, 666]

var arr2 = [1, 2, 3]
arr2.length = key
arr2.splice(key, 1, 666)
console.log(arr2) // [1, 2, 3, empty x 2, 666]
```

🧐 各位是不是看出什么"端倪"了？

这里的 `key` 代表将要改变的数组下标，当 `key` 大于数组的 `length` 时，`splice` 只会向数组的末尾新增值（也可理解为向数组 push 了一个值）那么这样跟我们的预期也就不同了，所以要对 `key` 和 `length` 取最大值。  

在 `Vue` 的响应式系统中，已经对 `Array.prototype` 进行了一层**代理**操作，之后执行 `splice` 时，会触发 `dep.notify` 方法去通知视图更新。

## 对象处理 {#object}

```js {6}
function set(target, key, val) {
  if (key in target && !(key in Object.prototype)) {
    target[key] = val
    return val
  }
  const ob = target.__ob__
  if (!ob) {
    target[key] = val
    return val
  }
  defineReactive(ob.value, key, val)
  ob.dep.notify()
  return val
}
```

首先检测 `key` 是否已经存在在 `target` 上了，那么直接赋值就会触发 `setter` 函数来对视图进行更新。

之后获取了 `ob`，这是一个响应式数据的的标志，若目标对象不是**响应式数据**，那么直接赋值返回，这段逻辑在官网对 `Vue.set` 中的[介绍](https://v2.cn.vuejs.org/v2/api/#Vue-set)中可以找到  
最后，如果上述情况都不符合，说明：

- target 不是数组
- key 不在 target 上
- target 是一个响应式数据

那么这个时候就需要通过 `defineReactive` 将 `target的key值` 转换为**响应式数据**，并通过 `ob.dep.notify` 去通知视图进行更新。

## 总结

`Vue.set` 对数组和对象分别坐了不同处理：

- 对于数组，通过使用 `splice` 方法触发视图更新
- 通过对象，通过检测目标对象是否存在 `key` 、 是否是响应式数据和调用 `ob.dep.notify` 来触发视图更新  
  <TheEnd />
