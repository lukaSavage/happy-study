// 需求: 实现一个after要求不用promise实现两个宏任务完成之后做些事情(使用发布-订阅模式)
const fs = require('fs');

const event = {
    _arr: [],
    data: {},
    on(fn) {
        this._arr.push(fn);
    },
    emit(key, value) {
        this.data[key] = value;
        this._arr.forEach(item=>item(this.data));
    }
}
// 定义发布者
event.on((data)=>{
    console.log('发布者收到消息啦:', data);
    if(Reflect.ownKeys(data).length>=2) {
        console.log('收到全部消息了，', data);
    }
})

fs.readFile('./01before函数的使用.js', 'utf8', (err, data) => {
    setTimeout(() => {
        event.emit('张三', '我爱你');
    }, 4000);
})
fs.readFile('./01before函数的使用.js', 'utf8', (err, data) => {
    event.emit('老王', '我恨你');
})