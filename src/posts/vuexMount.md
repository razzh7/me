---
title: Vuex 的挂载过程
date: 2022-10-17
---



基于 [Vuex3.x](https://github.com/vuejs/vuex/tree/3.x) 版本

## 思考 {#think}

Vuex 是如何引入 Vue 项目的？  

   1、先安装 `Vuex` ，再通过 import 引入项目  
   2、使用 `Vue.use(Vuex)` ，将 Vuex 作为插件安装  
   3、实例化 `new Vuex.Store({...})` ，将其放入 `new Vue()` 的 options 中

  ```js
  import Vuex from 'vuex'
  import Vue from 'vue'
  Vue.use(Vuex)

  const store = new Vuex.Store({
    state: {},
    actions: {},
    mutations: {}
  })

  new Vue({
    store,
    ...
  })
  ```

  可以看到步骤二使用了 Vue 的 [Vue.use](https://v2.cn.vuejs.org/v2/api/#Vue-use) API，将 Vuex 安装，这个 API 在很多地方都能用到，比如 `ElementUI`、`AntDesign`这些 UI 库也都使用了它进行安装，在使用它的时候，我觉得 Vue.use 即神奇但又让人难以理解，接下来配合 Vuex 的挂载过程去看看它到底做了什么事。

## 解析 Vuex 的挂载过程 {#analysis-vuex}

```js{10,16}
function initUse(Vue: GlobalAPI) {
  Vue.use = function (plugin: Function | Object) {
    // 插件缓存，若这个插件已被安装，那么直接返回Vue实例对象
    const installedPlugins = this._installedPlugins || (this._installedPlugins = [])
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // 将arguments类数组从第一项开始转换为普通数组
    const args = toArray(arguments, 1)
    // 将Vue实例插入数组第一项中
    args.unshift(this)
    // 判断plugin的install是否是函数，如果是执行用户的install方法
    // 若不符合条件，那么判断plugin方法是否是函数，如果是则执行用户传入的plugin方法
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }
    // 将执行完毕的plugin加入到缓存数组中
    installedPlugins.push(plugin)
    // 返回Vue实例对象
    return this
  }
}
```

代码行中的第一个高亮代码，是 Vue.use 对于 plugin 之外的参数进行处理，最终目的是将其传入到用户定义的 install 方法中去，但 Vuex 的 install 方法并不需要额外的参数配置，所以只需要执行 Vue.use 方法就可以达到安装的目的。  

在这之后就会执行 Vuex 定义的 `install` 安装方法: `plugin.install.apply(plugin, args)` ,将 `this` 指向 `plugin` 本身，并将 args 数组传入。  

来到 Vue 的 install 方法:

```js{13}
let Vue
function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      )
    }
    return
  }
  // 使用Vue.use的时候会将全局变量Vue指向_Vue构造函数，用于后续校验是否使用了Vue.use
  Vue = _Vue
  applyMixin(Vue)
}
```

install 的核心代码就是高亮那句话，我们进去看看：

```js
function applyMixin(Vue) {
  const version = Number(Vue.version.split('.')[0])

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit })
  } else {
    ...此处省略1.x安装方法
  }

  function vuexInit () {
    const options = this.$options
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store
    }
  }
}
```

可以看到执行了 `Vue.mixin` 方法，将 `vuexInit` 这个方法放到了 `beforeCreate` 生命周期中传入了 mixin 方法中，这个方法会调用 `mergeOptions` 方法将其合并到 `Vue.options` 中,类似这样的代码：

```js
Vue.options = {
  beforeCreate: [function vuexInit(){}],
  ...
}
```

当 new Vue 实例的时候就会执行 Vue 的 `_init` 方法进行初始化操作，对于 Vuex 的初始化有两处**重点**：

- 将我们在 new Vue 的时候传入的 `store` 实例/方法挂载到了 vm.$options 上
- 执行了 `beforeCreate` 钩子

beforeCreate 钩子会在此处执行。为什么会选择在 beforeCreate 执行？主要的原因还是在于 beforeCreate 的时候 Vue 的 options 的选项都还没被初始化，若在其他的 hook 中安装 vuex，那么可能会导致需要用到 vuex 中的 state 的数据的时候但 vuex 并没有安装的情况出现，所以这样做避免了出现数据错误的情况。  

vuexInit 的执行，首先就是将 this.$options 赋值给了 options,这里其实有个问题，这个 `this` 是谁？我们知道 js 的 this 指向是通过运行时的环境决定的，所以我们需要知道  vuexInit **在哪里被执行**，通过前面的分析应该是在 beforeCreate hook 执行的时候，来到代码中：
::: details 点击展开 code
```js
function callHook(vm: Component, hook: string) {
  pushTarget();
  const handlers = vm.$options[hook];
  const info = `${hook} hook`;
  if (handlers) {
    for (let i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit("hook:" + hook);
  }
  popTarget();
}

function invokeWithErrorHandling (
  handler: Function,
  context: any,
  args: null | any[],
  vm: any,
  info: string
) {
  let res
  try {
    res = args ? handler.apply(context, args) : handler.call(context)
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(e => handleError(e, vm, info + ` (Promise/async)`))
      res._handled = true
    }
  } catch (e) {
    handleError(e, vm, info)
  }
  return res
}
```
:::
代码块中高亮的那一行执行了 `invokeWithErrorHandling` 方法，我们可以在这个方法中看到 `handler` 就是我们的 `vuexInit` 方法，可以看到的是它们在被调用的时候用 `apply/call` 方法将 `vm` 实例传入，所以这个时候 `vuexInit` 方法中的 this 指向的是 `Vue` 的实例对象。回到 vuexinit 方法中：

```js
function vuexInit() {
  const options = this.$options
  if (options.store) {
    this.$store = typeof options.store === 'function' ? options.store() : options.store
  } else if (options.parent && options.parent.$store) {
    this.$store = options.parent.$store
  }
}
```

前面提到这时的 $options **已经有了Store实例/方法**，那么有两个 if 分支，里面的逻辑大致相同，都是为了让 `vm.$store` 指向 `Store 实例` 。回想一下我们是怎么向 Vuex 派发内容的？

```js
this.$store.commit('type', playload)
```

就是这样！解释一下两个 if 分支的逻辑：  
1. 如果当前是根组件，就把传入的 Store 实例挂在根节点 vm 上  
2. 如果当前组件是子组件，就从 options 中的 parent 找到 Store 实例挂载子组件的 vm 上，这里注意是**引用赋值**，因此每个子组件都可以访问构造 `VueComponent` 实例上的 `$store`

## 总结 {#summary}

之前在 Vue-cli 初始化的项目中总是看到在 new Vue 中传入 store，对这个做法其实一直不是很理解，为什么要这么做，现在明白了是为了将 Store 实例挂载到 options 上再经过 vuexInit 的初始化就能够让用户在全局调用 Store 实例。

<TheEnd />
