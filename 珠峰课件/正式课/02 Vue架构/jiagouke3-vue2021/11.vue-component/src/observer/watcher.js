let id = 0;
import Dep, { popTarget, pushTarget } from './dep';
class Watcher {
    // 用户的回调 是用户的函数  
    // exprOrFn是监控的属性 name (有可能是渲染watcher) 先取一下vm.name 作为老的值，后续值变化了 才去取一次
    // vm 是当前的实例  
    // options 就是参数列表
    constructor(vm,exprOrFn,callback,options = {}) {
        this.deps = []; // watcher对应存放的dep
        this.id = id++;
        if(typeof exprOrFn == 'function'){
            this.getter = exprOrFn; // 将用户传入的fn 保存在getter上
        }else{
            this.getter = () => vm[exprOrFn] // 取值的时候会收集watcher
        }
        this.depsId = new Set(); // 去重

        this.lazy = options.lazy; // lazy 为true 则不要直接直接get方法
        // this.value 就是老的值
        this.dirty =  this.lazy; // 计算属性默认dirty是true
        this.vm = vm;
        this.value =  this.lazy ? undefined : this.get(); // 默认lazy 就不要执行调用方法
      
        this.callback = callback;
        this.options = options
    }
    get() {
        // Dep.target = this; // 将watcher暴露到全局变量上

        pushTarget(this)
        let value =  this.getter.call(this.vm); // 第一次渲染会默认调用getter  vm._update(vm._render())  // 取值的逻辑
        popTarget() // [渲染watcher]
        // Dep.target = null;
        return value
    }
    evaluate(){
        this.value = this.get();
        this.dirty = false
    }
    addDep(dep) {
        let id = dep.id;
        if (!this.depsId.has(id)) {
            this.depsId.add(id);
            this.deps.push(dep); // 让watcher记住dep
            dep.addSub(this)
        }
    }
    update() {
        if(this.lazy){
            this.dirty = true;// 如果依赖的属性变化了，我就让计算属性watcher的lazy在变为true，这样下次取值就能进入到evaluate中的流程
        }else{
            queueWatcher(this);
        }
   
    }
    depend(){
        let l = this.deps.length; // name , age
        while (l--) { // [渲染watcher，计算属性watcher]
            this.deps[l].depend(); // 需要让这个属性记录依赖
        }
    }
    run() { // 真实的执行
        let newValue = this.get();
        let oldValue = this.value;
        this.value = newValue;
        if(this.options.user){
            this.callback(newValue,oldValue)
        }

    }
}
let watchsId = new Set();
let queue = [];
let pending = false;
function flushShedulerQueue() {
    for (let i = 0; i < queue.length; i++) {
        let watcher = queue[i];
        watcher.run();
    }
    queue = [];
    watchsId.clear();
    pending = false;
}

function queueWatcher(watcher) {
    const id = watcher.id; // 取出watcher的id 
    if (!watchsId.has(id)) { // 看一下这里有没有这个watcher
        watchsId.add(id); // 如果没有添加watcher到更新队列中
        queue.push(watcher) // 放到队列中
        if (!pending) {
            // vue2 里面要考虑兼容性 vue2里面会优先采用promise但是ie不支持promise 需要降级成 mutationObserver h5提供的一个方法
            // setImmediate 这个方法在ie中性能是比较好的，都不兼容fallback -> setTimeout
            Promise.resolve().then(flushShedulerQueue);
            pending = true
        }
    }
}
export default Watcher