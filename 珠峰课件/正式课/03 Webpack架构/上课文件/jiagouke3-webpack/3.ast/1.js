let esprima = require('esprima');
let estraverse = require('estraverse');
let escodegen = require('escodegen')
/* console.log(escodegen);
let sourceCode = `function ast(){}`;
//esprima可以源代码转成一个抽象语法树
let ast = esprima.parse(sourceCode);
//console.log(ast);
//estraverse 用来 遍历语法树上的所有节点，然后可以处理你关心的节点
//遍历过程是一个深度优先的过程 
let indent = 0;
const padding = ()=>' '.repeat(indent);
//这里其实用了一个设计模式，访问器模式
//遍历并且转换语法树
estraverse.traverse(ast,{
    enter(node){
        console.log(padding()+node.type+'进入');
        if(node.type === 'FunctionDeclaration'){
            node.id.name = 'newAST';
        }
        indent+=2;
    },
    leave(node){
        indent-=2;
        console.log(padding()+node.type+'离开');
    }
});

let targetCode = escodegen.generate(ast);
console.log(targetCode); */

function transform(sourceCode){
    let ast = esprima.parse(sourceCode);
    estraverse.traverse(ast,{
        enter(node){
            if(node.type === 'ArrowFunctionExpression'){
                node.type = 'FunctionExpression';
            }
        }
    });
    
    let code = escodegen.generate(ast);
    return {code};
}
exports.transform = transform;