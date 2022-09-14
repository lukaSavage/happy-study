const { AsyncParallelHook } = require("./tapable");
const hook = new AsyncParallelHook(["name", "age"]);
console.time("cost");
hook.tapAsync('1',(name,age,callback)=>{
  setTimeout(()=>{
    console.log(1,name,age);
    callback();
  },1000);
});
hook.tapAsync('2',(name,age,callback)=>{
  setTimeout(()=>{
    console.log(2,name,age);
    callback();
  },2000);
});
hook.tapAsync('3',(name,age,callback)=>{
  setTimeout(()=>{
    console.log(3,name,age);
    callback();
  },3000);
});

hook.callAsync('zhufeng',12,(err)=>{
  console.log(err);
  console.timeEnd('cost');
});
hook.tapAsync('4',(name,age,callback)=>{
  setTimeout(()=>{
    console.log(4,name,age);
    callback();
  },4000);
});
hook.callAsync('zhufeng',12,(err)=>{
  console.log(err);
  console.timeEnd('cost');
});

/**
(function anonymous(name, age, _callback) {
  var _x = this._x;
  var _counter = 3; //计数器
  var _done = function () {
    _callback();    //表示call方法全部执行结束
  };
  var _fn0 = _x[0];
  _fn0(name, age, function () {
    if (--_counter === 0) _done();
  });
  var _fn1 = _x[1];
  _fn1(name, age, function () {
    if (--_counter === 0) _done();
  });
  var _fn2 = _x[2];
  _fn2(name, age, function () {
    if (--_counter === 0) _done();
  });
});
 */