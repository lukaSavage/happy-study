let id = 0;
class Dep{
    constructor() {
        this.id = id++;
        this.subs = [];
    }
    depend(){
        this.subs.push(Dep.target);
    }
    notify(){
        this.subs.forEach(watcher=>watcher.update());
    }
}
Dep.target = null;

export default Dep; // 每个对象都增加一个dep ， 每个属性都增加一个dep