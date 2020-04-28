---
title: CSS居中完全指南
date: '2018-03-12'
translation: true
category: CSS
description: 有了这篇文章，🤗再也不愁 CSS 居中问题！
---

CSS居中是常被开发者抱怨的问题之一。**Why dose it have to be so hard?? They jeer.** 我认为问题不在于它实现起来有多难，而是有太多能够实现它的方法。在不同的情景下，如何去选择，才是真正困惑我们的地方。

所以现在，让我们来做一个决策树，使CSS居中问题更容易解决。

![Decision Tree](https://raw.githubusercontent.com/guitong/blog/master/src/images/centering-in-css.png)

## 水平居中

### 它是行内(`inline`)或类行内(`inline-*`)元素吗？（比如文本和链接）

你可以将行内元素置于块级父元素内，然后用下面的CSS代码来使其水平居中：

```css
.center-children {
  text-align: center;
}
```

<iframe height='265' scrolling='no' title='Centering Inline Elements' src='//codepen.io/chriscoyier/embed/HulzB/?height=265&theme-id=light&default-tab=css,result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/chriscoyier/pen/HulzB/'>Centering Inline Elements</a> by Chris Coyier  (<a href='https://codepen.io/chriscoyier'>@chriscoyier</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

这种方法适用于inline，inline-block，inline-table，inline-flex等类型的元素。

### 它是一个块级元素吗？

为了居中一个块级元素，你可以设置它的`margin-left`和`margin-right`值为`auto`（它的`width`值已给定，否则将占满容器，也就不需要居中了）。通常简写如下：

```css
.center-me {
  margin: 0 auto;
}
```

<iframe height='265' scrolling='no' title='Centering Single Block Level Element' src='//codepen.io/chriscoyier/embed/eszon/?height=265&theme-id=light&default-tab=css,result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/chriscoyier/pen/eszon/'>Centering Single Block Level Element</a> by Chris Coyier  (<a href='https://codepen.io/chriscoyier'>@chriscoyier</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

无论我们将要居中的块级元素或父元素的宽度如何，这都将起作用。

注意你不能将浮动元素居中。[There is a trick though.](http://css-tricks.com/float-center/)

### 有多个块级元素吗？

如果你需要将多个块级元素水平居中于单行，一个好的办法是改变它们的`dispaly`类型。这里有两个例子，分别使用了`inline-block`和`flexbox`方法实现：

<iframe height='265' scrolling='no' title='Centering Row of Blocks' src='//codepen.io/chriscoyier/embed/ebing/?height=265&theme-id=light&default-tab=html,result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/chriscoyier/pen/ebing/'>Centering Row of Blocks</a> by Chris Coyier  (<a href='https://codepen.io/chriscoyier'>@chriscoyier</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

除非你是想让它们堆叠在一起，那么刚才使用的设置自动外边距值将仍然有效。

<iframe height='265' scrolling='no' title='Centering Blocks on Top of Each Other' src='//codepen.io/chriscoyier/embed/haCGt/?height=265&theme-id=light&default-tab=html,result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/chriscoyier/pen/haCGt/'>Centering Blocks on Top of Each Other</a> by Chris Coyier  (<a href='https://codepen.io/chriscoyier'>@chriscoyier</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>


## 垂直居中

垂直居中在CSS中比较棘手。

### 它是行内(`inline`)或类行内(`inline-*`)元素吗？

#### 是单行吗？

有时行内／文本元素能垂直居中显示，仅仅是因为它们有相等的上下`padding`值。

```css
.link {
  padding-top: 30px;
  padding-bottom: 30px;
}
```

<iframe height='265' scrolling='no' title='Centering text (kinda) with Padding' src='//codepen.io/chriscoyier/embed/ldcwq/?height=265&theme-id=light&default-tab=css,result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/chriscoyier/pen/ldcwq/'>Centering text (kinda) with Padding</a> by Chris Coyier  (<a href='https://codepen.io/chriscoyier'>@chriscoyier</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>


如果由于某些原因，设置padding的方法并不可选，而你需要居中已知不会换行的文本，有一个技巧是使其`line-height`值与其`height`值相等。

```css
.center-text-trick {
  height: 100px;
  line-height: 100px;
  white-space: nowrap;
}
```

<iframe height='265' scrolling='no' title='Centering a line with line-height' src='//codepen.io/chriscoyier/embed/LxHmK/?height=265&theme-id=light&default-tab=css,result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/chriscoyier/pen/LxHmK/'>Centering a line with line-height</a> by Chris Coyier  (<a href='https://codepen.io/chriscoyier'>@chriscoyier</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

#### 是多行吗？

对于多行文本的情况，依然可以使用上下padding相等的方法使其垂直居中，但是如果这种方法失效了，可能文本所在的元素是一个table cell，不管是通过字面量定义的还是通过CSS定义的。（红叶注：这里的意思就是该元素可以是直接使用`<td>`表格标签声明，也可以是为元素设置`display:table-cell;`属性而使其成为一个table cell，父元素设置display:table; ）。如果是文本在`<td>`这样的元素内，该元素默认有CSS属性`vertical-align:middle;`，所以不需要我们显示地设置。然而，如果你是手动更改CSS使其成为table cell元素的，就需要显示地加入这个属性`vertical-align:middle;`。

([More on that.](http://css-tricks.com/what-is-vertical-align/))

下面的例子非常清晰地展示了这种方法：

<iframe height='265' scrolling='no' title='Centering text (kinda) with Padding' src='//codepen.io/chriscoyier/embed/ekoFx/?height=265&theme-id=light&default-tab=css,result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/chriscoyier/pen/ekoFx/'>Centering text (kinda) with Padding</a> by Chris Coyier  (<a href='https://codepen.io/chriscoyier'>@chriscoyier</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

如果你不喜欢或者这种方法也不好使，也许你可以用flexbox？单个子flex元素可以非常轻松地在父flex元素内垂直居中。

```css
.flex-center-vertically {
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 400px;
}
```

<iframe height='265' scrolling='no' title='Vertical Center Multi Lines of Text with Flexbox' src='//codepen.io/chriscoyier/embed/uHygv/?height=265&theme-id=light&default-tab=css,result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/chriscoyier/pen/uHygv/'>Vertical Center Multi Lines of Text with Flexbox</a> by Chris Coyier  (<a href='https://codepen.io/chriscoyier'>@chriscoyier</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

但是要记住，上面的讨论都是基于元素父容器有一个固定的高度（px，%，etc）。

如果这些方法都无法实现，你可以采用“ghost element”技术，将一个全高度的伪元素将放置于容器中，文本将与其垂直对齐。

```css
.ghost-center {
  position: relative;
}
.ghost-center::before {
  content: " ";
  display: inline-block;
  height: 100%;
  width: 1%;
  vertical-align: middle;
}
.ghost-center p {
  display: inline-block;
  vertical-align: middle;
}
```

<iframe height='265' scrolling='no' title='Ghost Centering Multi Line Text' src='//codepen.io/chriscoyier/embed/ofwgD/?height=265&theme-id=light&default-tab=css,result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/chriscoyier/pen/ofwgD/'>Ghost Centering Multi Line Text</a> by Chris Coyier  (<a href='https://codepen.io/chriscoyier'>@chriscoyier</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### 它是一个块级元素吗？

#### 知道元素的高度吗？

不知道网页布局的高度是相当常见的，有很多原因：如果文本的宽度改变，那么重布局时高度就会改变；文本样式的改变会改变高度；文本数量改变会改变高度；具有固定纵横比的元素（如图像），会在尺寸改变时影响高度。Etc。

但是如果你明确地知道高度，可以像这样使其垂直居中：

```css
.parent {
  position: relative;
}
.child {
  position: absolute;
  top: 50%;
  height: 100px;
  margin-top: -50px;/* account for padding and border if not using box-sizing: border-box; */
}
```

<iframe height='265' scrolling='no' title='Center Block with Fixed Height' src='//codepen.io/chriscoyier/embed/HiydJ/?height=265&theme-id=light&default-tab=css,result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/chriscoyier/pen/HiydJ/'>Center Block with Fixed Height</a> by Chris Coyier  (<a href='https://codepen.io/chriscoyier'>@chriscoyier</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>


#### 未知元素高度？

没关系。你仍然可以使用类似上面的方法使其居中。先将其绝对定位至父元素半高位置，再提升自身半高距离即可。

```css
.parent {
  position: relative;
}
.child {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
```

<iframe height='265' scrolling='no' title='Center Block with Unknown Height' src='//codepen.io/chriscoyier/embed/lpema/?height=265&theme-id=light&default-tab=css,result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/chriscoyier/pen/lpema/'>Center Block with Unknown Height</a> by Chris Coyier  (<a href='https://codepen.io/chriscoyier'>@chriscoyier</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>


你可以使用 [flexbox](http://css-tricks.com/snippets/css/a-guide-to-flexbox/) 吗？

如果可以，那就相当简单了。

```css
.parent {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
```

<iframe height='265' scrolling='no' title='Center Block with Unknown Height with Flexbox' src='//codepen.io/chriscoyier/embed/FqDyi/?height=265&theme-id=light&default-tab=css,result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/chriscoyier/pen/FqDyi/'>Center Block with Unknown Height with Flexbox</a> by Chris Coyier  (<a href='https://codepen.io/chriscoyier'>@chriscoyier</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## 水平且垂直居中

你可以将前面的方法任意组合起来，实现完美的居中效果。但是我发现通常可以将其分为三类：

### 元素有固定的宽度和高度吗？

先将元素绝对定位至50%／50%位置，然后加入负margin值，使该值等于高度和宽度的一半（注：元素如果有padding要记得计算进去，参考下例）。这样就可以使元素水平且垂直居中，并具有良好的浏览器兼容性。

```css
.parent {
  position: relative;
}
.child {
  width: 300px;
  height: 100px;
  padding: 20px;
  
  position: absolute;
  top: 50%;
  left: 50%;
  
  margin: -70px 0 0 -170px;
}
```

<iframe height='265' scrolling='no' title='Center Block with Fixed Height and Width' src='//codepen.io/chriscoyier/embed/JGofm/?height=265&theme-id=light&default-tab=css,result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/chriscoyier/pen/JGofm/'>Center Block with Fixed Height and Width</a> by Chris Coyier  (<a href='https://codepen.io/chriscoyier'>@chriscoyier</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### 元素的宽度与高度未知？

如果你不知道该元素的宽高，可以将它的`transform`属性设置为`translate(-50%, -50%)`。也可以达到相同的效果。

```css
.parent {
  position: relative;
}
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

<iframe height='265' scrolling='no' title='Center Block with Unknown Height and Width' src='//codepen.io/chriscoyier/embed/lgFiq/?height=265&theme-id=light&default-tab=css,result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/chriscoyier/pen/lgFiq/'>Center Block with Unknown Height and Width</a> by Chris Coyier  (<a href='https://codepen.io/chriscoyier'>@chriscoyier</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### 你可以使用flexbox吗？

在水平和垂直两个方向上居中元素，你需要用到flex的两个属性：

```css
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

<iframe height='265' scrolling='no' title='Center Block with Unknown Height and Width with Flexbox' src='//codepen.io/chriscoyier/embed/msItD/?height=265&theme-id=light&default-tab=css,result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/chriscoyier/pen/msItD/'>Center Block with Unknown Height and Width with Flexbox</a> by Chris Coyier  (<a href='https://codepen.io/chriscoyier'>@chriscoyier</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>


### 你可以使用 `grid` 吗?

这是一个小技巧，对单个元素来说非常有效：

```css
body, html {
  height: 100%;
  display: grid;
}
span { /* thing to center */
  margin: auto;
}
```

<iframe height='265' scrolling='no' title='Centering with Grid' src='//codepen.io/chriscoyier/embed/NvwpyK/?height=265&theme-id=light&default-tab=css,result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/chriscoyier/pen/NvwpyK/'>Centering with Grid</a> by Chris Coyier  (<a href='https://codepen.io/chriscoyier'>@chriscoyier</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>


## 结论

You can totally center things in CSS !!!

__附：文中涉及到了Flex的一些用法，如果没有接触过Flex布局，可以参考这篇指南：[Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)__

<div class="callout">

原文： [Centering in CSS: A Complete Guide](https://css-tricks.com/centering-css-complete-guide/#center-horizontally) BY [CHRIS COYIER ](https://css-tricks.com/author/chriscoyier/)ON SEPTEMBER 2, 2014

</div>
