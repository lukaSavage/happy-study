/**
 * 配置文件是可以有层次结构 可以继承
 * 进行代码需要首先把源代码转化为抽象语法树(后面会有在的篇幅讲AST 和babel)
 */
module.exports = {
  root:true, //这个不再是一个根配置文件
  //extends: 'airbnb', // 继承自airbnb提供的配置文件
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2015,
  },
  env: {
    browser: true, // window.a
    node: true,
  },
  // 启用的代码检查规则和各自的错误级别
  // 先进行代码检查 ，如果发现不正确 ，会尝试修复，如果修复成果，接着执行
  rules: {
    indent: ["error", 2], // 缩进风格
    quotes: "off", // 引号的类型
    "no-console": "off", // 禁止使用console.log
    "linebreak-style": "off",
  },
};
