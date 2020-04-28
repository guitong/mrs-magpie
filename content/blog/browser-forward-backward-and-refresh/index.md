---
title: 浏览器的前进、后退与刷新
date: '2018-02-27'
category: JavaScript
description: 应用在 Chrome 里调试时正常，但是在移动端测试时点击后退却不会刷新页面数据 ???
---

## 问题

**_应用在 Chrome 里调试时正常，但是在移动端测试时点击后退却不会刷新页面数据 ???_**

查看了移动端输出信息后，发现确实是接口数据都走了缓存。

我的后退是通过 [History API](https://developer.mozilla.org/en-US/docs/Web/API/History) 实现的：

```js
history.back();
//or history.go(-1); 与上面代码起同样作用
```

## 解决？

经过查找发现，**桌面端与移动端浏览器在对后退按钮的处理是有区别的**。桌面端在后退到上一页面时会刷新页面，包括表单数据等都会更新。然而在移动端则不会刷新，数据不会发生变化。这样的设计可能针对存在慢速连接的移动端，可以说，有其道理.. 

一个并不完美的替代方案是使用`document.referrer`。

它的定义是：

> Returns the URI of the page taht linked to this page.

就是返回链接到此页面的页面的URI。

_注意：如果是用户直接导航到当前页面（没有通过一个链接，比如从书签）的情况，它的值是一个空字符串。_

我们可以这样写来达到假返回的效果：

```js
location.href = document.referrer;
```

之所以是假返回，因为这其实是一个前进操作。如果使用`hostory.back()`方法，会返回到历史记录中的上一条记录，然而使用上面这种的话会在历史记录中再添加新的一条记录，这与我的初衷并不相符，所以说并不是完美的解决方案。
