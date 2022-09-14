

class Scope{
    constructor(options = {}){
        this.name  = options.name;
        this.parent = options.parent;
        this.names = options.params||[];//存放着当前作用域内的所有的变量
        this.isBlock = options.isBlock;//当前的作用域是否是块级作用域 
    }
    //添加变量的时候，添变量名，还要告诉我你是不是一个块级声明 let const 是 var 不是
    add(name,isBlockDeclaration){
        //如果不是块级声明，但是当前的作用域是块级作用域
        if(!isBlockDeclaration && this.isBlock){
            //添加父作用域 如果父亲也是块级作用域，再找父亲的父亲，最终找到根作用域
            return this.parent.add(name,isBlockDeclaration);
        }else {
            this.names.push(name);
            return this;
        }
       
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