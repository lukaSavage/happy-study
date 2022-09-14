import { proto } from "./array";
import Dep from './dep';


class Observer {
    constructor(value) { // 将用户传入的选项 循环进行重写
        Object.defineProperty(value,'__ob__',{
            enumerable:false, // 在后续的循环中不可枚举的属性不能被循环出来
            value:this
        })
        if(Array.isArray(value)){
            // 重写数组的七个方法
            value.__proto__  = proto;
            // 如果数组里放的是对象 要对对象再次代理
            this.observeArray(value);
        }else{
            this.walk(value);
        }
    }
    walk(target) {
        Object.keys(target).forEach(key => {
            defineReactive(target, key, target[key]);
        })
    }
    observeArray(target){
        for(let i =0 ; i < target.length;i++){
            observe(target[i]);
        }
    }
}

function defineReactive(target, key, value) { // 定义响应式
    let dep = new Dep();   // 这个dep属性是为了key来服务的
    // 不存在的属性不会被defineProperty
    observe(value); // 递归对象类型检测 （性能差 默认情况下要对所有的都进行递归操作）
    Object.defineProperty(target, key, { // 将属性重新定在对象上，增加了get和set（性能差）
        get() {
            // console.log('属性获取',36)
            if(Dep.target){
                dep.depend(); // 让属性对应的dep 记住当前的watcher
            }
            return value;
        },
        set(newValue) {
            if (newValue === value) return
            // console.log('属性设置',41)
            observe(newValue); // 设置的值如果是对象，那么就再次调用observe让对象变成响应式的
            value = newValue;
            dep.notify();
        }
    })
}

export function observe(data) {
    // data 就是我们用户传入的数据 我们需要对他进行观测
    if (typeof data !== 'object' || data == null) {
        return; // 不是对象不能观测
    }
    if(data.__ob__){ // 如果一个数据有__ob__ 属性 说明已经被观测过了
        return;
    }
    // 后续要我们要知道是否这个对象被观测过了
    return new Observer(data); // xxx instanceof Observer
}