import { currentInstance, setCurrentInstance } from "./component";


const enum LifeCycles  {
    BEFORE_MOUNT = 'bm',
    MOUNTED = 'm',
    BEFORE_UPDATE = 'bu',
    UPDATED = 'u'
}
function injectHook(lifecycle,hook,target){ // target指向的肯定是生命周期期指向的实例
    // 后面可能是先渲染儿子，此时currentInstance已经变成乐然儿子了，但是target永远指向的是正确的
    if(!target){
        return 
    }
    const hooks = target[lifecycle] || (target[lifecycle] = []);
    const wrap = () =>{
        setCurrentInstance(target);
        hook(); // 执行生命周期前 用存储的正确的实例替换回去，保证instance正确性
        setCurrentInstance(null);
    }
    hooks.push(wrap);
}

function createHook(lifecycle){ // []  => currentInstance
    return function(hook,target=currentInstance){ // 全局的当前实例
        // 利用函数的闭包特性
        injectHook(lifecycle,hook,target)
    }
}

export function invokeArrayFns(fns){
    fns.forEach(fn=>fn());
}
// shallow readonbly  createReactive
export const onBeforeMount = createHook(LifeCycles.BEFORE_MOUNT);
export const onMounted = createHook(LifeCycles.MOUNTED);
export const onBeforeUpdate = createHook(LifeCycles.BEFORE_UPDATE);
export const onUpdated = createHook(LifeCycles.UPDATED);
// currentInstance = App    currentInstance = Xxxx
// target = App            target = Xxxx
// App           ->        Xxxx 
// onMounted 后执行  onMounted 先执行