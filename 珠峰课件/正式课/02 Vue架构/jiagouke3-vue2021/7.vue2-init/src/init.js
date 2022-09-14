import { compileToFunction } from "./compile/index.js";
import { mountComponent } from "./lifecycle.js";
import { initState } from "./state";

export function initMixin(Vue) {
    Vue.prototype._init = function(options) {
        const vm = this;
        vm.$options = options; // 后续所有的原型中都可以通过 vm.$options 拿到用户传递的选项
        initState(vm); // 状态的初始化，目的就是初始化用户传入的props  data  computed watch


        // 判断用户是否传入了el ，如果传入了el 要实现页面的挂载


        if(options.el){
            vm.$mount(options.el);
        }
    }   
    Vue.prototype.$mount = function(el){
        // render -> template -> outerHTML
    
        const vm = this;
        el  = document.querySelector(el);
        vm.$el = el;
        const options = vm.$options;
        let render;
        if(!options.render){
            // 没有render
            let template = options.template;
            if(!template){  // 如果没有模板 就采用指定元素对应的模板
                template = el.outerHTML
            }
            options.render = compileToFunction(template); // 模板的编译
        }
        // 有render直接调用render方法
        // render = options.render;  // 最终拿到编译后的render

        // 根据render方法产生虚拟节点，在将虚拟节点变成真实节点 插入到页面中即可
        mountComponent(vm,el)// 组件挂载流程 
       
    }


  
}