# 学习笔记

## 泛用语言的分类

+ 按语法分类
  + 非形式语言
    + 语法自由，无固定形式
    + 中文、英文
  + 形式语言
    + 形式化定义
    + 严谨严格

+ 形式语言的分类(乔普斯基谱系)
  0. 无限制文法
  1. 上下文相关文法
  2. 上下文无关文法
  3. 正则文法

## 产生式

+ 产生式(BNF)
  + 用尖括号包裹的名称来表示语法结构名
  + 语法结构分成基础结构和需要用其他语法结构定义的复合结构
    + 基础结构成为终结符
    + 复合结构成为非终结符
  + 引号和中间的字符表示终结符
  + 可以有括号
  + `*`表示重复多次
  + `|`表示或
  + `+`表示至少一次

+ 四则运算
  + `1 + 2 * 3`
+ 终结符
  + Number
  + \+ \- \* /
+ 非终结符
  + MultiplicativeExpression
  + AdditiveExpression

```bnf
<MultiplicativeExpression>::=<Number>|
    <MultiplicativeExpression>"*"<Number>|
    <MultiplicativeExpression>"/"<Number>|
<AdditiveExpression>::=<MultiplicativeExpression>|
    <AdditiveExpression>"+"<MultiplicativeExpression>|
    <AdditiveExpression>"-"<MultiplicativeExpression>|
```

+ 带括号的产生式

```bnf
<MultiplicativeExpression>::=<Number>|
    <MultiplicativeExpression>"*"<Number>|
    <MultiplicativeExpression>"/"<Number>|
   <LogicalExpression>
<AdditiveExpression>::=<MultiplicativeExpression>|
    <AdditiveExpression>"+"<MultiplicativeExpression>|
    <AdditiveExpression>"-"<MultiplicativeExpression>|
<LogicalExpression> ::= <Number> |
    "("<AdditiveExpression>")"
```

## 通过产生式理解乔姆斯基谱系

+ 0型 无限制文法
  + `?::=?`
+ 1型 上下文相关文法
  + `?<A>?::=?<B>?`
+ 2型 上下文无关文法
  + `<A>::?`
+ 3型 正则文法
  + `<A>::=<A>?`
  + `<A>::=?<A>`

+ JS总体上属于上下文无关文法，但有部分特例属于上下文相关文法

+ 其他产生式
  + `EBNF` `ABNF` `Customized`

```bnf
AdditiveExpression:
  MultiplicativeExpression
  AdditiveExpression +
MultiplicativeExpression
  AdditiveExpression -
MultiplicativeExpression
```

## 现代语言的分类

+ C++中，`*`可能表示乘号或者指针，具体类型取决于星号前的标识符是否声明为类型
+ VB中，`<`可能是小于号，也可能是XML直接量的开始，取决于当前位置是否可以接受XML直接量
+ Python中，行首的tab符和空格会根据上一行的行首空白以一定规则处理成虚拟终结符indent或者dedent
+ JS中，`/`可以是除号，也可以是正则表达式开头，处理方式类似VB，字符串模板中也需要特殊处理`}`，还有自动插入分号规则(ASI)

+ 语言的分类
  + 用途
    + 数据描述语言
      + JSON/HTML/XAML/SQL/CSS
    + 编程语言
      + C/C++/Java/C#/Python/Ruby/Perl/Lisp/T-SQL/Clojure/Haskell/JavaScript
  + 表达方式
    + 声明式语言
      + JSON/HTML/XAML/SQL/CSS/Lisp/Clojure/Haskell
    + 命令式语言
      + C/C++/Java/C#/Python/Ruby/Perl/JavaScript

## 编程语言的性质

+ 图灵完备性
  + 命令式 - 图灵机
    + goto
    + if/while
  + 声明式 - lambda
    + 递归

+ 动态与静态
  + 动态
    + 在用户设备/在线服务器上
    + 产品实际运行时
    + Runtime
  + 静态
    + 编程设备上
    + 产品开发时
    + CompileTime

+ 类型系统
  + 动态类型系统与静态类型系统
  + 强类型与弱类型
    + String + Number
    + String == Boolean
  + 复合类型
    + 结构体
    + 函数签名
  + 子类型
  + 泛型
    + 逆变/协变

## 一般命令式语言的设计方式

