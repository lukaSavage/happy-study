//本模块从哪个模块导入了什么变量，叫什么名字
//main.js 从 msg.js 中 导入了name变量,改名为n
//main.js 从 msg.js 中 导入了age变量,改名为a
this.imports['n'] = { localName:'n', importName: 'name', source:'msg.js' };
this.imports['age'] = { localName:'a', importName: 'age', source:'msg.js' };
//本模块导出了什么变量
msg.js模块导出了name变量
this.exports['name'] = {localName:'name',exportName:'name'}
this.exports['age'] = {localName:'age',exportName:'age'}

//当前语句定义的变量
//var type = 'dog';
//当前语句定义了一个type的变量
statement._defines['type']=true;//表示定义了一个变量，值不关心

//本模块定义了哪些变量
//module
this.definitions['type']=statement;

//如果当前语句中使用到的变量没有在当前模块中定义，我们就认为它是一个外部导入的变量
console.log(age,name,type);
statement._dependsOn['age'] = true;
statement._dependsOn['name'] = true;
_dependOn也在 definitions里面吗?
扫描所有的使用的变量，如果在当前作用域 内定义，肯定在this.definitions时，不需要放在_dependsOn上面。
_dependsOn只放外部依赖的变量


外部就是靠 import 判断的是吧
如何判断外部变量?

_dependsOn
来自读取一个变量，但当前模块内没有声音。那它就外部

找ast 上 imported  作为dependon 的一个属性￼