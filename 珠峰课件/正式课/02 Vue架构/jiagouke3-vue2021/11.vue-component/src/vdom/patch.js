import { isSameVnode } from "./index";

export function patch(oldVnode, vnode) {

    if(!oldVnode){
        // 组件的渲染
        return createElm(vnode); // 创早一个真实的节点
    }

    if (oldVnode.nodeType === 1) {
        // 初始化渲染操作
        // 根据虚拟节点创造真实节点, 先根据虚拟节点创建一个真实节点，将节点插入到页面中在将老节点删除 
        // 为什么$mount('body | html')
        const parentElm = oldVnode.parentNode; // 获取父元素
        const elm = createElm(vnode)
        // 直接扔到body里不行吗？
        parentElm.insertBefore(elm, oldVnode.nextSibling)
        parentElm.removeChild(oldVnode);

        return elm;
    } else {
        patchVnoode(oldVnode, vnode); // 比较两个虚拟节点的差异，而且会比较儿子
        return vnode.el; // 最终返回新的el元素
    }
}

function patchVnoode(oldVnode, vnode) {
    // diff算法是同级别比对
    // 需要先比第一层，第一层一定是一个元素 
    // 看一下是否需要复用节点，如果不需要直接删除，重新创建
    if (!isSameVnode(oldVnode, vnode)) { // 没用到diff算法
        return oldVnode.el.parentNode.replaceChild(createElm(vnode), oldVnode.el)
    }
    // 如果是相同节点， 我需要判断这个东西是不是文本，文本只需要用新的文本替换掉老的文本就好了

    // 有tag属性就是元素，没有就是文本， 标签名可能一样都是undefined ，那他们可能是文本

    // 如果是文本或者元素，前后都一样，需要复用老的元素
    let el = vnode.el = oldVnode.el

    if (!oldVnode.tag) { // 文本
        if (oldVnode.text !== vnode.text) { // 直接更新文本
            return oldVnode.el.textContent = vnode.text
        }
    }

    // 到这里的情况 两个都是元素，相同标签
    updateProperties(vnode, oldVnode.props);

    // 比对完外部标签后，改进行儿子的比对了

    // 儿子和儿子间的关系 1） 两方都有儿子，比较特殊的 diff 
    // 1方有儿子1方没儿子
    // 两方都是文本的

    let oldChildren = oldVnode.children || [];
    let newChildren = vnode.children || [];

    if (oldChildren.length > 0 && newChildren.length > 0) {
        // 两方都有儿子
        updateChildren(el, oldChildren, newChildren);
    } else if (oldChildren.length > 0) { // 老的有儿子新的没儿子
        el.innerHTML = '';
    } else if (newChildren.length > 0) { // 新的有儿子老的没儿子
        newChildren.forEach(child => el.appendChild(createElm(child)))
    }
}

