import { createElement, createTextElement } from "./vdom/index.js"
import { patch } from "./vdom/patch.js";
import Watcher from './observer/watcher'

export function lifeCycleMixin(Vue){
    Vue.prototype._update = function (vnode){ // 虚拟dom变成真实dom进行渲染的，后续更新也调用此方法
        this.$el =patch(this.$el,vnode); // 渲染  传入一个真实的dom 和 vnode
        // 更新  传入两个虚拟节点  diff算法 
    }   
    Vue.prototype._c = function(){ // _c('div',undefoined,[])
        return createElement(this,...arguments)
    }
    Vue.prototype._v = function(text){ // _v(字符串 + name + 'xxx')
        return createTextElement(this,text)
    }
    Vue.prototype._s = function(val){ // _s(name)
        if(typeof val === 'object') return JSON.stringify(val);
        return val;
    }
    Vue.prototype._render = function(){ // 调用编译后的render方法，生成虚拟节点
        const vm = this;
        let {render} = vm.$options;
        let vnode = render.call(vm); // 这里会进行取值操作 触发了get方法 仅需取值 （依赖收集）
        return vnode
    }
}
export function mountComponent(vm, el) {
    // vue3 里面靠的是产生一个effect, vue2中靠的是watcher
    let updateComponent = () => {
        // 1.产生虚拟节点 2.根据虚拟节点产生真实节点
        vm._update(vm._render());
    }
    new Watcher(vm,updateComponent,()=>{
        callHook('beforeUpdate')
    }); // 渲染是通过watcher来进行渲染的
}

// 和Vue3的渲染流程是否一致？