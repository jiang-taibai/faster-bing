# <div align="center">更快的 Bing (Faster Bing)</div>

<div align="center">
  <img src="https://img.shields.io/badge/Build-passing-%2396C40F" alt="Build-passing"/>
  <img src="https://img.shields.io/badge/Version-1.0.0-%231081C1" alt="Version-1.0.0"/>
  <img src="https://img.shields.io/badge/License-MIT-%2396C40F" alt="License-MIT"/>
  <img src="https://img.shields.io/badge/CopyRight-Jiang_Liu-%2396C40F" alt="CopyRight-Jiang_Liu"/>
</div>

## 1. 介绍

在使用 Bing 搜索时，Bing 会将搜索结果的链接重定向到一个中间页面，然后再跳转到目标页面。这个中间页面会增加一次请求，导致访问速度变慢。
本项目将重定向链接修改为目标链接，实现直接访问 Bing 搜索结果的目标页面，加快访问速度。

本项目基于 Tampermonkey 开发，可以在 Chrome 和 Firefox 等支持 Tampermonkey 插件的浏览器上使用。

### 1.1 对比

|       |  Bing  | Faster Bing |    对比结果    |
|:-----:|:------:|:-----------:|:----------:|
| 链接直观性 |  杂乱无章  |    一目了然     |    更人性化    |
| 访问速度  | 🚲🚲🚲 |   🚀🚀🚀    | 快 `1184ms` |

### 1.2 安装之前

安装之前，Bing 搜索结果的链接如下所示：

```text
https://www.bing.com/ck/a?!&&p=c7f1ae74d4db2156JmltdHM9MTcxMTQ5NzYwMCZpZ3VpZD0zYTZkZDUxMi0zN2FhLTYxYjUtMzJhNC1jN2UxMzZjYzYwNzYmaW5zaWQ9NTIwNQ&ptn=3&ver=2&hsh=3&fclid=3a6dd512-37aa-61b5-32a4-c7e136cc6076&u=a1aHR0cHM6Ly93d3cudGFtcGVybW9ua2V5Lm5ldC8&ntb=1
```

![](./res/img/before-link.png)

点击后会跳转到中间页面，然后再跳转到目标页面：

![](./res/img/before-situation.gif)

### 1.3 安装之后

安装 Faster Bing 脚本后，Bing 搜索结果的链接如下所示：

```text
https://www.tampermonkey.net/
```

![](./res/img/after-link.png)

点击后会直接跳转到目标页面：

![](./res/img/after-situation.gif)

## 2. 使用方法

### 2.1 安装 Tampermonkey

可查看 [Tampermonkey 首页](https://www.tampermonkey.net/index.php?browser=chrome&locale=zh) 查看详细的使用方法。

### 2.2 安装脚本

访问链接: [Greasy Fork - Faster Bing](https://greasyfork.org/en/scripts/490999-faster-bing)，点击 `安装此脚本` 安装脚本。

### 2.3 使用

Faster Bing 脚本会自动生效，无需手动操作。当你使用 Bing 搜索时，点击搜索结果链接时，会直接跳转到目标页面。

## 3. 原理

Bing 搜索的跳转链接的参数 `u` 是经过 Base64 编码的目标链接，我们只需要解码这个参数，然后直接修改链接的 `href` 属性即可。

## 4. 反馈

如果你有任何问题或建议，欢迎在 [GitHub Issues](https://github.com/jiang-taibai/faster-bing/issues)
或 [脚本反馈区](https://greasyfork.org/zh-CN/scripts/490999-faster-bing/feedback) 中提出。

## 5. 未来计划

- [ ] 即时修改选项：在用户点击链接时再修改链接，而不是在页面加载时就修改链接。此方法对于一些动态生成的链接可能会更加稳定。
- [ ] 优化链接修改：对于一些特殊的链接，可能需要特殊处理。目前调研中。
- [ ] 国际化：脚本支持多种语言（日志、提示等）。

## 5. 开源协议

本项目遵循 [MIT](https://opensource.org/licenses/MIT) 开源协议。

CopyRight © 2024~Present [Jiang Liu](https://coderjiang.com)
