// 1.先声明组件的映射关系 Vue.component  {components:xxx}
// 2.我需要根据组件的名字生成一个组件的虚拟节点
// 3.需要去创造组件的实例
// 4.替换原来渲染内容


const isResrved = (tag) =>{
    return ['a','div','p','span','ul','li','button','input'].includes(tag);
}
function createComponent(vm,tag,props,children,Ctor){
    if(typeof Ctor == 'object'){ // 如果找到的是对象，同样也会使用Vue.extend 来包裹
        Ctor =  vm.constructor.extend(Ctor);
    }
    props.hook = {
        init(vnode){ // 专门用来初始化组件的， 组件的虚拟节点上还有一个componentOptions

            // new Sub()._init()
            let child = vnode.componentInstance = new vnode.componentOptions.Ctor({});
            // 内部会产生一个真实节点 挂载到了child.$el / vnode.componentInstance.$el
            child.$mount(); // 就会将组件挂载后的结果放到$el属性上
        }
    }
    return vnode('vm','vue-component-'+tag,props,undefined,undefined,props.key,{Ctor,children})
}
export function createElement(vm,tag, props = {}, children) {
    // 需要判断tag 是元素还是组件 
    if(isResrved(tag)){
        return vnode(vm, tag, props, children,undefined, props.key)
    }else{
        // 根据当前组件来生成一个虚拟节点  组件的虚拟节点
        // 通过组件名找到 对应的组件定义

        // 组件的虚拟节点 是为了后续生成真实dom提供的 Vue.extend({template}) => Sub
        const Ctor = vm.$options['components'][tag];
        return createComponent(vm,tag,props,children,Ctor);
    }
}

export function createTextElement(vm,text) {
    return vnode(vm, undefined, undefined, undefined, text)
}
export function isSameVnode(oldVnode,newVnode){
    return oldVnode.tag == newVnode.tag && oldVnode.key === newVnode.key
}
function vnode(vm, tag, props, children, text, key,componentOptions) {
    return {
        vm,
        tag,
        props,
        children,
        text,
        key,
        componentOptions
    }
}