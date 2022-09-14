
//作用域 如果不考虑块级作用域 的话，作用域只有全局和函数
/* function one(){
    var a = 1;
}
console.log(a);
 */
/**
 * 作用域链是由当前的执行环境和上层执行环境的一系列变量组成的，
 * 它保证了当前执行环境对符合访问权隠的变量和函数的有序访问
 */
//定义一个全局作用域下的变量
let Scope = require('./scope');
var a = 1;
function one(){
    var b = 2;
    function two(){
        var c = 3;
        console.log(a,b,c);
    }
    two()
}
one()
//5个变量
//作用域 全局作用域  one作用域 two作用域
let globalScope = new Scope({name:'全局作用域',params:['a'],parent:null});
let oneScope = new Scope({name:'one作用域',params:['b'],parent:globalScope});
let twoScope = new Scope({name:'two作用域',params:['c'],parent:oneScope});

console.log(twoScope.findDefiningScope('a'));
console.log(twoScope.findDefiningScope('b'));
console.log(twoScope.findDefiningScope('c'));
console.log(twoScope.findDefiningScope('d'));