
const MagicString = require('magic-string');
const {parse} = require('acorn');
const analyse = require('./ast/analyse');
const { has } = require('./utils');
const SYSTEM_VARS = ['console','log'];
class Module {
    constructor({ code, path, bundle }) {
        this.code = new MagicString(code, { filename: path });
        this.path = path;
        this.bundle = bundle;
        this.ast = parse(code,{
            ecmaVersion:8,
            sourceType:'module'
        });
        this.imports = {};//导入
        this.exports = {};//导出
        this.definitions = {};//此变量存放所有的变量定义的语句
        this.modifications = {};//包含了，放置着变量的修改语句
        this.canonicalNames = {};//规范化名称
        this.analyse();
    }
    //当前模块内哪个名称需要被替换成什么名称
    rename(localName,replacement){
        this.canonicalNames[localName]= replacement;
    }
    //当你想给一个变量重命名了，应该如何命令呢?

    getCanonicalName(localName){
        if(!has(this.canonicalNames,localName)){
            return this.canonicalNames[localName]=localName;
        }
        return this.canonicalNames[localName];
    }
    analyse(){
        this.ast.body.forEach(statement=>{
             //1.给import赋值 
            if(statement.type === 'ImportDeclaration'){
                let source = statement.source.value;//./msg
                statement.specifiers.forEach(specifier=>{
                    let importName = specifier.imported.name;//age
                    let localName = specifier.local.name;//age
                    //记录一下当前的这个引入的变量是从哪个模块的哪个变量导入进来的
                    this.imports[localName]={localName,source,importName};
                });
            //2.this.exports赋值
            }else if(statement.type==='ExportNamedDeclaration'){
                let declaration = statement.declaration;
                if(declaration.type === 'VariableDeclaration'){
                    const declarations = declaration.declarations;
                    declarations.forEach(variableDeclarator=>{
                        let localName = variableDeclarator.id.name;
                        //this.exports.age = {localName:'age',exportName:'age',expression:};
                        this.exports[localName]={localName,exportName:localName,expression:declaration};
                    });
                }
            }
        });
        //1.构建了作用域 2.找到模块块依赖了哪些外部变量
       analyse( this.ast ,this.code,this);
       this.ast.body.forEach(statement=>{
           Object.keys(statement._defines).forEach(name=>{
               //当前模块内 定义name这个变量的语句是statement
               //main.js  type   let type = 'dog';
               //key是变量名 值是定义变量的语名
               this.definitions[name]=statement;
           });
           Object.keys(statement._modifies).forEach(name=>{
              if(has(this.modifications,name)){
                this.modifications[name].push(statement);
              }else{
                this.modifications[name]=[statement]
              }
        });
       });
    }
    expandAllStatements(){
        let allStatements = [];
        this.ast.body.forEach(statement=>{
            if(statement.type === 'ImportDeclaration'){//不再需要import语句
                return;
            }
            if(statement.type === 'VariableDeclaration'){//不需要自动包含变量声明语句
                return;
            }
            let statements = this.expandStatement(statement);
            //我们要把statement进行扩展，有可能一行变多行var name ='zhufeng', console.log('name'); TODO
            allStatements.push(...statements);
        });
        return allStatements;
    }
    //展开单 条语句  console.log(name,age);
    expandStatement(statement){
        statement._included = true;// 把当前语句标记为包含
        let result = [];
        //_dependsOn原来只放外部依赖的变量，不存放当前模块内声明的变量 age
        const dependencies = Object.keys(statement._dependsOn);
        dependencies.forEach(name=>{
            //获取依赖的变量对应的变量定义语句 name
            let definition = this.define(name);
            result.push(...definition);
        });
        result.push(statement);//再放进来当前的语句
        //再放修改的语句
        const defines = Object.keys(statement._defines);
        defines.forEach(name=>{
            const modifications = has(this.modifications,name)&&this.modifications[name];
            if(modifications){
                modifications.forEach(statement=>{
                    if(!statement._included){
                        let statements = this.expandStatement(statement);
                        result.push(...statements);
                    }
                });
            }
        });
        return result;
    }
    define(name){
        //说明此变量是外部导入进来的
        if(this.imports[name]){
            //this.imports[localName]={localName,source,importName};
            const {localName,source,importName} = this.imports[name];
            // source .msg
            let importedModule = this.bundle.fetchModule(source,this.path);
            const {localName:exportLocalName} = importedModule.exports[importName];
            //this.exports.name = {localName:'name',exportName:'name',expression:};
            return importedModule.define(exportLocalName);
        }else{//说明是在当前模块内声明的
            //找一找当前的模块内有没有声明这个name变量
            let statement = this.definitions[name];
            if(statement){
                if(statement._included){
                    return [];
                }else{
                    return this.expandStatement(statement);
                }
            }else {//如果当前模块内没有这个变量应该报错
                if(SYSTEM_VARS.includes(name)){
                    return [];
                }else{
                    throw new Error(`变量${name}既没有从外部导入，也没有在模块内声明!`);
                }
                
            }
        }
    }
}
module.exports = Module;