function updateChildren(el, oldChildren, newChildren) { // 比较儿子节点 vue2中diff算法的实现
    // vue2 对常见dom的操作做了一些优化
    // push shift unshift pop reserver sort api经常被用到，我们就考虑对这些特殊的情况做一些优化
    // 内部采用了双指针的方式
    let oldStartIndex = 0;
    let newStartIndex = 0;
    let oldEndIndex = oldChildren.length - 1;
    let newEndIndex = newChildren.length - 1; // 索引 
    let oldStartVnode = oldChildren[oldStartIndex];
    let newStartVnode = newChildren[newStartIndex];
    let oldEndVnode = oldChildren[oldEndIndex];
    let newEndVnode = newChildren[newEndIndex] // 虚拟节点

    // 如果比对上 就移动被比对上的指针
    function makeIndexByKey(oldChildren) {
        let map = {};
        oldChildren.forEach((item, index) => {
            map[item.key] = index;
        })
        return map;
    }
    let map = makeIndexByKey(oldChildren);
    console.log(map);

    while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) { // 一方就遍历结束了
        if (!oldStartVnode) { // 防止指针在移动的时候 oldChildren中的那一项已经被移动走了，则直接跳过
            oldStartVnode = oldChildren[++oldStartIndex]
        } else if (!oldEndVnode) {
            oldEndVnode = oldChildren[--oldEndIndex]
        } else if (isSameVnode(oldStartVnode, newStartVnode)) { // 从头部开始比，比对成功后指向向下移动
            patchVnoode(oldStartVnode, newStartVnode); // 标签一样比属性，属性比完比他们的子
            oldStartVnode = oldChildren[++oldStartIndex];
            newStartVnode = newChildren[++newStartIndex]
        } else if (isSameVnode(oldEndVnode, newEndVnode)) { // 从尾部比较
            patchVnoode(oldEndVnode, newEndVnode);
            oldEndVnode = oldChildren[--oldEndIndex];
            newEndVnode = newChildren[--newEndIndex];
        } else if (isSameVnode(oldStartVnode, newEndVnode)) {
            patchVnoode(oldStartVnode, newEndVnode);
            // inseetBefore是具备移动性的，移动走了，原来的就不存在了
            el.insertBefore(oldStartVnode.el, oldEndVnode.el.nextSibling);
            oldStartVnode = oldChildren[++oldStartIndex];
            newEndVnode = newChildren[--newEndIndex];
        } else if (isSameVnode(oldEndVnode, newStartVnode)) { // 尾部移动到头部
            patchVnoode(oldEndVnode, newStartVnode);
            el.insertBefore(oldEndVnode.el, oldStartVnode.el);
            oldEndVnode = oldChildren[--oldEndIndex];
            newStartVnode = newChildren[++newStartIndex]
        } // 四种优化策略
        else {
            // 在对列表操作的时候 都需要给 key （key不能用索引）
            // 乱序比对 需要造一个映射表，去搜索看是否存在，如果存在就复用
            // 需要拿新的第一个的key 去老的映射表里查找
            let moveIndex = map[newStartVnode.key]; // 能找到说明要移动并且复用
            if (moveIndex == undefined) { // 直接新增插入
                el.insertBefore(createElm(newStartVnode), oldStartVnode.el)
            } else {
                // 比较并且移动
                let moveVnode = oldChildren[moveIndex]; // 获取要移动的节点
                patchVnoode(moveVnode, newStartVnode); // 如果能复用就要比对
                el.insertBefore(moveVnode.el, oldStartVnode.el); // 将当前节点移动出来
                oldChildren[moveIndex] = null;
            }
            newStartVnode = newChildren[++newStartIndex]; // VUE3 中先规划了哪些不需要移动，但是vue2 中，如果找到后要复用 ，就要做移动
        }
    }
    if (oldStartIndex <= oldEndIndex) {
        for (let i = oldStartIndex; i <= oldEndIndex; i++) {
            let child = oldChildren[i];
            if (child !== null) {
                el.removeChild(child.el); // 移除老的中心的不需要的元素
            }
        }
    }
    if (newStartIndex <= newEndIndex) { // 新的比老得多，插入  (刚才直接用的向后插入，现在变成了前插入了) 我可以取一下当前的下一个元素，如果有我就做插入，如果没有 就做追加
        for (let i = newStartIndex; i <= newEndIndex; i++) {
            // 找尾指针的下一个人，如果有就是插入，没有就是追加
            let anchor = newChildren[newEndIndex + 1] == null ? null : newChildren[newEndIndex + 1].el;
            el.insertBefore(createElm(newChildren[i]), anchor);
        }
    }


}

function updateProperties(vnode, oldProps = {}) { // oldProps 可能不存在，如果存在就表示更新
    let newProps = vnode.props || {}; // 获取新的属性
    let el = vnode.el;
    // 比较前后属性是否一致 老的有新的没有，将老的删除掉，
    // 如果新的有 老的 也有，以新的为准
    // 如果新的有老的没有，直接替换成新的
    let oldStyle = oldProps.style || {}; // 如果前后都是样式
    let newStyle = newProps.style || {};
    for (let key in oldStyle) {
        if (!(key in newStyle)) { // 老的有的属性 但是新的没有，我就将他移除掉 
            el.style[key] = ''
        }
    }
    for (let key in oldProps) {
        if (!(key in newProps)) { // 老的有的属性 但是新的没有，我就将他移除掉 
            el.removeAttribute(key)
        }
    }
    for (let key in newProps) { // 以新的为准
        if (key == 'style') {
            for (let styleName in newStyle) {
                el.style[styleName] = newStyle[styleName]; // 对样式的特殊处理
            }
        } else {
            el.setAttribute(key, newProps[key]);
        }
    }
}

function createComponent(vnode){
    let i = vnode.props;
    if((i = i.hook) && (i = i.init)){ // 组件有init方法 那就调用init
        i(vnode); // new Ctor().$mount)()
    }
    if(vnode.componentInstance){ // vnode上有componentInstance 说明是组件的实例
        return true; // 是组件
    }
    return false;
}
export function createElm(vnode) {
    const { tag, props, children, text } = vnode;
    if (typeof tag == 'string') {
        // 先有虚拟节点 再有真实节点 
        // ... 可能是组件的真实节点
        if (createComponent(vnode)) {
            
            return vnode.componentInstance.$el
        } else {
            vnode.el = document.createElement(tag); // 把创建的真实dom和虚拟dom映射在一起方便后续更新和复用
            updateProperties(vnode);
            children && children.forEach(child => {
                vnode.el.appendChild(createElm(child))
            });
            // 样式稍后处理  diff算法的时候需要比较新老的属性进行更新？？？？？？
        }
    } else {
        vnode.el = document.createTextNode(text);
    }
    return vnode.el;
}