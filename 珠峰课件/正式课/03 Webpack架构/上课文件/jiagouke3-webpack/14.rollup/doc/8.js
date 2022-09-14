const MagicString = require('magic-string');

let ms = new MagicString('const age  = 10');
console.log(ms.overwrite(6,9,'age$1').toString());;