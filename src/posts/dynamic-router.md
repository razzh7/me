---
title: 动态路由的实现方式
date: 2022-11-17
tech: work
---



[[toc]]

## 背景

今天看了公司中后台项目中动态路由的实现，基于 [AntAdmin](https://github.com/iczer/vue-antd-admin) 模版。发现它跟 [ElementAdmin](https://github.com/PanJiaChen/vue-element-admin) 的实现方式大不相同，于是打算记录一下两大主流 Vue 后台框架的动态路由实现的差异。

## ElementAdmin 实现 

将本地 `router/index.js` 存到服务端，然后返回数据。

数据可以是由后端处理形成树形结构的 `router` 表，也可以是返回带 `pid` 的那种格式让前端处理数据形成 `router` 表：

```js
const router = [
  {
    id: 2,
    pid: 0,
    path: '/user',
    icon: "user.png"
    name: 'User',
    title: '用户管理',
    components: '/user'
  },
  {
    id: 3,
    pid: 2,
    path: 'info',
    name: 'UserInfo',
    title: '用户信息',
    components: '/user/info'
  }
  ...
]
```

之后拼装成 `Vue-Router` 约定的格式，你可以在这个[仓库](https://github.com/rzhAvenir/vue-express-rbac/tree/master/admin)中看到如何[转换](https://github.com/rzhAvenir/vue-express-rbac/blob/master/admin/src/store/modules/asyncPermission.js#L57-L89)。

最终的格式就像这样：

```js
const router = [
  {
    name: 'User',
    path: 'user',
    component: '@/pages/user',
    meta: {
      title: '用户管理',
      icon: 'user.png',
    },
    children: [...],
  }
  ...
]
```

## AntAdmin 实现

本地存下完整的 `router` 信息，服务端也返回路由信息，但服务端返回的信息不包含 **component** 字段，类似这样：

```js
const serviceRouter = [
  {
    user: {
    path: '/user',
    name: 'User',
    title: '用户管理',
    meta: {
      title: "用户管理",
      icon: 'user.png',
    },
    component: () => import('@/pages/user'),
    children: [...]
  },
  }'
  ...
]
```

服务端路由需要和本地 `routerMap` 做对比：

```js
function parseRouter(serviceRouter, routerMap) {
  let finalRouter = {}
  // serviceRouter.rotuer 代表 本地 routerMap 的键名
  finalRouter = routerMap[serviceRouter.rotuer]
}
```

详细的代码在[这里](https://github.com/iczer/vue-antd-admin/blob/master/src/utils/routerUtil.js#L25-L87)。

为什么要费事在本地存一个 `routerMap`？直接像 `ElementAdmin` 一样都存在服务端不香？

- 如果新增一个页面，那么需要提交 `components` 字段，我们在网页输入页面的路径，是很有可能输入出错的，体验是非常不好的，本地 `routerMap` 给我们提供在了编译器（VsCode 编写路径的体验。

- 想要删除一个页面，可以不需要在配置路由删除，可以直接在 `map` 中注释掉。那么路由在做 `parseRouter` 的时候，`routerMap` 中就没有对应的模块就无法映射，所以这个页面就不会出现。

- 大型项目中，想要查找一个页面，但由于模块多，这时找页面是非常麻烦的，通过检索 `routerMap` ，我们可以得到这个页面的 `path`，`name` 等信息，方便我们在浏览器中输入 `path` 访问页面等。
