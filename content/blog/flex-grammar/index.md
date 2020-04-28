---
title: Flex 语法总结
date: '2018-04-22'
category: CSS
description: 哪个属性又搞不清了？
---

## 声明为Flex布局

```css
.box { display: flex; } /* container */
.inline-box { display: inline-flex; } /* inline */
```

_注意_：

* _webkit内核浏览器，必须加`-webkit`前缀。_
* _子元素的`float`、`clear`、`vertical-align`属性将失效_

## 基本概念

![flex](https://user-images.githubusercontent.com/30484000/37039826-593142e4-2193-11e8-94a9-db666511e31e.png)

参考上图：

1. flex container ／ flex item
2. main axis （main start | main end）
3. cross axis（cross start | cross end）
4. item沿主轴排列 - 占据空间 main size | cross size

## 容器属性

overview：

```
flex-direction
flex-wrap
flex-flow
justify-content
align-items
align-content
```

### flex-direction

决定主轴方向。可能值：

* row(default): 主轴为水平方向，起点在左
* row-reverse: 水平，右
* column: 垂直，上沿
* column: 垂直，下沿

### flex-wrap

item默认排在一条轴线上。该属性定义如果一条轴线排不下时如何换行。

可能值：

* nowrap(default): 不换行
* wrap: 换至下行
* wrap-reverse: 换至上行

### flex-flow

```
.box {
    flex-flow: <flex-direction> || <flex-wrap>;
}
```

default: `row nowrap`

### justify-content

定义item在main axis上的对齐方式。可能值：

* flex-start(default): 左对齐
* flex-end: 右对齐
* center: 居中
* space-between: 两端对齐，item之间的间隔相等
* space-around: 每个item两侧的间隔相等。

### align-item

定义item在cross axis上的对齐方式。可能值：

* flex-start: 交叉轴起点对齐
* flex-end: 终点对齐
* center: 中点对齐
* baseline: item的第一行文字的基线对齐
* stretch(default): 占满容器高度（如未设置高度或为auto）

### align-content

定义了多根轴线的对齐方式。可能值：

* flex-start: 与交叉轴起点对齐
* flex-end: 终点对齐
* center: 中点对齐
* space-between: 两端对齐，轴线之间的间隔平均分布
* space-around: 每根轴线两侧间隔相等
* stretch(default): 轴线占满整个交叉轴

## 项目属性

overview:

```
order
flex-grow
flex-shrink
flex-basis
flex
align-self
```

### order

定义项目的排列顺序。数值越小，排列越靠前。default -> 0

### flex-grow

定义item的放大比例。default -> 0，即如果存在剩余空间，也不放大。

### flex-shrink

定义item的缩小比例。default -> 1，即如果空间不足，该item将缩小。

### flex-basis

定义在分配多余空间之前，item占据的主轴空间（main size）。default -> auto，即项目的本来大小。

### flex

```
.item {
    flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```

快捷值：`auto`(`1 1 auto`)和 `none`(`0 0 auto`)

### align-self

允许单个项目与其他项目不一样的对齐方式，可覆盖`align-items`属性。default -> auto，表示继承父元素的`align-item`属性。（else -> stretch)

```
.item {
    align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```

# Reference

* http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html
