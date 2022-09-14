function EventEmitter() {
    this._events = {}; // 用于存放事件,{ sth: [cb1, cb2, ...] }
}

EventEmitter.prototype.on = function (name, cb) {
    if (!this._events) this._events = {};
    const callbacks = this._events[name] || [];
    callbacks.push(cb);
    this._events[name] = callbacks;
    console.log(this._events);

}
EventEmitter.prototype.emit = function (name, ...args) {
    if (!this._events) this._events = {};
    const callbacks = this._events[name];
    callbacks && callbacks.forEach(item => item(...args));
}
EventEmitter.prototype.off = function (name, cb) {
    if (!this._events) this._events = {};
    const callbacks = this._events[name];
    callbacks && (this._events[name] = callbacks.filter(item => item !== cb && item.l !== cb))
}
EventEmitter.prototype.once = function (name, cb) {
    const tempFn = () => {
        cb();
        this.off(name);
    }
    temp.l = cb;
    this.on(name, tempFn);
}


// 最后暴露出去
module.exports = EventEmitter;