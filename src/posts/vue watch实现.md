---
title: Vue watch实现原理
date: 2022-10-03
---

[[toc]]

本文基于 [Vue 2.16.14](https://github.com/vuejs/vue) 版本  

`watch Options` 用来监听一个响应式数据的变化，并触发回调函数，适合异步任务和开销较大的操作。

## 核心源码分析 {#source}
在 [initState](https://github.com/vuejs/vue/blob/v2.6.14/src/core/instance/state.js#L60-L62) 中执行了 [initWatch](https://github.com/vuejs/vue/blob/v2.6.14/src/core/instance/state.js#L293-L304) 方法
```js
function initWatch (vm: Component, watch: Object) {
  for (const key in watch) {
    const handler = watch[key]
    if (Array.isArray(handler)) {
      for (let i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i])
      }
    } else {
      createWatcher(vm, key, handler)
    }
  }
}
```
这里对 `watch` 对象做遍历，拿到每一个 `handler`，因为 `Vue` 是支持 `watch` 的同一个 `key` 对应多个 `handler`，所以如果 `handler` 是一个数组，则遍历这个数组，调用 [createWatcher](https://github.com/vuejs/vue/blob/v2.6.14/src/core/instance/state.js#L306-L320) 方法，否则直接调用 [createWatcher](https://github.com/vuejs/vue/blob/v2.6.14/src/core/instance/state.js#L306-L320)：
```js
function createWatcher (
  vm: Component,
  expOrFn: string | Function,
  handler: any,
  options?: Object
) {
  if (isPlainObject(handler)) {
    options = handler
    handler = handler.handler
  }
  if (typeof handler === 'string') {
    handler = vm[handler]
  }
  return vm.$watch(expOrFn, handler, options)
}
```
`handler` 可以有三种类型：  
- handler 为对象时，取出对象中的 `handler` 和 `options` 选项，有 `immeidate` 和 `deep` 选项
- handler 为字符串时，去 `vm` 组件实例上拿到 `handler` 回调函数
- handler 为函数时，默认传入 `$watch` 方法中  

最后调用 `vm.$watch(keyOrFn, handler, options)` 函数，[$watch](https://github.com/vuejs/vue/blob/v2.6.14/src/core/instance/state.js#L348-L370) 是 `Vue` 原型上的方法，它是在执行 `stateMixin` 的时候定义的：
```js
  Vue.prototype.$watch = function (
    expOrFn: string | Function,
    cb: any,
    options?: Object
  ): Function {
    const vm: Component = this
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {}
    options.user = true
    const watcher = new Watcher(vm, expOrFn, cb, options)
    if (options.immediate) {
      const info = `callback for immediate watcher "${watcher.expression}"`
      pushTarget()
      invokeWithErrorHandling(cb, vm, [watcher.value], vm, info)
      popTarget()
    }
    return function unwatchFn () {
      watcher.teardown()
    }
  }
```
首先 `$watch`，是一个 **user watcher**，它是能被用户直接调用的，所以在开始的时候，它会使用 `isPlainObject` 函数来判断用户传递的 `cb` 是否是对象，再利用 `createWatcher` 来处理对象属性。  

之后 `options.user = true`，也正是之前提到的 **user watcher** 出处，之后实例化 `Watcher(vm, expOrFn, cb, options)` 类，也是 `watch` 选项的关键步骤，（Watcher 方法相对复杂，这里只提对 Watcher 类中的关键方法：
```js
class Watcher {
  constructor(
    vm: Component,
    expOrFn: string | Function,
    cb: Function,
    options?: ?Object,
    isRenderWatcher?: boolean
  ) {
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn
    } else {
      this.getter = parsePath(expOrFn)
    }
    this.value = this.get()
  }
}
```
这里的 `expOrFn` 是一个对象 `key`, 是一个**字符串 path**，所以会走 `else` 分支的 [parsePath](https://github.com/vuejs/vue/blob/v2.6.14/src/core/util/lang.js#L33-L46) 方法:
```js
const bailRE = new RegExp(`[^${unicodeRegExp.source}.$_\\d]`)
export function parsePath (path: string): any {
  if (bailRE.test(path)) {
    return
  }
  const segments = path.split('.')
  return function (obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return
      obj = obj[segments[i]]
    }
    return obj
  }
}
```
`parsePath` 方法遍历 `path`，比如 `'car.brand'`，会被存进一个**闭包环境**下的 `segments` 的数组里面: `['car', 'barnd']`，并返回一个匿名函数，它会在 Watcher 中的 [this.value = this.get()](https://github.com/vuejs/vue/blob/v2.6.14/src/core/observer/watcher.js#L102-L124) 中调用，并保存 `value` 的值。  

匿名函数的**核心思想**是通过遍历 `segments` 中的 `path`，在取值时： `obj[segments[i]]`，触发该属性的 `getter` 函数**收集依赖**。

那么，我们在 `watch` 选项中传入的**回调函数**何时触发？当**视图更新时**，`Watcher` 实例上的 [run](https://github.com/vuejs/vue/blob/v2.6.14/src/core/observer/watcher.js#L180-L202) 方法最终会被调用：
```js
run () {
  if (this.active) {
    const value = this.get()
    if (
      value !== this.value ||
      isObject(value) ||
      this.deep
    ) {
      // set new value
      const oldValue = this.value
      this.value = value
      if (this.user) {
        const info = `callback for watcher "${this.expression}"`
        invokeWithErrorHandling(this.cb, this.vm, [value, oldValue], this.vm, info)
      } else {
        this.cb.call(this.vm, value, oldValue)
      }
    }
  }
}
```
他会再次调用 `const value = this.get()`，再次触发 `getter` 方法（执行闭包匿名函数。之后返回最新的 `value` 。  

之后会进行 `if` 判断: `value !== this.value`，其中 `this.value` 保存的是视图更新前的值，所以我们需要比较更新前后的 `value` 是否发生变化，由于我们是 **user watcher**，所以会走第一个分支，调用 [invokeWithErrorHandling](https://github.com/vuejs/vue/blob/v2.6.14/src/core/util/error.js#L36-L56) 方法，在这个方法中就会执行 `cb` 回调函数，执行我们定义函数的一些逻辑。

## immediate 选项 {#immediate}
开启 `immediate` 时，`watch` 会在初始化的时候立即执行回调函数，在 [$watch](https://github.com/vuejs/vue/blob/v2.6.14/src/core/instance/state.js#L348-L370) 中有这样一段代码：
```js
Vue.prototype.$watch = function(
  expOrFn: string | Function,
  cb: any,
  options?: Object
) {
  // ...ignore
  if (options.immediate) {
    const info = `callback for immediate watcher "${watcher.expression}"`
    pushTarget()
    invokeWithErrorHandling(cb, vm, [watcher.value], vm, info)
    popTarget()
  }
  // ...ignore
}
```
如果 `immediate` 存在，会立即执行这个回调。这里面的 `pushTarget` 和 `popTarget` 方法是为了让我们在执行回调的时候能够**收集响应式数据的依赖**。

## deep 选项 {#deep}
`watch` 选项在 [new Watcher](https://github.com/vuejs/vue/blob/v2.6.14/src/core/instance/state.js#L359) 的时候，会执行 `parsePath` 方法，用它来收集依赖，但它并不能深度收集对象中的**引用类型**的依赖，所以我们需要对 watch 监听的属性进行**深度递归遍历**。  

我们只需要在收集 `Watcher` 的过程中，深度遍历一遍当前对象，触发所有属性的 `get` ，然后每一个属性就会收集到当前 `Watcher` ，这样改变对象内部的值的时候，就会触发该 `Watcher` ，从而执行回调函数。  

遍历对象的话，首先就需要一个 `traverse` 函数。
```js
import { isObject } from "./util";

const seenObjects = new Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
export function traverse(val) {
    _traverse(val, seenObjects);
    seenObjects.clear();
}

function _traverse(val, seen) {
    let i, keys;
    const isA = Array.isArray(val);
    if ((!isA && !isObject(val)) || Object.isFrozen(val)) {
        return;
    }
    if (val.__ob__) {
        const depId = val.__ob__.dep.id;
        if (seen.has(depId)) {
            return;
        }
        seen.add(depId);
    }
    // 判断是数组还是对象
    if (isA) {
        i = val.length;
        while (i--) _traverse(val[i], seen);
    } else {
        keys = Object.keys(val);
        i = keys.length;
       // 遍历对象的每一个 key
        while (i--) _traverse(val[keys[i]], seen);
    }
}
```
它实际上就是对一个对象做深层递归遍历，因为遍历过程中就是对一个子对象的访问，会触发它们的 `getter` 过程，这样就可以收集到依赖，也就是订阅它们变化的 `watcher`。  

之后在 `Watcher`类中新增 `deep` 选项和 `traverse` 方法
```js
class Watcher {
  constructor(
    vm: Component,
    expOrFn: string | Function,
    cb: Function,
    options?: ?Object,
    isRenderWatcher?: boolean
  ) {
    /**************** 新增 ************ */
    if (options) {
      this.deep = options.deep
    }
    /**************** 新增 ************ */
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn
    } else {
      this.getter = parsePath(expOrFn)
    }
    this.value = this.get()
  }

  get () {
    pushTarget(this)
    let value
    const vm = this.vm
    try {
      value = this.getter.call(vm, vm)
    } catch (e) {
      if (this.user) {
        handleError(e, vm, `getter for watcher "${this.expression}"`)
      } else {
        throw e
      }
    } finally {
    /**************** 新增 ************ */
      if (this.deep) {
        traverse(value)
      }
    /**************** 新增 ************ */
      popTarget()
      this.cleanupDeps()
    }
    return value
  }
}
```
在执行完 `traverse` 方法后，收集了 `watch` 目标数据的所有依赖，在下一次数据变更时，回调也会跟着触发。

## 最小化实现 {#demo}
可以在这里的 [demo](https://github.com/rzhAvenir/vue-learn/tree/master/10.%E5%93%8D%E5%BA%94%E5%BC%8F%E7%B3%BB%E7%BB%9F%E4%B9%8Bimmediate%E5%92%8Cdeep) 看到 `watch` 最小化实现

## 参考 {#refer}
[Vue.js 技术揭秘 计算属性 vs 侦听属性](https://ustbhuangyi.github.io/vue-analysis/v2/reactive/computed-watcher.html#watcher-options)  
[Vue2 剥丝抽茧-响应式系统之 watch](https://vue.windliang.wang/posts/Vue2%E5%89%A5%E4%B8%9D%E6%8A%BD%E8%8C%A7-%E5%93%8D%E5%BA%94%E5%BC%8F%E7%B3%BB%E7%BB%9F%E4%B9%8Bwatch.html#%E5%9C%BA%E6%99%AF)  
[Vue2 剥丝抽茧-响应式系统之 watch2](https://vue.windliang.wang/posts/Vue2%E5%89%A5%E4%B8%9D%E6%8A%BD%E8%8C%A7-%E5%93%8D%E5%BA%94%E5%BC%8F%E7%B3%BB%E7%BB%9F%E4%B9%8Bwatch2.html#%E5%AE%9E%E7%8E%B0%E6%80%9D%E8%B7%AF-2)

<TheEnd />