+ 一般命令式编程语言会有五个层级结构
  1. Atom
     + Identifier
     + Literal
  2. Expression
     + Atom
     + Operator
     + Punctuator
  3. Statement
     + Expression
     + Keyword
     + Punctuator
  4. Structure
     + Function
     + Class
     + Process
     + Namespace
     + ...
  5. Program
     + Program
     + Module
     + Package
     + Library

+ 语法 -> 语义 -> 运行时

## JS类型 | Number

+ Atom
  + Grammar
    + Literal
    + Variable
    + Keywords
    + Whitespace
    + Line Terminator
  + Runtime
    + Types
    + Execution Context

+ Types
  + Number
  + String
  + Boolean
  + Object
  + Null
  + Undefined
  + Symbol
  + Bigint

+ Number
  + IEEE 754 Double Float
    + Sign(1)
    + Exponent(11)
    + Fraction(52)
  + Grammar
    + DecimalLiteral
      + 0
      + 0.
      + .2
      + 1e3
    + BinaryIntegerLiteral
      + 0b111
    + OctalIntegerLiteral
      + 0o10
    + HexIntegerLiteral
      + 0xFF

## JS类型 | String

+ String
  + Character
  + Code Point
  + Encoding

+ String
  + ASC||
  + Unicode
  + UCS
  + GB
    + GB2312
    + GBK(GB13000)
    + GB18030
  + ISO-8859
  + BIG5

+ String -  Encoding
  + UTF

+ String - Grammar
  + `"abc"`
  + `'abc'`
  + \`abc\`

+ String - Grammar - Template
  + \`ab${x}abc${y}abc\`
    + \`ab${
    + }abc${
    + }abc\`

## JS类型 | 其他类型

+ Boolean
  + true
  + false

+ Null & Undefined
  + null
  + undefined
  + void 0;

## JS对象 | 对象的基础知识

+ 对象是唯一的，与对象本身的状态无关
+ 状态完全相同的额两个对象，也并不相等
+ 用状态描述对象
+ 状态的改变即是行为

+ Object
  + state
  + identifier
  + behavior

+ Class
  + 类是常见的描述对象的方式
  + “归类"和"分类"是两个主要流派
  + 对于"归类"方法而言，多继承是非常自然地事情，例如C++
  + 采用"分类"思想的计算机语言，则是单继承结构，并且会有一个基类Object

+ Prototype
  + 原型是一种更接近人类原始认知的描述对象的方法
  + 并不试图做严谨的分类，而是采用“相似”这样的方式去描述对象
  + 任何对象仅仅需要描述它自己与原型的区别即可

+ 我们不应该受到语言描述的干扰，在设计对象的状态和行为时，我们应遵循“行为改变状态"的原则。

## JS对象 | JS中的对象

+ Object in JavaScript
  + 在JavaScript运行时，原生对象的描述方式非常简单，我们只需关心原型和属性两部分

+ Object
  + Property
  + \[\[Prototype\]\]

+ Object - key -> value
  + key
    + string
    + symbol
  + value
    + data
      + \[\[value\]\]
      + writeable
      + enumerable
      + configurable
    + accessor
      + get
      + set
      + enumerable
      + configurable

+ JavaScript用属性来同一抽象对象状态和行为
+ 一般来说，数据属性用于描述状态，访问器属性用于描述行为
+ 数据属性中如果存储函数，也可以用于描述行为

+ 原型机制
  + 当我们访问属性的时候，如果当前对象没有，则会沿着原型找到原型对象是都由此名称的属性，而原型对象也可能有原型，因此，会有”原型链“这一说法
  + 这一算法保证了每个对象只需要描述自己和原型的区别即可

+ Object API/Grammar
  + `{}` `.` `Object.defineProperty`
  + `Object.create`/`Object.setPrototypeOf`/`Object.getPrototypeOf`
  + `new`/`class`/`extends`
  + `new`/`function`/`prototype`

+ Function Object
  + JavaScript中还有一些特殊对象，比如函数对象
  + 除了一般对象的原型和属性，函数对象还有一个行为\[\[call\]\]
  + 我们用JavaScript中的function关键字、箭头运算符或者Function构造函数创建的对象，会\[\[call\]\]这个行为
  + 我们使用()语法把对象当做函数调用时，会访问到\[\[call\]\]这个行为
  + 如果对应的对象没有\[\[call\]\]这个行为，则会报错

+ Special Object
  + Array\[\[length\]\]
  + Object.prototype\[\[setPrototypeOf\]\]

+ Host Object
  + Object\[\[call\]\]\[\[construct\]\]
