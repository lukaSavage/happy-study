// 1.实现co函数
const fs = require('fs').promises;

function* test() {
    let a = yield fs.readFile('a.txt', 'utf8');
    let b = yield fs.readFile(a, 'utf8');

}

const it = test();
const { value, then } = it.next();
console.log(value);
value.then((val)=>{
    const {value, then} = it.next(val);
    value.then(res=>{
        console.log(res);
    })
})
