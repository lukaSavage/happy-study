import { effect } from "@vue/reactivity";
import { ShapeFlags } from "@vue/shared";
import { createAppAPI } from "./apiCreateApp"
import { createComponentInstance, setupComponent } from "./component";
let queue = [];
function queueJob(job) { // 批量处理 多次更新先缓存去重，之后异步更新
    if (!queue.includes(job)) {
        queue.push(job);
        queueFlush();
    }
}
let isFlushing = false;
function queueFlush() {
    if (!isFlushing) { // 只执行一次
        isFlushing = true;
        Promise.resolve().then(flushJobs); // vue3 不在考虑兼容性
    }
}
function flushJobs() {
    isFlushing = false; // 批处理完成了. 还是先父后子 ？
    queue.sort((a, b) => a.id - b.id);
    for (let i = 0; i < queue.length; i++) {
        queue[i]();
    }
    queue.length = 0;
}
// 不在关心是什么平台了
export function createRenderer(rendererOptions) { // 稍后会将这个函数，放到runtime-core中
    const {
        insert: hostInsert,
        remove: hostRemove,
        patchProp: hostPatchProp,
        createElement: hostCreateElement,
        createText: hostCreateText,
        setText: hostSetText,
        setElementText: hostSetElementText,
        parentNode: hostParentNode,
        nextSibling: hostNextSibling,
    } = rendererOptions
    const setupRenderEffect = (instance, container) => {
        effect(function componentEffect() { // 每次状态变化后 都会重新执行effect？ 是第一次还是修改的？  
            if (!instance.isMounted) {
                // 组件渲染的内容就是subTree
                let subTree = instance.subTree = instance.render.call(instance.proxy, instance.proxy); // 调用render， render需要获取数据
                patch(null, subTree, container);
                instance.isMounted = true;
            } else {
                console.log('渲染')
                const prevTree = instance.subTree; // 数据没变的时候的subTree
                // 在次调用render此时用的是最新数据渲染出来了
                const nextTree = instance.render.call(instance.proxy, instance.proxy);
                instance.subTree = nextTree;

                // diff算法
                patch(prevTree, nextTree, container);
            }
        }, {
            schedular: queueJob
        })
    }


    const mountComponent = (n2, container) => {
        // 1.组件的创建 需要产生一个组件的实例，调用组件实例上的setup方法拿到 render函数，在调用render函数，拿到组件对应（要渲染的内容）的虚拟DOM subTree
        let instance = n2.component = createComponentInstance(n2); // 根据虚拟节点创造一个实例

        // 2.给instance 增加属性， 调用setup ，拿到里面的信息
        setupComponent(instance);

        // 3.调用render。 每个组件都有一个 effect
        setupRenderEffect(instance, container);

    }
    const updateComponent = (n1, n2, container) => {

    }
    const processComponent = (n1, n2, container) => { // 处理组件
        if (n1 == null) {
            mountComponent(n2, container); // 创建组件
        } else {
            updateComponent(n1, n2, container); // 更新组件
        }
    }
    function mountChildren(children, container) {
        for (let i = 0; i < children.length; i++) {
            patch(null, children[i], container);
        }
    }
    function mountElement(vnode, container, anchor) { // 把虚拟节点变成真实的DOM元素
        const { type, props, children, shapeFlag } = vnode;
        let el = vnode.el = hostCreateElement(type); // 对应的是真实DOM元素
        if (props) {
            for (let key in props) {
                hostPatchProp(el, key, null, props[key])
            }
        }
        // 父创建完毕后 需要创建儿子
        if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
            mountChildren(children, el);
        } else if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
            hostSetElementText(el, children)
        }
        hostInsert(el, container, anchor);
    }

    const patchProps = (el, oldProps, newProps) => {
        if (oldProps !== newProps) {
            for (let key in newProps) {
                const prev = oldProps[key];
                const next = newProps[key];
                if (prev !== next) {
                    hostPatchProp(el, key, prev, next)
                }
            }
            for (let key in oldProps) {
                if (!(key in newProps)) {
                    hostPatchProp(el, key, oldProps[key], null)
                }
            }
        }
    }
    const patchChildren = (n1, n2, container) => { // 做两个虚拟的节点的儿子的比较了
        const c1 = n1.children;
        const c2 = n2.children; // 儿子之间的对比了

        // 儿子之间的比较 1.一方有儿子 一方没儿子  、 2.以前没儿子 现在有儿子 ， 3.两方都是文本，直接用新的换掉老的 ，4. 最后一个就是直接用方都有儿子 就比对两个儿子的差异
        const prevShapeFlag = n1.shapeFlag;
        const shapeFlag = n2.shapeFlag;

        if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
            hostSetElementText(container, c2); // 直接干掉以前的
        } else {
            // 现在是数组
            if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) { // 之前的是文本
                // 两个都是数组
                patchKeyedChildren(c1, c2, container)
            } else {
                // 之前的是文本，现在是数组
                hostSetElementText(container, '');
                mountChildren(c2, container)
            }
        }
    }

    function getSeq(arr) { // 最长递增子序列
        let len = arr.length;
        let result = [0]; // 默认先将第一个索引作为连续的开头
        let p = arr.slice(0); // 用来存索引的
        for (let i = 0; i < len; i++) {
            const arrI = arr[i];
            if (arrI !== 0) { // 数组中0要去掉 因为对于vue3 而言 为0的时候标识这个元素是要创建的
                let resultLastIndex = result[result.length - 1];
                if (arr[resultLastIndex] < arrI) { // 当前的值 比最后一项大，那么就累计索引
                    p[i] = resultLastIndex; // 在放入之前记住前一个人的索引
                    result.push(i);
                    continue; // 如果是比最后一项大的后续逻辑就不用走了
                }
                // [1,3,8，100,200,400，800] 中找比7大的值, 二分查找可以处理 递增序列  nlogn
                let start = 0;
                let end = result.length - 1; // 1 3 8   0/2   
                let middle;
                while (start < end) { // 终止条件 最后start和end重合就找到了
                    middle = (start + end) / 2 | 0; // 去中间的值
                    if (arr[result[middle]] < arrI) { // 向后缩小范围 
                        start = middle + 1;
                    } else {
                        end = middle
                    }
                }
                // 最后就找到了中间我要找的那个人 1 3 8 7  -> 1 3 7
                if (arrI < arr[result[end]]) {
                    if (start > 0) {
                        p[i] = result[start - 1]; // 替换的时候记住我的替换那个人的前一个人索引
                    }
                    result[start] = i; // 直接用当前的索引换掉老的索引， 替换成更有潜力的那一项
                }
            }
            // 找到结果集的最后一项，倒叙的查找回来
            let len = result.length;
            let last = result[len - 1];
            while (len-- > 0) {
                result[len] = last;
                last = p[last]; // 通过最后一项倒叙查找
            }
        }
        return result
    }
    const patchKeyedChildren = (c1, c2, container) => {
        // 两方都有儿子 才能称之为diff算法
        // 能复用的尽可能的复用， 之前和现在的差异，不一样的要新建或者删除，一样的要复用，复用dom和属性
        let i = 0;
        let e1 = c1.length - 1;
        let e2 = c2.length - 1;

        // sync from start
        while (i <= e1 && i <= e2) { // 以短的为主,谁先遍历完毕就终止了
            const n1 = c1[i];
            const n2 = c2[i];
            if (isSameVnode(n1, n2)) { // 是同一个元素 要比较属性，和这两个人的儿子
                patch(n1, n2, container)
            } else {
                break;
            }
            i++;
        } // 从头部开始比较我们移动的都是i
        // sync from end
        while (i <= e1 && i <= e2) {
            const n1 = c1[e1];
            const n2 = c2[e2];
            if (isSameVnode(n1, n2)) { // 是同一个元素 要比较属性，和这两个人的儿子
                patch(n1, n2, container)
            } else {
                break;
            }
            e1--;
            e2--;
        }
        // 默认移动的是尾部的指针
        // 若果老的少新的多 我需要将新的直接插入即可
        if (i > e1) { // 无论是头部增加 还是尾部增加 都是这个逻辑
            if (i <= e2) {
                // 添加进去， 添加到签名 还是后面呢？
                const nextPos = e2 + 1; // 如果是向后追加 e2 + 1 肯定大于c2的总长度
                // 如果是向前追加 e2+1 肯定小于 c2的长度
                const anchor = nextPos < c2.length ? c2[nextPos].el : null;
                while (i <= e2) {
                    patch(null, c2[i++], container, anchor)
                }
            }
        } else if (i > e2) { // 老的多 新的少
            while (i <= e1) {
                unmount(c1[i++])
            }
        } else { // 乱序比对 （最长递增子序列）
            // 中间的内容 

            // 通过 i 和 e1 / e2之间的部分进行差异比对
            let s1 = i;
            let s2 = i;

            // 正常来说，应该用旧的节点做成一个映射表，拿新的节点去找，看一下能否复用
            // 根据新的节点生成一个索引的映射表
            const keyToNewIndexMap = new Map();
            for (let i = s2; i <= e2; i++) {
                const childVnode = c2[i]// 获取新的儿子中的每一个节点
                keyToNewIndexMap.set(childVnode.key, i);
            }
            // 接下来有了映射表之后 我们要知道哪些可以被patch，哪些不能

            // 计算有几个需要被patch
            const toBePatched = e2 - s2 + 1;
            const newIndexToOldeIndexMap = new Array(toBePatched).fill(0);

            for (let i = s1; i <= e1; i++) { // 循环老的将老的的索引记录到newIndexToOldeIndexMap (根据索引进行查找)
                const childOldVnode = c1[i]; // 老的虚拟节点, 通过来的key去新的映射表里进行查找，如果有就复用
                let newIndex = keyToNewIndexMap.get(childOldVnode.key); // 新的索引
                if (newIndex == undefined) { // 用老的去新的找，新的里面没有。删除掉这个节点
                    unmount(childOldVnode)
                } else {
                    // 这里用新索引的时候 需要减去开头的长度 
                    newIndexToOldeIndexMap[newIndex - s2] = i + 1// 构建新的索引和老的索引的关系
                    patch(childOldVnode, c2[newIndex], container);
                    // 如果里面的值 是 0的话说明新的有老的没有，而且数组里会记录新的对应的老的索引
                }
            }
            let increasingNewIndexSeq = getSeq(newIndexToOldeIndexMap);
            let j = increasingNewIndexSeq.length - 1; // 取出最后一个人的索引
            for (let i = toBePatched - 1; i >= 0; i--) {
                let currentIndex = i + s2; // 获取h的位置
                let childNode = c2[currentIndex];
                let anchor = currentIndex + 1 < c2.length ? c2[currentIndex + 1].el : null;
                // 如果以前不存在这个节点就创造出来 进行插入操作
                if (newIndexToOldeIndexMap[i] == 0) {
                    patch(null, childNode, container, anchor)
                } else {
                    // 做到了如果不需要去实现移动，就不在移动了
                    if (increasingNewIndexSeq[j] !== i) {
                        // 存在直接将节点进行插入操作
                        hostInsert(childNode.el, container, anchor); // dom操作是具有移动性，肯定用的是以前的 ，但是都做了一遍重新插入
                    } else {
                        j--;
                    }
                }
                // 优化 最长递增子序列 求最长子序列   newIndexToOldeIndexMap  [5,3,4,0]
            }
        }

    }
    const patchElement = (n1, n2, container) => { // 走到这里说明前后两个元素能复用
        let el = n2.el = n1.el;

        const oldProps = n1.props || {};
        const newProps = n2.props || {};
        patchProps(el, oldProps, newProps);

        patchChildren(n1, n2, el)

    }
    const processElement = (n1, n2, container, anchor) => {
        if (n1 == null) {
            mountElement(n2, container, anchor);
        } else {

            // diff算法 核心
            patchElement(n1, n2, container);
        }
    }
    const isSameVnode = (n1, n2) => {
        return n1.type == n2.type && n1.key == n2.key; // 是同一个元素
    }
    const unmount = (vnode) => {
        hostRemove(vnode.el)
    }
    const patch = (n1, n2, container, anchor = null) => { // （1） 如果元素和key 不一样则直接删除重来
        // 判断n1 和 n2 是同一个元素吗？ type 和 key
        if (n1 && !isSameVnode(n1, n2)) { // 不是初始化才比较两个节点是不是同一个节点 
            unmount(n1);
            n1 = null; // 如果n1 为空则直接重新渲染
        }

        // n2 可能是元素 可能是组件， 我需要判断他的具体类型
        const { shapeFlag } = n2;

        if (shapeFlag & ShapeFlags.ELEMENT) { // 元素的虚拟节点
            processElement(n1, n2, container, anchor);
        } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) { // 组件的虚拟节点
            processComponent(n1, n2, container);
        }
    }
    const render = (vnode, container) => {
        // 后续更新还有更新逻辑 
        patch(null, vnode, container);
    }
    return {
        createApp: createAppAPI(render), // 用户调用的createApp 就是通过createAppAPI 来生成的
        render
    }
}