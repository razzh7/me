---
title: el-switch实现
date: 2022-03-12
tech: work
---

[[toc]]

写这篇文章的起因是看到了 [Element-Plus](https://element-plus.org/zh-CN/component/switch.html) 官网 nav 栏的黑夜模式切换功能，开启黑夜模式的时候 switch 中的 icon 也能从白天的图标转换成黑夜的图标，配合上 Dark 模式的过渡动画效果，当时我就觉得这个交互很惊艳，想要去了解一下这个是怎么实现的，并学着写一个 [switch](https://github.com/rzhAvenir/vite-test-site/blob/master/src/components/Switch/Switch.vue)。

## 思考

- 点击 switch 是怎么做到左右切换的效果？
- 很好奇 beforeChange 前置钩子的实现，怎么做到切换之前调用 beforeChange 方法？
- 为什么文档说 v-model 的绑定值必须等于 `active-value` 和 `inactive-value`?
- 为什么需要 `active-value` 和 `inactive-value`?直接使用 `v-model` 绑定一个值切换不行吗？

## 源码整体架构

先看构图部分：

```vue
<template>
  <div class="el-switch is-checked">
    <input class="el-switch__input" />
    <div class="el-switch__core">
      <span class="el-switch__inner"></span>
      <span class="el-switch__action"></span>
    </div>
  </div>
</template>
```

switch 的大致的 HTML 结构是这样的，我们知道 element-plus 整体样式采用了 `BEM` 的规范。源码中的样式都是通过 `useNameSpace` 这个方法来生成 BEM 样式的，这里我将样式名字抽离出来，比较好看清楚一些。

```vue
<template>
  <div class="el-switch is-checked" @click.prevent="switchValue"></div>
</template>
```

其中外层的 wapper 的上有一个 `is-checked` 样式，这是 `BEM` 规范的状态标签，表示 switch 处于 on 或者 off 的状态，并带上一个点击事件 `switchValue` ，这个方法就是切换状态的方法。

## 人机交互设计

```vue
<template>
  <input
    :id="inputId"
    ref="input"
    class="el-switch__input"
    type="checkbox"
    role="switch"
    :aria-checked="checked"
    :aria-disabled="switchDisabled"
    :name="name"
    :true-value="activeValue"
    :false-value="inactiveValue"
    :disabled="switchDisabled"
    :tabindex="tabindex"
    @change="handleChange"
    @keydown.enter="switchValue"
  />
</template>
```

这里的 input 标签里面有很多属性，其实我在调试源码的时候，很困惑的点是：把 `input` 标签注释掉，我点击 switch 照样能切换状态，因为其 class 的作用就是把它隐藏，那么为什么要在写 input 标签并在上写这么多的属性？在此之中我不太熟悉的属性如下：

- `aria-checked`
- `aria-disabled`
- `tabindex`

其中的 [ARIA](https://www.w3.org/TR/wai-aria-1.1/#introduction) 是可以让我们更好的跟机器交互，而 [tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) 也是为了这个目标而写的，当我们按下键盘上的 tab 键时，就可以选中我们的 input 标签，从而使用键盘的 space 和 enter 去操作我们的 `switch` 按钮,所以 input 的标签最后的事件 `@keydown.enter` 的作用就在此。

相关规范 switch 的 ARIA 设计规范可以看[这里](https://www.w3.org/WAI/ARIA/apg/patterns/switch/)。

`ARIA` 全称 Accessible Rich Internet Applications，是能过让残障人士更加便利的访问 Web 内容和使用 Web 应用的一套机制。也就是说在标签上写上以 `aria` 为前缀的属性。

还有没带 aria 前缀的属性 [role](https://www.w3.org/TR/wai-aria-1.1/#usage_intro)，也是为了优化网页交互的效果。

在按下 tab 键的时候，可以发现 switch 的边框变亮了，源码中使用了伪类选择器中的 focus-visible 来实现：

```scss
.el-switch__input {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
  margin: 0;
  &:focus-visible {
    & ~ .el-switch__core {
      outline: 2px solid var(--el-switch-on-color);
      outline-offset: 1px;
    }
  }
}
```

其中两个知识点 css 选择器 `~` 和伪类选择器 `focus-visible`。

- ～: `p` ~ `ul` 表示每一个 ul 标签前面都有 p 标签的 ul 标签
- focus-visible: 表示 tab 选中时的伪类选择器，和 `focus` 很像，它俩的区别在于用户使用键盘事件的时候，`focus` 选择器中的样式并不能生效，它只作用于鼠标事件，而 `focus-visible` 是对于鼠标和键盘事件都是起作用的，[对比详情](https://css-tricks.com/almanac/selectors/f/focus-visible/)。

## 切换按钮

```vue
<template>
  <span class="el-switch__action"></span>
</template>
```

这里是 switch 切换动作的动画标签，相关类名：`el-switch__core`。

```scss {14}
.el-switch {
  display: inline-flex;
  align-items: center;
  position: relative;
  font-size: 14px;
  line-height: 20px;
  height: 32px;
  vertical-align: middle;
  --el-switch-on-color: var(--el-color-primary);
  --el-switch-off-color: var(--el-border-color);

  &.is-checked .el-switch__core .el-switch__action {
    left: 100%;
    margin-left: calc(-1px - 16px);
    color: var(--el-switch-on-color);
  }

  .el-switch__action {
    position: absolute;
    top: 1px;
    left: 1px;
    border-radius: 100%;
    transition: all 0.3s;
    width: 16px;
    height: 16px;
    background-color: var(--el-color-white);
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--el-switch-off-color);
  }
}
```

在 action 中首先使用绝对定位，将 action 定位到 switch 的最左端，使用 `border-radius: 100%` 将 action 变成圆块,对全部属性使用 `transition` 属性进行过渡处理。当按钮被激活的时候，`is-checked` 状态类被触发，这时将圆块相对 switch 容器向左偏移 100%，代码块中高亮代码 `margin-left` 是为了处理圆块自身的宽度，这样 switch 就会从左到右带过渡动画的转换了。

## 核心逻辑实现

在逻辑方面首先定义了组件的名字

```ts
<script setup lang="ts">
defineOptions({
  name: 'ElSwitch'
});
</script>
```

这个 api 在 vue3 的文档中并没有提到，是一个 [vite](https://www.npmjs.com/package/unplugin-vue-define-options) 插件，用来定义组件名字，当使用 `setup` 语法的时候,我们需要另起一个 script 标签写一个 Options API 来定义它的名字，有了它之后我们就可以直接在 setup 中直接定义组件的名字了，[更多详情](https://github.com/vuejs/rfcs/discussions/430)。

接下来定义 `props` 和 `emit` :

```js
const props = defineProps(switchProps)
const emit = defineEmits(switchEmits)
```

上述 switchProps 和 switchEmits 是存在 [switch.ts](https://github.com/element-plus/element-plus/blob/dev/packages/components/switch/src/switch.ts) 中，如下：

- `modelValue`
- `inlinePrompt`
- `activeIcon`
- `inactiveIcon`
- `activeValue`
- `inactiveValue`
- `beforeChange`

这里展示的属性不全，但其余属性都是类似的实现方式。先来看如下代码：

```js {1,17}
const isControlled = ref(props.modelValue !== false)
watch(
  () => props.modelValue,
  () => {
    isControlled.value = true
  }
)
watch(
  () => props.value,
  () => {
    isControlled.value = false
  }
)
const actualValue = computed(() => (isControlled.value ? props.modelValue : props.value))
const checked = computed(() => actualValue.value === props.activeValue)
```

首先是使用 ref 定义了 `isControlled` 属性，可以看到，它里面并没有直接使用 modelValue 的值，而是进行了一个判断，是因为 modelValue 的类型值有`Boolean, String, Number`这三种，这一操作让 isControlled 的结果是布尔类型的值，有利于后续的判断。

后面使用了 watch 函数和 actualValue 计算属性，这都是为了区分用户是使用 `modelValue` 还是 `value` 属性向 switch 传的值。

但对于 value 属性，将在 2.3.0 版本被弃用，从[官网](https://element-plus.org/zh-CN/component/switch.html#%E5%B1%9E%E6%80%A7)也可以看到现在只使用`modelValue`来绑定切换的值，所以个人认为最后一句在放弃 value 属性的情况下也可以直接使用 modelValue 和 activeValue 进行**全等**判断得出 checked 的值。

```js
const checked = computed(() => modelValue.value === props.activeValue)
```

注意是全等判断！所以官方文档里也强调了 `activeValue` 和 `inactiveValue` 的类型必须相同！但为什么类型要一定要严格相同呢？

实际上是有它的用途存在的，因为考虑到 switch 切换绑定值 modelValue 类型灵活性，它提供了三种类型的[格式](https://github.com/element-plus/element-plus/blob/dev/packages/components/switch/src/switch.ts#L21),那么用户在实际场景下也不会乖乖的只传 Boolean 类型的值，若用户传递的是 Number 类型的 modelValue 值，如：2，而上面两个属性默认值是 Boolean 值，那么它们就永远不可能全等！所以 checked 永远是 false！按钮的状态将永远处于 off 状态。

## 用户点击时

```js
const switchValue = () => {
  if (switchDisabled.value) return

  const { beforeChange } = props
  if (!beforeChange) {
    handleChange()
    return
  }
}
```

当用户点击时会触发 `switchValue` 方法，总得来看 switchValue 方法处理了 `switchDisabled` 属性，`beforeChange` 钩子进行处理，如果用户没有传递这个钩子，则会执行 `handleChange` 方法。

先看 handleChange 方法：

```js {2}
const handleChange = () => {
  const val = checked.value ? props.inactiveValue : props.activeValue
  emit(UPDATE_MODEL_EVENT, val) // 帮助父组件更新modelValue的值
  emit(CHANGE_EVENT, val) // 抛出change事件，用作一些逻辑
  emit(INPUT_EVENT, val) // 抛出inptu事件，用作一些逻辑

  nextTick(() => {
    input.value!.checked = checked.value // 设置input属性的check值
  })
}
```

定义了 val 值，从[官网](https://element-plus.org/zh-CN/component/switch.html#%E5%B1%9E%E6%80%A7)可以看到，绑定值 `modelValue` 等于 `inactiveValue` 和 `activeValue` 中的其中之一，在 checked 被选中的时候，这里却选择了 `inactiveValue` ，而不是 `activeValue` ，当初我看到的时候比较困惑。为什么要这样写呢？看个小例子：

```vue
<script setup>
import { ref } from 'vue'
const data = ref(true)
const test = val => {
  data.value = val
}
</script>
<template>
  <el-switch v-model="data" @change="test"></el-switch>
</template>
```

此时 switch 为 on 状态，当我点击 switch 的时候，会触发 `handleChange` 方法，这时 cheked.value 还是 true，所以会选中 `inactiveValue` 的值，它默认是 false,所以 val 的值就是 false，通过后面的 `UPDATE_MODEL_EVENT` 事件传递出去了，`test` 方法被触发，val 的值就是刚刚 inactiveValue 的值 fasle，赋值给 data，这样这个时候 switch 中的 checked 也变成了 fasle，从而将 switch 的状态从 on 转换成 off。

## beforeChange 钩子函数

```js {8,15,25}
const { beforeChange } = props
const shouldChange = beforeChange()

const isPromiseOrBool = [
  isPromise(shouldChange),
  isBoolean(shouldChange)
].includes(true)
if (!isPromiseOrBool) {
  throwError(
    COMPONENT_NAME,
    'beforeChange must return type `Promise<boolean>` or `boolean`'
  )
}

if (isPromise(shouldChange)) {
  shouldChange
    .then((result) => {
      if (result) {
        handleChange()
      }
    })
    .catch((e) => {
      debugWarn(COMPONENT_NAME, `some error occurred: ${e}`)
    })
} else if (shouldChange) {
  handleChange()
}
```

官网介绍，beforeChange 是 switch 状态改变前的钩子，返回 `false` 或者返回 `Promise` 且被 `reject` 则停止切换。若传递了 beforeChange 钩子函数，它将会被先执行，代码第八行用来校验用户传递的函数的返回值是否是 Promise 或是 Boolean 类型。

第二句高亮代码是对 Promise 的返回值进行处理，等到 beforeChange 钩子执行完毕后再执行 handleChange 切换按钮的逻辑，其方法里面还有 change 事件可以抛出执行，所以 beforeChange 可以说是一个 change 事件的**前置钩子**。

其后的 else if 语句块执行说明用户回调函数返回的是 Boolean 类型的值，就简单执行了一下 hanldeChange 也就达到 beforChange 的前置钩子的目的了。

## 剩余 style 相关 Props

```js
const coreStyle =
  computed <
  CSSProperties >
  (() => ({
    width: addUnit(props.width)
  }))

const styles = computed(() => {
  return ns.cssVarBlock({
    ...(props.activeColor ? { 'on-color': props.activeColor } : null),
    ...(props.inactiveColor ? { 'off-color': props.inactiveColor } : null),
    ...(props.borderColor ? { 'border-color': props.borderColor } : null)
  })
})
```

官网定义了一些可直接修改的样式属性，如 `width`，我也挺好奇 switch 的样式设计的，源码中 coreStyle 和 styles 都被应用在了标签的内联样式 `style` 上，这样做的目的就是为了覆盖之前定义的默认样式。 其中 `CSSProperties` 在[官网](https://vuejs.org/api/utility-types.html#cssproperties)中提到，是 ts 的工具类，需要 `style` 属性绑定更多样式。[addUnit](https://github.com/element-plus/element-plus/blob/dev/packages/utils/dom/style.ts#L77) 是一个工具函数用来区分 `width` props 传递的类型。

## 总结

- 学习了 `switch` 左右切换的思想
- beforeChange 前置钩子的实现方式
- `activeValue` 和 `inactiveValue` 有两个功能
  - 用来跟 modelValue 全等比较确定 checked 的值
  - 在 handleChange 中自动取反，在 emit 事件中抛出
- CSSProperties 的使用场景
- 学习了如何通过 props 自定义样式覆盖原有样式
