const regexp = /([0-9\.]+)|([ \t]+)|([\r\n]+)|(\*)|(\/)|(\+)|(\-)/g;

const dictionary = [
  "Number",
  "Whitespace",
  "LineTerminator",
  "*",
  "/",
  "+",
  "-",
];

function* tokenize(source = "") {
  let result = null;
  let lastIndex = 0;
  while (true) {
    lastIndex = regexp.lastIndex;
    result = regexp.exec(source);

    if (!result) break;
    if (regexp.lastIndex - lastIndex > result[0].length) {
      throw new Error("Unrecognized token");
    }

    let token = {
      type: null,
      value: null,
    };

    for (let i = 1; i <= dictionary.length; i++) {
      if (result[i]) token.type = dictionary[i - 1];
    }
    token.value = result[0];
    yield token;
  }

  yield {
    type: "EOF",
  };
}

const source = [];

for (const token of tokenize("1 + 2 * 5 + 3")) {
  if (token.type !== "Whitespace" && token.type !== "LineTerminator")
    source.push(token);
}

const MULTIPLICATIVE_EXPRESSION = "MultiplicativeExpression";
const ADDITIVE_EXPRESSION = "AdditiveExpression";
const EOF = "EOF";

function Expression(tokens = [{ type, value }]) {
  if (tokens[0].type === ADDITIVE_EXPRESSION && tokens[1]?.type === EOF) {
    const node = {
      type: "Expression",
      children: [source.shift(), source.shift()],
    };
    source.unshift(node);
    return node;
  }
  AdditiveExpression(tokens);
  return Expression(tokens);
}

function AdditiveExpression(source = [{ type, value }]) {
  if (source[0].type === MULTIPLICATIVE_EXPRESSION) {
    const node = {
      type: ADDITIVE_EXPRESSION,
      children: [source[0]],
    };
    source[0] = node;
    return AdditiveExpression(source);
  }

  if (source[0].type === ADDITIVE_EXPRESSION && source[1]?.type === "+") {
    const node = {
      type: ADDITIVE_EXPRESSION,
      operator: "+",
      children: [],
    };
    node.children.push(source.shift());
    node.children.push(source.shift());
    MultiplicativeExpression(source);
    node.children.push(source.shift());
    source.unshift(node);
    return AdditiveExpression(source);
  }

  if (source[0].type === ADDITIVE_EXPRESSION && source[1]?.type === "-") {
    const node = {
      type: ADDITIVE_EXPRESSION,
      operator: "-",
      children: [],
    };
    node.children.push(source.shift());
    node.children.push(source.shift());
    MultiplicativeExpression(source);
    node.children.push(source.shift());
    source.unshift(node);
    return AdditiveExpression(source);
  }

  if (source[0].type === ADDITIVE_EXPRESSION) {
    return source[0];
  }

  MultiplicativeExpression(source);
  return AdditiveExpression(source);
}

function MultiplicativeExpression(source = [{ type, value }]) {
  if (source[0].type === "Number") {
    const node = {
      type: MULTIPLICATIVE_EXPRESSION,
      children: [source[0]],
    };
    source[0] = node;
    return MultiplicativeExpression(source);
  }

  if (source[0].type === MULTIPLICATIVE_EXPRESSION && source[1]?.type === "*") {
    const node = {
      type: MULTIPLICATIVE_EXPRESSION,
      operator: "*",
      children: [],
    };
    node.children.push(source.shift());
    node.children.push(source.shift());
    node.children.push(source.shift());
    source.unshift(node);
    return MultiplicativeExpression(source);
  }

  if (source[0].type === MULTIPLICATIVE_EXPRESSION && source[1]?.type === "/") {
    const node = {
      type: MULTIPLICATIVE_EXPRESSION,
      operator: "/",
      children: [],
    };
    node.children.push(source.shift());
    node.children.push(source.shift());
    node.children.push(source.shift());
    source.unshift(node);
    return MultiplicativeExpression(source);
  }

  if (source[0].type === MULTIPLICATIVE_EXPRESSION) {
    return source[0];
  }

  return MultiplicativeExpression(source);
}

console.log(Expression(source));
