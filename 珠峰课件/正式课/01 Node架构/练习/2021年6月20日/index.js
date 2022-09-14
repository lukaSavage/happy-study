const EventEmitter = require('./events');
const util = require('util')
// 发布订阅 on 订阅  emit 发布   off 取消订阅   once 绑定一次
function Other() {
    // EventEmitter.call(this);
}
// 原型继承有三种写法
// Object.setPrototypeOf(Girl.prototype,EventEmitter.prototype); es6
// Girl.prototype = Object.create(EventEmitter) // es5
// Girl.prototype.__proto__ = EventEmitter.prototype
util.inherits(Other, EventEmitter)    // 这里就相当于继承
const event = new Other();

// 自定义一个行为(测试event.off)
const todo = function (data) {
    console.log('todo触发了', data);
}

event.on('测试一波', todo);
event.once('once', todo);

event.on('测试一波', (data) => {
    console.log('我要呵呵呵', data);
})

event.off('测试一波', todo);

event.emit('测试一波', 111);