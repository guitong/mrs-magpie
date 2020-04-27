---
title: 'JavaScript: 优化循环'
date: '2018-03-31'
---

>   原文见： [JavaScript: Optimizing loops](https://jaysoo.ca/2009/12/23/javascript-optimizing-loops/)

当你需要遍历一个非常庞大的数组时，你会发现这很有用：使用 `while` 循环而不是 `for` 循环。

例如，现在有如下的代码：

```javascript
var myArray = new Array(10000);
for (var i=0; i<myArray.length; i++) {
  myArray[i] = i;
}
```

你可以使用`while`循环让它运行的更快：
<!-- more -->
```javascript
var myArray = new Array(10000);
var n = myArray.length;
while (n--) {
  myArray[n] = n;
}
```

它的原理在于`n--`将会先返回`n`的值再去递减它。所以当它接近索引零时，它会计算`1`为`true`，然后在`myArray[n]=n;`这行之前递减`n`。

然而，你会发现这种循环是逆向的，所以如果你对循环的顺序有要求的话就不能用这种方法。不过你仍然可以优化第一个例子--通过先将`myArray.length`赋值给一个变量，然后再在for循环的退出条件语句中使用它。这将会使它运行的快一些（取决于你使用的浏览器），因为这样可以避免在每次循环中都进行属性查找。（即`myArray.length`）。代码如下：

```javascript
var myArray = new Array(10000);
var n = myArray.length;
for (var i=0; i<n; i++) {
  myArray[i] = i;
}
```
