---
title: '小记: 关于 CSS display 属性对表格语义的影响'
date: '2018-05-09'
translation: true
category: CSS
---

CSS的`display`属性非常强大。你可以用它来改变元素的视觉展示以匹配期望的样式，但有时候这样做可能会在浏览器可访问性树（[browser accessibility tree](https://developer.paciellogroup.com/blog/2015/01/the-browser-accessibility-tree/)）中产生意想不到的影响，如传达给屏幕阅读软件的元素的语义。通常情况下，屏幕阅读器和其他辅助技术并不能直接访问HTML DOM，他们通过可访问性API（[Accessibility APIs](https://www.w3.org/TR/wai-aria-1.1/#dfn-accessibility-api)）获取HTML DOM的部分信息。有时候，一个元素在HTML DOM中和可访问性树中会有不同的表示（represents）。

如果在可访问性树中的表示并不符合开发人员预期，它可能是开发人员或浏览器的错误（有意或无意的）。但我们可以确定的是，它不是屏幕阅读器的错。

一个示例

**the good**

具有[默认`display`属性的数据表格](https://s.codepen.io/stevef/debug/xYBJNd#def)，其在浏览器可访问性树的表示正确传达了每个元素的语义。

<img width="237" alt="table-no-flex" src="https://user-images.githubusercontent.com/30484000/37455832-034cde46-2879-11e8-959c-97b0ebb52260.png">

每个元素在可访问性树中表示为适当的角色，例如：a `table` element has a `role=table`。

<img width="259" alt="table-role" src="https://user-images.githubusercontent.com/30484000/37455895-24b7ba2e-2879-11e8-85b2-33652e398fe5.png">

**the bad**

当设置table元素的`display`属性为`block`、`grid`或`flex`时，不好的事情发生了。`table`元素将不再表示为`table`（在可访问性树中），表格行元素/语义不以任何形式表示。

<img width="279" alt="block" src="https://user-images.githubusercontent.com/30484000/37455924-37bdd0e0-2879-11e8-959a-7ddf14e60e12.png">

在可访问性树中，没有任何元素以数据表格语义表示，它们的角色都分配为`role=Text frame`。

<img width="194" alt="block-role" src="https://user-images.githubusercontent.com/30484000/37455937-3ee91460-2879-11e8-9c17-e1264e8b68d7.png">

可以使用ARIA`table/row/colunmheader/rowheader/cell`角色（参见ARIA [table design pattern](https://www.w3.org/TR/wai-aria-practices-1.1/#table) ）添加语义来解决这个问题，但这对开发者来说是本不应该需要的繁重工作。 在这种情况下，[浏览器不该混淆表格语义](https://bugzilla.mozilla.org/show_bug.cgi?id=1005271)。

If nothing else, a developer should be aware that it is not always the fault of the assistive technology when we can’t have [nice things](http://kizu.ru/en/blog/variable-order/).

## 相关阅读

[Tables, CSS Display Properties, and ARIA](http://adrianroselli.com/2018/02/tables-css-display-properties-and-aria.html)

<div class="callout">

原文： [_Short note on what CSS display properties do to table semantics_](https://developer.paciellogroup.com/blog/2018/03/short-note-on-what-css-display-properties-do-to-table-semantics/) by Steve Faulkner

</div>
