/**
 * 实现一个babel插件
 * 把es6 的箭头函数 变成es5的普通函数
 * cnpm i @babel/core  babel-types  babel-plugin-transform-es2015-arrow-functions -D
 */
const core = require("@babel/core");
let types = require("babel-types");
//let babelPluginTransformEs2015ArrowFunctions = require("babel-plugin-transform-es2015-arrow-functions");
//访问者visitor 迭代器模式 iterator for(let key of obj){}
let babelPluginTransformEs2015ArrowFunctions = {
  visitor: {
    //属性就是我这个插件关心或者说要处理的节点的类型
    ArrowFunctionExpression(nodePath) {
      debugger;
      let node = nodePath.node;
      hoistFunctionEnvironment(nodePath);
      node.type = "FunctionExpression";
    },
  },
};
//fnPath  parentPath
function hoistFunctionEnvironment(fnPath) {
  fnPath.findParent = function (judge) {
    let parentPath = this.parentPath;
    while (parentPath) {
      if (judge(parentPath)) {
        return parentPath;
      } else {
        parentPath = parentPath.parentPath;
      }
    }
  };
  const thisEnvFn = fnPath.findParent((p) => {
    //return (types.isFunction(p.node) && !types.isArrowFunctionExprssion(p.node)) || types.isProgram(p.node);
    return (p.isFunction() && !p.isArrowFunctionExprssion()) || p.isProgram();
  });
  let thisPaths = getScopeInfomation(fnPath); //[]
  if (thisPaths.length > 0) {
    let thisBinding = "_this";
    //types 1.用来判断某个节点是不是某个类型 2 用来创建一个新的节点
    let _thisIdentifier = types.identifier(thisBinding);
    let _thisVariableDeclarator = types.variableDeclarator(
      _thisIdentifier,
      types.thisExpression()
    );
    thisEnvFn.scope.push(_thisVariableDeclarator);
    thisPaths.forEach((thisPath) => {
      thisPath.replaceWith(_thisIdentifier);
    });
  }
}
function getScopeInfomation(fnPath) {
  let thisPaths = [];
  fnPath.traverse({
    ThisExpression(thisPath) {
      thisPaths.push(thisPath);
    },
  });
  return thisPaths;
}
let sourceCode = `
  const sum = (a,b)=>{
      console.log(this);
      console.log(this);
      return a+b;
  }
`;

let { code } = core.transform(sourceCode, {
  plugins: [babelPluginTransformEs2015ArrowFunctions],
});
console.log(code);
