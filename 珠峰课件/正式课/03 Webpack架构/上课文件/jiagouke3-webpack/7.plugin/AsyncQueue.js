
class ArrayQueue{
   constructor(){
       this._list = [];
   }
   enqueue(item){
    this._list.push(item);
   }
   dequeue(){
       return this._list.shift();
   }
}
class AsyncQueue{
    constructor({name,parallelism,processor,getKey}){
        this._name =name;
        this._parallelism=parallelism;
        this._processor = processor;
        this._getKey = getKey;
    }
    //向队列中添加任务,然后判断一下如果能执行就立刻执行，如果不能执行就等一等
    add(item,callback){
        
    }
}
module.exports = AsyncQueue