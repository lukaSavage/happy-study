let MagicString = require('magic-string');
var magicString = new MagicString(`export var name = "zhufeng"`);
// 截取开头和结尾中间的所有的内容 slice substring
// 这些操作都是返回克隆后的版本，并不会修改原始的字符串
console.log(magicString.snip(0,6).toString());

console.log(magicString.remove(0,7).toString());

magicString.overwrite();
