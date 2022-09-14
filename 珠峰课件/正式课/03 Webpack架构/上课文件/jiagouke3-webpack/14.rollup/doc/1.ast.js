const acorn = require('acorn');
let sourceCode = `import $ from 'jquery';`;
let walk = require('./walk');
//acorn只负责把源代码转成语法树
const ast = acorn.parse(sourceCode,{
    locations:true,ranges:true,sourceType:'module',ecmaVersion:8
});
let ident = 0;
const padding = ()=>' '.repeat(ident);
ast.body.forEach(statement=>{
    debugger
    walk(statement,ast,{
        enter(node,parent){
            if(node.type){
                console.log(padding()+node.type);
                ident+=2;
            }
        },
        leave(node,parent){
            if(node.type){
                ident-=2;
                console.log(padding()+node.type);
            }
        }
    });
});
// 遍历的时候采用的是深度优先的方式