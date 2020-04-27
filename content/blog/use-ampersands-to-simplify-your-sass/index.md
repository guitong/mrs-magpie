---
title: 如何利用`&`来简化你的Sass
date: '2018-05-19'
---

>  [_How To Use Ampersands To Simplify Your Sass_](https://seesparkbox.com/foundry/how_to_use_ampersands_to_simplifiy_your_sass)
>  Author: [PHILIP ZASTROW](https://seesparkbox.com/foundry/author/philip_zastrow)

`&`（ampersand）是一个神奇的字符。它是一个古老的符号，是来源于拉丁语“Et”的一个连字符，可用于连接单词、短语和`thoughts？`。如今，`&`的使用变得更多样化，但是`&`仍然保持了它原始的含义 — `and`, `as well as` 或 `this too`。在Sass中，`&`引用声明块的父选择器，允许其在自己的内部被引用。这意味着，诸如伪类选择器（pseudo selectors）、同胞选择器（sibling selectors）等可以使用该选择器的其他声明来引用和分组。`&`是组织和扩展Sass的强大工具。

## 伪类选择器

在我的Sass中，`&`最常见的用途之一是伪类选择器。These include the `:hover`, `:active`, and `:focus` found accompanying selectors like `<a>` and `<input>`.当在Sass中使用`&`时，可以为`<a>`声明单个块。然后在该声明块中，`<a>`可以使用`&:hover`、`&:active`和`&:focus`来引用。看下面的例子：

Sass

```scss
a {
  color: #0090B2;
  &:hover {
    color: #FF7A00;
  }
  &:active {
    color: #B25500;
  }
}
```

CSS

```css
a {
  color: #0090B2;
}
a:hover {
  color: #FF7A00;
}
a:active {
  color: #B25500;
}
```

[See this example on Sassmeister](http://sassmeister.com/gist/bcce995ec37a765e871f)

这些伪类选择器只是开始，还有更多如`:nth-child`、`:target`、`:checked`等等。

## 添加一个Class或者ID

由于`&`引用最顶端选择器，我们可以使用额外的类和/或id（就像伪类选择器一样）去扩展功能。让我们假设现在有一个`.feature-class`选择器，它有另外一个实例匹配选择器`.style-class`，添加这个类将会改变它的外观。在`.feature-class`声明块中，我们将声明一个以`&.style-class`开头的子块。Sass将使用`.feature-class`替代`&`，在生成的CSS中变成了`.feature-class.style-class`。让我们更新上面的例子，并将元素选择器`<a>`替换为类选择器`.feature-class`。

Sass

```scss
.feature-class {
    color: #0090b2;
    &:hover {
        color: #FF7A00;
    }
    &:active {
        color: #B25500;
    }
    &.style-class {
        color: #00CEFF;
        &:hover {
            color: #0090b2;
        }
        &:active {
            color: #FF7A00;
        }
    }
}
```

CSS

```css
.feature-class {
  color: #0090B2;
}
.feature-class:hover {
  color: #FF7A00;
}
.feature-class:active {
  color: #B25500;
}
.feature-class.style-class {
  color: #00CEFF;
}
.feature-class.style-class:hover {
  color: #0090B2;
}
.feature-class.style-class:active {
  color: #FF7A00;
}
```

[See this example on Sassmeister.](http://sassmeister.com/gist/38e118ac945979d59d62)

注意到，`&.style-class`声明块拥有自己的`&:hover`和`&:active`，它允许伪类选择器仅作用于特定组合类的实例。虽然可以进行更深层级的嵌套，但是超出四个层级后就会变得混乱并难以管理。

## 子选择器中的父选择器

理解`&`的力量的关键在于它在选择器声明中的位置。上面两个例子中，`&`都是作为第一个字符，但是它也可以被声明在后面。在包含选择器的父项导致选择器样式发生变化的情况下，我们可以从选择器的声明块中引用父选择器。这可以通过在新的声明块中`&`的前方添加父选择器来实现。所以，当我们的类`.feature-class`需要在作为`.parent-class`的子类时改变的场景下，我们可以在`.feature-class`声明块中作出改变。比如下面这个例子：

Sass

```scss
.feature-class {
    color: #0090B2;
    .parent-class & {
        color: #00CEFF;
    }
}
```

CSS

```css
.feature-class {
    color: #0090B2;
}
.parent-class .feature-class {
    color: #00CEFF;
}
```

[See this example on Sassmeister.](http://sassmeister.com/gist/1b2a288ee3fac6a0d758)

当我们在`<html>`标签上有条件类时，这个特性将非常有用。比如对于IE浏览器，我们可以简单地在声明块中添加一个`.lt-ie9 &`，即可添加任何针对IE8或更低版本的样式。

## 同胞（Siblings）

我最喜欢的使用`&`的方式是相邻同胞选择器（adjacent sibling selectors）。只要当有一个选择器需要更改，且它相邻另一个选择器时，就会出现这种类型的选择器。通常，我使用相邻同胞选择器修改相同选择器在HTML中并列排布的布局，比如段落（paragraphs）或列表项目（list items）。下面的例子，我们将设置`<p>`没有外边距（margin），但是当其相邻一个`<p>`时则添加边距。

Sass

```scss
p {
    margin: 0;
    line-height: 1.5em;
    & + & {
        margin-top: 1em;
    }
}
```

CSS

```css
p {
    margin: 0;
    line-height: 1.5em;
}
p + p {
    margin-top: 1em;
}
```

[See this example on Sassmeister.](http://sassmeister.com/gist/b1ea527be946094462a5)

当然，这不局限于相同元素。或许你不想在一个`<h1>`后添加外边距，除非之后紧挨着`<h2>`。

Sass

```scss
h1, h2, h3 {
  margin: 0;
}

h1 {
  & + h2 {
    margin-top: 1em;
  }
}
```

CSS

```css
h1, h2, h3 {
  margin: 0;
}

h1 + h2 {
  margin-top: 1em;
}
```

[See this example on Sassmeister.](http://sassmeister.com/gist/22d0c99b50d349ac1821)

同样地，通用同胞和子组合选择器都可以通过用`+`、`~`和`>`分别替换`+`来为声明块编写适当的样式。

## 总结

明确地，我们仅仅讨论了Sass中`&`的力量。混合使用上面讨论过的不同形式的组合，可以实现更多的效果。你可能会遇到这样的情况：你需要定位选择器的同胞，但仅当它有特定父元素时（e.g. `.parent-class & + .sibling-class`)。At that point, you can take `&` to the next level by using it with mixins and extend to make wonderfully usable code — sky's the limit.So dream big, but not too big.

（完）
