---
title: computed 实现原理
date: 2022-10-07
---

本文基于 [Vue 2.16.14](https://github.com/vuejs/vue) 版本

计算属性的特点是基于**它们的响应式依赖进行缓存的**，只有在响应式依赖发生改变时，才能重新会重新求值，这就意味着，当计算属性中的响应式依赖未发生改变时，计算属性会立即返回之前计算的结果。

## 核心源码分析 {#source}

当组件初始化的时候，如果组件中有 `computed` 属性，那么则会 [initComputed](https://github.com/vuejs/vue/blob/v2.6.14/src/core/instance/state.js#L170-L211):

```js {20,21,22,23,24,25}
const computedWatcherOptions = { lazy: true }
function initComputed(vm: Component, computed: Object) {
  // $flow-disable-line
  const watchers = (vm._computedWatchers = Object.create(null))
  // computed properties are just getters during SSR
  const isSSR = isServerRendering()

  for (const key in computed) {
    const userDef = computed[key]
    const getter = typeof userDef === 'function' ? userDef : userDef.get
    if (process.env.NODE_ENV !== 'production' && getter == null) {
      warn(`Getter is missing for computed property "${key}".`, vm)
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions)
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef)
    } else if (process.env.NODE_ENV !== 'production') {
      if (key in vm.$data) {
        warn(`The computed property "${key}" is already defined in data.`, vm)
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(`The computed property "${key}" is already defined as a prop.`, vm)
      } else if (vm.$options.methods && key in vm.$options.methods) {
        warn(`The computed property "${key}" is already defined as a method.`, vm)
      }
    }
  }
}
```

1. 首先创建 `computed Watcher`，并往组件实例上挂载 `_computedWatchers` 属性
2. 判断当前环境是否是 `SSR` 服务端渲染
3. 循环 `computed` 属性，拿到每一个 `key`，为其创建 `computed Watcher`
4. 检验每个计算属性是否与 `props` 或者 `data` 里的属性重复，若重复则在生产环境下报错。

这里的第 3 点 `new Watcher` 是传入 `const computedWatcherOptions = { lazy: true }`，意味着初始化计算属性的时候并不会立刻进行求值：

```js {14,15,16}
class Watcher {
  constructor(
    vm: Component,
    expOrFn: string | Function,
    cb: Function,
    options?: ?Object,
    isRenderWatcher?: boolean
  ) {
    // ...ignore
    if (options) {
      this.lazy = !!options.lazy
    }
    this.dirty = this.lazy
    this.value = this.lazy ? undefined : this.get()
  }
}
```

那么在什么时候 computed 属性会被触发？在 `Render` 函数执行到对应计算属性时，它的 `getter` 函数就会被触发。

它的 `getter` 函数在哪里定义？答案是在 [defineComputed](https://github.com/vuejs/vue/blob/v2.6.14/src/core/instance/state.js#L213-L242) 方法中。

```js
export function defineComputed(target: any, key: string, userDef: Object | Function) {
  const shouldCache = !isServerRendering()
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef)
    sharedPropertyDefinition.set = noop
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop
    sharedPropertyDefinition.set = userDef.set || noop
  }
  if (process.env.NODE_ENV !== 'production' && sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(`Computed property "${key}" was assigned to but it has no setter.`, this)
    }
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}
```

这个函数主要是使用 `Object.defineProperty` 将 `component` 上的属性挂载到 `vm` 组件实例上，并代理了它的 `getter` 和 `setter` 属性。

`get` 属性对应的是 `createComputedGetter`，而 `set` 在开发中比较少用到，一般是空函数。这里我们重点关注一下 [createComputedGetter](https://github.com/vuejs/vue/blob/v2.6.14/src/core/instance/state.js#L244-L257) 函数，它也就是我们在 `Render` 函数触发计算属性时执行的方法。

```js
function createComputedGetter(key) {
  return function computedGetter() {
    const watcher = this._computedWatchers && this._computedWatchers[key]
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate()
      }
      if (Dep.target) {
        watcher.depend()
      }
      return watcher.value
    }
  }
}
```

解释下这里的 `dirty` 属性:

- `dirty` 为 `true`，说明数据已经“脏了”，需要更新
- `dirty` 为 `false`，说明数据不是“脏数据”，不需要更新

`computed` 缓存上次一计算的结果的功能就是这样实现的，当 `dirty` 为 `fasle` 的时候，代表数据没有变动，直接返回 `watcher.value` 的结果即可。

之后看一下 `evaluate` 方法：

```js
evaluate () {
  this.value = this.get()
  this.dirty = false
}
```

当我们执行 `this.get()` 方法时，就会执行 `this.getter` 函数，这个函数在计算属性初始化 `new Watcher` 时传入的参数（计算属性定义的函数。并将 `dirty` 设置为 `false`。

接下来是 `depend` 方法，它是为了让响应式数据触发的时候，会触发 `computed` 属性中对应的方法。我们以一个例子来解释：

```js
new Vue({
  el: '#app',
  data() {
    return {
      category: 'car',
      brand: 'Ford'
    }
  },
  template: `
    <div>
      {{ carBrand }}
      <button @click="brand = 'Maserati'">换车！</button>
    </div>
  `,
  computed: {
    carBrand() {
      return this.category + '--' + this.brand
    }
  }
})
```

在首次 `initComputed` 的时候，并不会触发 `cardBrand`，在 渲染 `watcher` 中在取 `carBrand` 属性时，首次触发 `computedGetter` 函数，注意，是在**渲染 `watcher` 中取的值**(Dep.target = 渲染 watcher。

要想 `brand` 的值改变，`carBrand` 计算属性也会执行，那么就需要将计算`watcher` 装进渲染 `watcher` 中，所以我们需要 `depend` 方法把让渲染 `watcher` 定义计算 `watcher` :

```js
/**
 * Depend on all deps collected by this watcher.
 */
class Watcher {
  depend() {
    let i = this.deps.length
    while (i--) {
      this.deps[i].depend()
    }
  }
}
```

渲染 `deps`，并执行 `depend` 方法，它是 `Dep` 类中的方法，注意不要跟上述的 `depend` 弄混了：

```js
class Dep {
  depend() {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }
}
```

要特别注意的是，这里的 `Dep.target` 是 渲染 `watcher` ! `this` 实际上就是我们的计算 `watcher` 的 `deps`，最终它会把我们的计算 `watcher` 都装入到渲染函数的 `subs` 中：

```js
class Watcher {
  constructor(
    vm: Component,
    expOrFn: string | Function,
    cb: Function,
    options?: ?Object,
    isRenderWatcher?: boolean
  ) {
    this.deps = []
    this.newDeps = []
    this.depIds = new Set()
    this.newDepIds = new Set()
  }
  addDep(dep: Dep) {
    const id = dep.id
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id)
      this.newDeps.push(dep)
      if (!this.depIds.has(id)) {
        dep.addSub(this)
      }
    }
  }
}

class Dep {
  constructor() {
    this.subs = []
  }
  addSub(sub: Watcher) {
    this.subs.push(sub)
  }
}
```

当响应式数据更新时，会循环渲染 `watcher` 的 `subs`，而这时我们的计算 `watcher` 已经在里面了，所以也会跟着关联的响应式数据更新而更新。这样 `Vue` 就实现了对计算属性的响应式监测。

## 最小化实现 {#demo}

可以在这里的 [demo](https://github.com/rzhAvenir/vue-learn/tree/dev/11.%E5%93%8D%E5%BA%94%E5%BC%8F%E7%B3%BB%E7%BB%9F%E4%B9%8Bcomputed) 看到 `computed` 最小化实现

## 参考 {#refer}

[computed-属性的响应式](https://vue.windliang.wang/posts/Vue2%E5%89%A5%E4%B8%9D%E6%8A%BD%E8%8C%A7-%E5%93%8D%E5%BA%94%E5%BC%8F%E7%B3%BB%E7%BB%9F%E4%B9%8Bcomputed.html#computed-%E5%B1%9E%E6%80%A7%E7%9A%84%E5%93%8D%E5%BA%94%E5%BC%8F)

<TheEnd />
