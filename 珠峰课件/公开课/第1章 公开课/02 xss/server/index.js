const express = require('express');
const path = require('path');


const app = express();

// app.use(express.static(path.resolve));

console.log(path.resolve('a','b','c'));



// app.listen(3000, err => {
//     if(!err) console.log('服务器访问成功。请访问http://localhost:3000');
// })