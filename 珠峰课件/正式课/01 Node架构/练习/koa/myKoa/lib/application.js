const http = require('http');
const EventEmitter = require('events');

// 自己定义的模块
const request = require('./request');
const response = require('./response');
const context = require('./context');


// 因为app上有个on方法，所以一定是继承于events模块的
class Koa extends EventEmitter{
    /**
     * 第一步：创建ctx用来取代req、res
     * 
     */
    constructor() {
        super();
    }

    // koa中的use方法
    use(fn) {
        this.fn = fn;
    };

    createContext(req, res) {};

    handleRequest = (req, res) => {
        const ctx = this.createContext(req, res);
        this.fn(ctx);
    }

    // koa中的listen方法
    listen(...args) {
        const server = http.createServer(this.handleRequest);
        server.listen(...args);
    };
}


module.exports = Koa;