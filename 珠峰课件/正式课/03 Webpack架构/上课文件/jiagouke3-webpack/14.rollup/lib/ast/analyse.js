

let walk = require('./walk');
let Scope = require('./scope');
let {has} = require('../utils');
function analyse(ast, magicStringOfAst,module) {
    //在遍历之前先创建作用域对象
    let scope = new Scope({ name: '全局作用域' });
    ast.body.forEach(statement => {
        function addToScope(name,isBlockDeclaration=false) {
            let realScope = scope.add(name,isBlockDeclaration);
            if (!realScope.parent) {//如果此作用域 没有父作用域,那这就是顶级变量，根作用域下的变量，可以放在_defines=tree
                //模块内的顶级变量
                statement._defines[name] = true;
            }
        }
        //在初始化的时候 ，我们给每个statement添加了一个_defines属性，属性上放着当前节点声明的变量
        Object.defineProperties(statement, {
            _module:{value:module},//当前的模块
            _defines: { value: {} },//当前statement语法树节点声明了哪些变量
            _modifies: { value: {} },//当前statement包含的修改语句
            _dependsOn: { value: {} },//当前statement语句外部依赖的变量
            _included: { value: false, writable: true },//当前的语句是否放置在结果中，是否会出现在打包结果中
            _source: { value: magicStringOfAst.snip(statement.start, statement.end) }//key是_source 值是这个语法树节点在源码中的源代码
        });
        //如何知道某个变量有没有在当前模块内定义的呢？
        //原理是这样 扫描整个模块，找到所有的定义的变量
        //构建使用域链
        walk(statement, ast.body, {
            enter(node) {
                let newScope;
                switch (node.type) {
                    case 'FunctionDeclaration':
                        //函数的参数将会成为此函数子作用域内的局部变量
                        const names = node.params.map(param => param.name);
                        addToScope(node.id.name);//把node也就是say这个变量添加到当前作用内 
                        //如果遇到函数声明，就会产生一个新作用域
                        newScope = new Scope({ name: node.id.name, parent: scope, params: names,isBlock:false });
                        break;
                    case 'BlockStatement':
                        newScope = new Scope({ name: node.type, parent: scope, params: [],isBlock:true });
                        break;     
                    case 'VariableDeclaration':
                        node.declarations.forEach((declaration) => {
                            if(node.kind === 'let' || node.kind === 'const'){
                                addToScope(declaration.id.name,true)
                            }else  if(node.kind === 'var'){
                                addToScope(declaration.id.name,false)
                            }
                        });
                        break;
                }
                if (newScope) {//如果创建了新的作用域，那么这个作用域将会成为新的当前作用域
                    Object.defineProperty(node, '_scope', { value: newScope });
                    scope = newScope;// say这个函数作用域
                }
            },
            leave(node) {
                //当离开节点的时候 ，如果发现这个节点创建 新的作用域，就回退到使用域
                if (has(node,'_scope')) {
                    scope = scope.parent;
                }
            }
        });
    });
    //2.作用域链构建完成后，再遍历一次，找出本模块定义了依赖了哪些外部变量
    ast.body.forEach(statement => {
        function checkForReads(node) {
            if (node.type === 'Identifier') {
                //let currentScope = node._scope || scope;
                //let definingScope = currentScope.findDefiningScope(node.name);
                //如果这个变量不在当前模块内声明的话才会放到_dependsOn上去
                //if (!definingScope) {
                    //找这个statement依赖了哪些外部变量
                    //只要是使用到的变量，都放到_dependsOn上
                    statement._dependsOn[node.name] = true;
                //}
            }
        }
        function checkForWrites(node) {
            //node其实就是被赋值的变量名
            function addNode(node){
                //此节点上修改了name变量
                statement._modifies[node.name]=true;
            }
            if(node.type === 'AssignmentExpression'){
                addNode(node.left);//name='前端'
            }else if(node.type === 'UpdateExpression'){
                addNode(node.argument);//age++
            }
        }
        walk(statement, ast.body, {
            enter(node) {
                if(has(node,'_scope')){
                    scope = node._scope;
                }
                //检查 一下当前的 节点读取了哪些变量
                checkForReads(node);
                //检查一下当前的节点修改了哪些变量
                checkForWrites(node);
            },
            leave(node) {
                if(has(node,'_scope')){
                    scope = scope.parent;
                }
            }
        });
    });

}
module.exports = analyse;