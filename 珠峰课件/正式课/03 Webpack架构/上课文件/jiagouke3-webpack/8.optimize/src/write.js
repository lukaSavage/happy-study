let str = 'x'.repeat(21*1024);///21KB
let fs = require('fs');
fs.writeFileSync('./bigger.js',`module.exports = "${str}"`);

