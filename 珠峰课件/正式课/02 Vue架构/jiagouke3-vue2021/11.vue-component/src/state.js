import Dep from "./observer/dep.js";
import { observe } from "./observer/index.js"; // rollup-plugin-rsolve
import Watcher from "./observer/watcher.js";

export function initState(vm) {
    const options = vm.$options;
    // 先props 在methods 在data 在 computed 在watch  (检测重名 规则是vue自己定的)
    if (options.data) {
        // 初始化data选项
        initData(vm)
    }
    if (options.computed) {
        // 计算属性的初始化
        initComputed(vm)
    }
    if (options.watch) {
        // 做一个watch选项的初始化
        initWatch(vm)
    }
}

function proxy(target, key, property) { // vm.xxx -> vm._data.xxx
    Object.defineProperty(target, property, {
        get() {
            return target[key][property]
        },
        set(n) {
            target[key][property] = n;
        }
    })
}

function initData(vm) {
    let data = vm.$options.data;
    // 需要对用户提供的data属性把他的所有属性进行重写增添get和set，只能拦截已经存在的属性
    data = vm._data = typeof data === 'function' ? data.call(vm) : data; // vm._data 和 data是同一个对象，观测的是data 但是vm._data 也是被观测过的

    // 用户使用 vm._data来获取有些麻烦， 我希望可以通过vm.xxx -> vm._data.xxx
    for (let key in data) {
        proxy(vm, '_data', key); // 循环代理属性, 为了用户使用的时候 直接可以通过vm.xxx
    }
    observe(data); // 对数据进行挂测
}
// Dep.target = 渲染watcher
// [渲染watcher]  【 name ，age】
function defineComputed(target, key, fn) { // vm , firstname, 用户的函数
    Object.defineProperty(target, key, {
        get(){
            const watcher = target._computedWatchers[key]; // 当用户取值的时候 ，拿到刚才缓存的watcher， 计算属性的watcher上有一个dirty属性
            if(watcher && watcher.dirty){ // fn就是原来的逻辑
                watcher.evaluate(); // 求职操作,求职后将dirty变为false
            }
            if(Dep.target){ // 让name和age收集上一层的依赖, 这样可以使页面刷新
                watcher.depend();
            }
            console.log(watcher.deps)
            return watcher.value; // 如果dirty为false，那后续的取值操作都会走到这里来
        }
    })
}

function initComputed(vm) {
    const computed = vm.$options.computed;
    // 每一个计算属性都是一个watcher
    const watchers = vm._computedWatchers = {}; // 存储计算属性的所有watcher 存到实例上
    for (let key in computed) {
        let userDef = computed[key];
        watchers[key] = new Watcher(vm, userDef, () => {}, { lazy: true });
        // vm.firstname
        defineComputed(vm, key, userDef); // Object.defineProperty
    }


}

function initWatch(vm) {
    const watch = vm.$options.watch;
    // 给每一个属性都创建一个watcher  （渲染watcher） （用户watcher） （计算属性watcher）
    for (let key in watch) {
        createWatcher(vm, key, watch[key]);
    }

}
export function createWatcher(vm, key, value) {
    return vm.$watch(key, value); // 监控某个属性 和对应的处理函数
}