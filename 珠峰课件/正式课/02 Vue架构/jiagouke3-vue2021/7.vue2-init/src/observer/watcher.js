let id = 0;
import Dep from './dep';
class Watcher{
    constructor(fn){
        this.id = id++;
        this.getter = fn; // 将用户传入的fn 保存在getter上

        this.get();
    }
    get(){
        Dep.target = this; // 将watcher暴露到全局变量上
        this.getter(); // 第一次渲染会默认调用getter  vm._update(vm._render())  // 取值的逻辑
        Dep.target = null;
    }
    update(){
        this.get();
    }
}
export default Watcher