---
title: CSS 实现文字过长显示省略号
date: '2018-03-05'
category: CSS
description: 有时我们希望文本的内容不要太长，如果超出预期长度的话，则显示省略号标记。这种实现也比较常见。
---

有时我们希望文本的内容不要太长，如果超出预期长度的话，则显示省略号标记。这种实现也比较常见。

简而言之，要实现这种效果，需要同时满足以下四个条件：

1. 有宽度限制，即定义一个文本最长宽度

2. 禁止折行。所有的文本只能在一行显示，下面的CSS代码可以实现：

```css
white-space: nowrap;
```

3. 内容溢出则将其隐藏。

```css
overflow: hidden;
```
4. 文本溢出时显示省略号标记。

```css
text-overflow: ellipsis;
```

下面是一个示例:

<iframe width="100%" height="300" src="//jsfiddle.net/redtree/zq97zatd/2/embedded/result,html,css/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

https://jsfiddle.net/redtree/zq97zatd/2/
