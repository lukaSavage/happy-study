

acorn
比较 老版一个 javascript parser

fork acorn 开发了@babel/parser

estraverse
实现语法的编译和作用域的生成

今天会自己实现语法树的遍历和作用域的管理

//acorn只负责把源代码转成语法树

esprima 转AST
estraverse AST遍历和转换
escodegen 代码生成

@babel/parser 转AST
@babel/traverse AST遍历和转换
@babel/generator 代码生成


16:52
不完美
Bundle传参为什么要{entry}这种写法呢，Bundle取参也加了{}￼

现在只是把entryModule入口模块的内容原生输出
1.还没有实现依赖分析
2.还没有实现treeshaking




scope 是个map吗？￼
123
Scope 么有写？￼
21:02
123
先new 一个scope 吧￼
Hedgehog
if for会创建新的不￼
123
不会￼
21:09
123
解构￼
123撤回了一条消息
123撤回了一条消息
123
roullp 的tree-shaking 不会处理new 实例的  还有require吗？￼


20:19
123
const obj = {a:1}

obj.hasOwnProperty('a')
￼
peak
obj.hasOwnPerporty(perportyName) ￼


ReferenceError: age is not defined

variableDeclaration 的addToScope 默认也是false￼




1￼
123
知道了 判断条件是 blockstatement  还要看看 是let const 还是 var￼
21:04
peak
{ } 花括号只是块语句, 并不会形成块级作用域 具体是否是块级作用域, 要看{ } 里面的代码是吧￼



21:04
peak
{ } 花括号只是块语句, 并不会形成块级作用域 具体是否是块级作用域, 要看{ } 里面的代码是吧￼
123
条件是  1、标识符 2  currentScope中吗￼
peak
{  var age = 12} 既然花括号已经形成块级作用域, 那么里面的age变量为什么还会提升到全局作用局呢 有点不明白￼
daywang
var 没有会计作用于￼
daywang
let const 有￼
daywang
1￼
peak
嗯嗯 明白let const有 我的理解是{ }已经形成块级作用域, { }的块级作用域不应该是优先于里面的变量定义吗 ￼


123撤回了一条消息
123
statement._defines  这个咋来的￼
123
还要判断不是标识符￼

