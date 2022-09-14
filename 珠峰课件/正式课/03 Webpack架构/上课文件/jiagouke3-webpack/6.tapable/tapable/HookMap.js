

class HookMap{
 constructor(factory){
    this._map = new Map();//key字符串 值是一个hook
    this._factory = factory;//是用来创建hook的工厂
 }
 get(key){//返回map中这个key对应的hook
    return this._map.get(key);
 }
 for(key){
    const hook = this.get(key);
    if(hook) return hook;
    let newHook = this._factory();
    this._map.set(key,newHook);
    return newHook;
 }
}
module.exports = HookMap;