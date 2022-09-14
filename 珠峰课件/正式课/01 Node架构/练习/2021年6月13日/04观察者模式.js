class Dispatch {
    constructor(name) {      // 被观察者
        this.name = name;
        this.observers = [];
        this.state = '开心'
    }
    attach(who) {
        // 把father和mother放入到observers中
        this.observers.push(who);   // 订阅

    }

    setState(status) {
        this.state = status;
        this.observers.forEach(item=>item.update(this.state));
    }
}


class Watcher {
    constructor(name) {            // 观察者
        this.name = name;
    }
    update(state) {      // 观察者必须包含update方法
        console.log(this.name,':触发了watcher，宝宝的state是：', state);
    }
}

const child = new Dispatch('宝宝');
const father = new Watcher('爸爸');
const mother = new Watcher('妈妈');

child.attach(father);
child.attach(mother);
child.setState('不开心了');
