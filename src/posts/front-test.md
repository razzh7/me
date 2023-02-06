---
title: 前端测试框架选型调研
date: 2022-10-23
tech: work
---

[[toc]]

最近项目有单元测试和 `E2E` 单元测试的需求，市面上测试框架很多，所以开启了框架的选型之路。

## Npm 每月下载量
![img](/img/weekly.png)


可以看到 `Jest` 的下载量超过了 `Mocha` 很多。

Jest 的下载量较大，一部分原因是因为 create-react-app 脚手架默认内置了 Jest, 而大部分 React 项目都是用它生成的。


## Github stars & issues
![img](/img/stats.png)

> 从 GitHub starts & issues 以及 npm 下载量角度来看，Jest 的关注度更高。从版本迭代来看，Jest 已经更新了29个大版本，更新更为频繁。

## 使用方式
| 框架  | 断言  | 异步处理  | Mock  | 代码覆盖率  |
|---|---|---|---|---|
| Mocha  | 不支持（需要安装 Chai）  | 友好  | 不支持  |  不支持 |
| Jest  | 默认支持  | 友好  | 默认支持  | 支持  |

`Mocha` 需要更多的配置才能上手，相对来说 `Jest` 是开箱即用的，`Mocha` 比起 `Jest` 有更多社区生态（得益于社区的贡献者）。
如果要想“快速”开始，那么 `Jest` 会是一个好选择，如果更看重社区可用的工具，那么可以选择 `Mocha`。

## 语法
### Jest
```js
describe('Array', () => {
  it('should return -1 when the value is not present', () => {
    expect([1,2,3].indexOf(4)).toEqual(-1)
  })
})
```

### Mocha

```js
describe('Array', function () {
  it('should return -1 when the value is not present', () => {
    assert.equal([1, 2, 3].indexOf(4), -1)
  })
})
```
相同的测试条件，你喜欢哪个？  
笔者更喜欢 `Jest` 的语法（个人喜好），它的语法更加形象，`Mocha` 的语法感觉有点命令式编程的味道。


## E2E 选型
`E2E` 端到端测试：当一个稳定的业务组件（不需要经常改动），某天改动其他的业务组件后，影响到了之前稳定的业务组件，那么这个 `Bug` 很难被发现，因为测试人员不会来回对已经测了很多遍的页面进行测试，这时候就需要使用 `E2E` 测试来保证代码的稳定性。  

这里选用 Cypress 和 Nightwatch 进行比较。两者都已经集成在 [VueCLI](https://cli.vuejs.org/core-plugins/) 中

## 文档对比
#### Cypress
![img](/img/cypress-docs.png)

#### Nightwatch
![img](/img/nightwatch.png)

`Cypress` 文档中实际上有很多关于操作的视频，能让你更快上手，并且提供了更多[例子](https://example.cypress.io/)。总得来说比 `Nightwatch` 更易上手。  

这两个产品中我更喜欢 `Cypress`。  


## 为什么选择 Cypress
- 可视化的自动化交互页面
- 支持时间回溯，更易于 Debug
- 可视化选取元素，更易上手
- 文档简单易读，并提供了一系列 [Example](https://example.cypress.io/)  
- 同时支持 `Chorme`、`Edge`、`Firefox` 三款浏览器

## 调研路上的竞品 Playwright
在调研的路上发现 [Playwright](https://playwright.dev/) 的热度也非常高，它支持5种主流浏览器： `Chorme`、`Edge`、`Firefox`、`Opera`、`Safari`。并且最近在大佬 [antfu](https://github.com/antfu) 的直播[新工具！前端运行时报错检查](https://www.bilibili.com/video/BV1Hg41127JK/?spm_id_from=333.1007.top_right_bar_window_history.content.click&vd_source=bfa2bf7637de4c473ec14d1189acac7f)中 `core` 功能也主要是用 `Playwright` 来做的。  

总之，给人的感觉非常的 `magic` ！

## 结尾
笔者最终在项目中使用了 `Jest` 和 `Cypress`，它们都集成在 [Vue CLI](https://cli.vuejs.org/core-plugins/) 中，如果你是 `Vue CLI` 创建的项目，那么你可以通过 `vue add` 来安装它们，配置这些事就交给 `CLI` 来做吧！

