---
title: 杂记 ❥ 一
date: '2019-02-27'
---

## 1. 如何写出更好的JS条件语句 ?

>  https://mp.weixin.qq.com/s/JMwPdQSSTLWPSrLda5Yo5g

5条建议，写出更好的条件语句：

1. 多重判断时使用 Array.includes
2. 更少的嵌套，尽早 return
3. 使用默认参数和解构
4. 倾向于遍历对象而不是 Switch 语句
5. 对 所有/部分 判断使用 Array.every & Array.some

对第四点，举个例子，根据颜色打印水果:

```javascript
function test(color) {
  // 使用条件语句来寻找对应颜色的水果
  switch (color) {
    case 'red':
      return ['apple', 'strawberry'];
    case 'yellow':
      return ['banana', 'pineapple'];
    case 'purple':
      return ['grape', 'plum'];
    default:
      return [];
  }
}

// test results
test(null); // []
test('yellow'); // ['banana', 'pineapple']
```

可以这样写：

```javascript
const fruitColor = {
  red: ['apple', 'strawberry'],
  yellow: ['banana', 'pineapple'],
  purple: ['grape', 'plum']
};

function test(color) {
  return fruitColor[color] || [];
}
```

或者使用 `Map` 实现：

```javascript
const fruitColor = new Map()
    .set('red', ['apple', 'strawberry'])
    .set('yellow', ['banana', 'pineapple'])
    .set('purple', ['grape', 'plum']);

function test(color) {
  return fruitColor.get(color) || [];
}
```

## 2. 如何用gatsby搭建博客并部署到Github?

1. 直接使用模版  [https://github.com/gatsbyjs/gatsby-starter-blog](https://github.com/gatsbyjs/gatsby-starter-blog) 

2. 发布

```shell
$ npm i gh-pages --save-dev

//然后在package.json的scripts中加上
"scripts":{
  ...,
  "deploy": "gatsby build --prefix-paths && gh-pages -d public"
}
```

3. 在gatsby.config.js中设置的你项目地址，

```javascript
module.exports = {
  pathPrefix: `/project-name`,
}
```

4. `git remote -v` 检查是否项目有链接到你线上地址中，如果没有的话，
首先 `git init`，然后

```sh
git remote add origin git@github.com:username/project-name.git
```

最后运行 `npm run deploy` 即可。等几分钟你就能在线上看到你项目啦（如果没有请去项目地址查看，可能在另一分支上面，只是你需要合并一下就可以啦！）


## ES6 Symbol

> [ECMAScript 6 入门 #Symbol By 阮一峰](http://es6.ruanyifeng.com/#docs/symbol)

引入原因：保证对象的每个属性是惟一的，防止属性名冲突。

> Symbol是一种新的原始数据类型，之前的六种是：null, undefined, Boolean, String, Number, Object.

### 创建一个Symbol：

```javascript
let s = Symbol()
```

Symbol值可以转为 `字符串`，也可以转为 `布尔值`。

### 作为属性名

```javascript
let mySymbol = Symbol();

// 第一种写法
let a = {};
a[mySymbol] = 'Hello!';

// 第二种写法
let a = {
  [mySymbol]: 'Hello!'
};

// 第三种写法
let a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });

// 以上写法都得到同样结果
a[mySymbol] // "Hello!"
```

- 不能用点运算符
- Symbol值必须在方括号中
- 为公开属性

### 遍历属性名

> Symbol 作为属性名，该属性不会出现在`for...in`、`for...of`循环中，也不会被`Object.keys()`、`Object.getOwnPropertyNames()`、`JSON.stringify()`返回。但是，它也不是私有属性，有一个`Object.getOwnPropertySymbols`方法，可以获取指定对象的所有 Symbol 属性名。


`Object.getOwnPropertySymbols` 方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。

另一个新的 API，`Reflect.ownKeys` 方法可以返回所有类型的键名，包括常规键名和 Symbol 键名。


### 例子: 消除魔术字符串

> 魔术字符串指的是，在代码之中多次出现、与代码形成强耦合的某一个具体的字符串或者数值。

常用的消除魔术字符串的方法，就是把它写成一个变量。

```javascript
function getArea(shape, options) {
  let area = 0;

  switch (shape) {
    case 'Triangle': // 魔术字符串
      area = .5 * options.width * options.height;
      break;
    /* ... more code ... */
  }

  return area;
}

getArea('Triangle', { width: 100, height: 100 }); // 魔术字符串
```


改为：

```javascript
const shapeType = {
  triangle: Symbol()
};

function getArea(shape, options) {
  let area = 0;
  switch (shape) {
    case shapeType.triangle:
      area = .5 * options.width * options.height;
      break;
  }
  return area;
}

getArea(shapeType.triangle, { width: 100, height: 100 });
```

