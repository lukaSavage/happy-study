

class Scope{
    constructor(options = {}){
        this.name  = options.name;
        this.parent = options.parent;
        this.names = options.params||[];//存放着当前作用域内的所有的变量
    }
    add(name){
        this.names.push(name);
    }
    //给我一个变量，我查一下在哪个作用域中定义的这个变量
    findDefiningScope(name){
        if(this.names.includes(name)){//如果自己有，就返回自己这个作用
            return this;
        }
        if(this.parent){//如果自己没有这个变量，但是有爹，问问爹有没有
            return this.parent.findDefiningScope(name)
        }
        return null;
    }
}
module.exports = Scope;