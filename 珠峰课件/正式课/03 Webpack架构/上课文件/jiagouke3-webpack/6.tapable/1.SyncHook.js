const { SyncHook } = require("./tapable");

const hook = new SyncHook(["name", "age"]);
hook.tap("1", (name, age) => {
  console.log(1, name, age);
});
hook.tap({name:"2"}, (name, age) => {
  console.log(2, name, age);
});
hook.tap("3", (name, age) => {
  console.log(3, name, age);
});
debugger
hook.call("zhufeng", 10);//动态编译 出为一个call方法执行
//hook.call("zhufeng", 10);//不再动态编译了，而是会执行上一次编译 出来的call方法
/**
(function anonymous(name, age) {
  var _x = this._x;//this是钩子的实例 _x是事件函数的数组
  
  var _fn0 = _x[0];
  _fn0(name, age);

  var _fn1 = _x[1];
  _fn1(name, age);

  var _fn2 = _x[2];
  _fn2(name, age);
})
 */
