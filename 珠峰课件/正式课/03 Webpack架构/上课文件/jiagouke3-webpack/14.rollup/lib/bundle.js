const MagicString = require('magic-string');
const path = require('path');
const fs = require('fs');
const Module = require('./module');
const {has,keys,replaceIdentifiers} = require('./utils');
class Bundle{
    constructor(entry){
        this.entryPath = path.resolve(entry);//得到入口文件的绝对路径
        this.modules= {};//存放着本次打包的所有的模块
    }
    //负责编译入口文件，然后把结果写入outputFile
    build(outputFile){
        //先获取入口模块的实例
       let entryModule = (this.entryModule =  this.fetchModule(this.entryPath));
       //展开入口模块语句
       this.statements = entryModule.expandAllStatements();
       this.deConflict();//解决变量名冲突的问题
       const transformedCode = this.generate();
       fs.writeFileSync(outputFile,transformedCode);
    }
    deConflict(){
        const defines = {};
        const conflicts = {};
        this.statements.forEach(statement=>{
            keys(statement._defines).forEach(name=>{
                if(has(defines,name)){//如果已经 定义过了，说明变量名冲突了
                    conflicts[name]=true;//标记说这个变量名冲突了
                }else{
                    defines[name]=[];
                }
                //变量名 值是对应模块的数组  defines['age']=[age1,age2];
                defines[name].push(statement._module);
            });
        });
        keys(conflicts).forEach(name=>{
            const modules = defines[name];
            modules.pop();//把最后一个弹出来 不需 重名字，它可以保留原始的变量名
            modules.forEach((module,index)=>{
                const replacement = `${name}$${index+1}`
                module.rename(name,replacement);
            });
        });;
    }
    /**
     * 根据模块的绝对路径返回模块的实例
     * @param {*} importee 被 导入的模块的绝对路径也可能是相对
     * @param {*} importer 导入的模块绝对路径
     */
    fetchModule(importee,importer){
        let route;
        if(!importer){
            route=importee;
        }else{
            if(path.isAbsolute(importee)){
                route=importee;
            }else{
                route = path.resolve(path.dirname(importer),importee);
            }
        }
        if(route){
            let code = fs.readFileSync(route,'utf8');
            const module = new Module({
                code,
                path:route,
                bundle:this
            });
            return module;
        }
    }
    generate(){
        let transformedCode = new MagicString.Bundle();//字符串包
        //this.statements只有入口模块里所有的顶层节点
        this.statements.forEach(statement=>{
            let replacements ={};
            Object.keys(statement._dependsOn).concat(statement._defines).forEach(name=>{
                const canonicalName = statement._module.getCanonicalName(name);
                if(name !== canonicalName){
                    replacements[name]=canonicalName;
                }
            });
            //我如何向statement这个顶级节点上添加_source属性，值是magicString实例
            const content = statement._source.clone();
            if(/^Export/.test(statement.type)){
                if(statement.type === 'ExportNamedDeclaration'){
                    content.remove(statement.start,statement.declaration.start);
                }
            }
            replaceIdentifiers(statement,content,replacements);
            transformedCode.addSource({
                content,
                separator:'\n'
            });
        });
        return transformedCode.toString();
    }
}
module.exports = Bundle;
//webpack Compiler