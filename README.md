# Faster Bing

## 1. 介绍

在使用 Bing 搜索时，Bing 会将搜索结果的链接重定向到一个中间页面，然后再跳转到目标页面。这个中间页面会增加一次请求，导致访问速度变慢。
本项目将重定向链接修改为目标链接，实现直接访问 Bing 搜索结果的目标页面，加快访问速度。

本项目基于 Tampermonkey 开发，可以在 Chrome 和 Firefox 等支持 Tampermonkey 插件的浏览器上使用。

TODO: GIF 演示

## 2. 使用方法

### 2.1 安装 Tampermonkey

TODO

### 2.2 安装脚本

TODO

### 2.3 使用

Faster Bing 脚本会自动生效，无需手动操作。当你使用 Bing 搜索时，点击搜索结果链接时，会直接跳转到目标页面。

## 3. 原理

Bing 搜索的跳转链接的参数 `u` 是经过 Base64 编码的目标链接，我们只需要解码这个参数，然后直接修改链接的`href`属性即可。

## 4. 反馈

如果你有任何问题或建议，欢迎在 [GitHub Issues](https://github.com/jiang-taibai/faster-bing/issues) 或在脚本评论区中提出。

## 5. 开源协议

本项目遵循 [MIT](https://opensource.org/licenses/MIT) 开源协议。

CopyRight © 2024~Present [Jiang Liu](https://coderjiang.com)
