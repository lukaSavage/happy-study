/**
 * 实现一个babel插件
 * 把es6 的箭头函数 变成es5的普通函数
 * cnpm i @babel/core  babel-types  babel-plugin-transform-es2015-arrow-functions -D
 */
const core = require("@babel/core");
let types = require("babel-types");
const pluginTransformClasses = {
  visitor: {
    ClassDeclaration(nodePath) {
      let { node } = nodePath;
      let { id } = node; //Person
      let classMethods = node.body.body;
      let nodes = [];
      classMethods.forEach((classMethod) => {
        if (classMethod.kind == "constructor") {
          //id=Person
          let constructorFunction = types.functionDeclaration(
            id,
            classMethod.params,
            classMethod.body,
            classMethod.generator,
            classMethod.async
          );
          nodes.push(constructorFunction);
        } else {
          //说明是一个普通函数
          let prototypeMemberExpression = types.memberExpression(
            id,
            types.identifier("prototype")
          );
          let memberExpression = types.memberExpression(
            prototypeMemberExpression,
            classMethod.key //getName
          );
          let funtionExpression = types.functionExpression(
            classMethod.key,
            classMethod.params,
            classMethod.body,
            classMethod.generator,
            classMethod.async
          );
          let assignmentExpression = types.assignmentExpression(
            "=",
            memberExpression,
            funtionExpression
          );
          nodes.push(assignmentExpression);
        }
      });
      if (nodes.length > 1) {
        debugger;
        nodePath.replaceWithMultiple(nodes);
      } else {
        nodePath.replaceWith(nodes[0]);
      }
    },
  },
};
let sourceCode = `
 class Person {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}
`;

let { code } = core.transform(sourceCode, {
  plugins: [pluginTransformClasses],
});
console.log(code);
