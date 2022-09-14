
class Parent{
    constructor(){
        this.name = 'name';
    }
    getName(){
        console.log(this.getAge());
        return this.name;
    }
}
class Child extends Parent{
    constructor(){
        super();
        this.name = 'name';
        this.age = 'age';
    }
    getAge(){
        return this.age;
    }
}
//如果创建的是子类的实例，那么只会有一个子类的实例，不存在父类的实例
let parent = new Parent();
parent.getName();
/**
 * 
如果导出都写成 export default 会有问题吗￼ 现在用的是common.js 不支持ESM
daywang
存父类上就是为了公用吧￼ 是的
艾瑞
不行￼
奇了￼
666
原型链其实是￼
Onereedtosail
明白这个this就知道了￼


 */