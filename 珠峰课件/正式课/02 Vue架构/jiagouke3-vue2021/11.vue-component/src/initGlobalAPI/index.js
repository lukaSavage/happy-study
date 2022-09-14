import { mergeOptions } from "../utils";

export function initGlobalAPI(Vue) {
    Vue.options = {}; // 所有的全局属性 都会放到这个变量上
    Vue.mixin = function(options) { // 用户要合并的对象
        this.options = mergeOptions(this.options, options)
    }
    Vue.options.components = {}; // 放的是全局组件
    Vue.component = function(id,componentDef){
        componentDef.name  = componentDef.name || id;
        // extend 方法肯定是父类的
        componentDef = this.extend(componentDef);
        this.options.components[id] = componentDef;
    }
    // 这个是组件的核心方法
    Vue.extend = function(options){ // {template:"<div></div>"}
        const Super = this;
        const Sub = function vueComponent(opts){
            this._init(opts);
        }  
        // 子类继承父类原型方法 
        Sub.prototype = Object.create(Super.prototype);
        Sub.prototype.constructor = Sub;
        // {components:{全局的定义}}

        // 合并的时候 构造一个父关系
        Sub.options = mergeOptions(this.options,options);
        return Sub;
    }
    // 1.定义全局组件映射关系到Vue.options 2.内部调用Vue.extend返回一个子类
}

// 组件的初始化 分散到不同的文件中