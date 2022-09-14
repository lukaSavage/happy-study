
const MagicString = require('magic-string');
let transformedCode = new MagicString.Bundle();//字符串包
transformedCode.addSource({
    content:'1',
    separator:'\n'
});
transformedCode.addSource({
    content:'2',
    separator:'\n'
});
console.log(transformedCode.toString());

let arr = [];
arr.push(1);
arr.push(2);

console.log(arr.join('\n'));