// window \
//linux /
let path = require('path');
console.log(path.sep);
//path.posix旨的linux环境 /

function toUnixPath(filePath) {
    return filePath.replace(/\\/g, "/");
  }
console.log(path.posix.sep);// /
console.log(path.win32.sep);// \
require('path').sep
'/'
let baseDir = toUnixPath(process.cwd());
console.log('baseDir',baseDir);
let depModulePath = toUnixPath(__filename);
console.log('depModulePath',depModulePath);
console.log("./"+path.posix.relative(baseDir,depModulePath));