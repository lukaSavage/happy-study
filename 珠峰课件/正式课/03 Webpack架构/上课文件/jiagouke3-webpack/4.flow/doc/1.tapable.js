//let { SyncHook } = require("tapable");
class SyncHook {
    constructor(_args){
        this._args = _args;
        this.taps = [];
    }
    tap(name,fn){
        this.taps.push(fn);
    }
    call(){
        let args = Array.prototype.slice.call(arguments,0,this._args.length);
        this.taps.forEach(tap=>tap(...args));
    }
}
let hook = new SyncHook(["xx"]);
hook.tap("yyy", (name,age) => {
  console.log("clicked", name,age);
});
hook.call("zhufeng",12);
