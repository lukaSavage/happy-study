// 需求: 实现一个after要求不用promise实现两个宏任务完成之后做些事情
const fs = require('fs');


function after(count, callback) {
    let items = {};
    return (key, value) => {
        items[key] = value;
        if (Reflect.ownKeys(items).length >= count) {
            callback(items);
        }
    }
}

let finish = after(2, (data) => {
    console.log(data);
})

// 注意，这里的是根目录读取的
fs.readFile('./01before函数的使用.js', 'utf8', (err, data) => {
    setTimeout(() => {
        finish('张三', '我爱你');
    }, 4000);
})
fs.readFile('./01before函数的使用.js', 'utf8', (err, data) => {
    finish('老王', '我恨你');
})