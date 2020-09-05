# 学习笔记

## 寻路（搜索）问题

+ 寻路中广度优先遍历搜索(BFS)较为适合
+ 可以使用启发式搜索(A/A*)提高效率
+ 选择合适的数据结构可极大地减少复杂度

## 使用LL算法构建AST

### 分析四则运算

+ TokenNumber:
  + 1 2 3 4 5 6 7 8 9 0的组合
+ Operator:
  + +、 -、 *、 /之一
+ Whitespace:
  + \<SP\>
+ LineTerminator:
  + \<LF\> \<CR\>

### 四则运算的JS产生式

```sh
<Expression>::=
  <AdditiveExpression><EOF>

<AdditiveExpression>::=
  <MultiplicativeExpression>
  |<AdditiveExpression><+><MultiplicativeExpression>
  |<AdditiveExpression><-><MultiplicativeExpression>

<MultiplicativeExpression>::=
  <Number>
  |<MultiplicativeExpression><*><Number>
  |<MultiplicativeExpression></><Number>
```

+ LL语法分析

```sh
<AdditiveExpression>::=
  <MultiplicativeExpression>
  |<AdditiveExpression><+><MultiplicativeExpression>
  |<AdditiveExpression><-><MultiplicativeExpression>
```

将`<MultiplicativeExpression>`展开变为

```sh
<AdditiveExpression>::=
  <Number>
  |<MultiplicativeExpression><*><Number>
  |<MultiplicativeExpression></><Number>
  |<AdditiveExpression><+><MultiplicativeExpression>
  |<AdditiveExpression><-><MultiplicativeExpression>
```
