
console.log(Object.prototype.toString.call('foo'));//[object String]
console.log(Object.prototype.toString.call([]));//
console.log(Object.prototype.toString.call(1));//
console.log(Object.prototype.toString.call(true));//
console.log(Object.prototype.toString.call(null));///
console.log(Object.prototype.toString.call(undefined));//

let myExports = {};
//为了更进一步区不同的Object对象类型
Object.defineProperty(myExports,Symbol.toStringTag,{value:'Module'});
console.log(Object.prototype.toString.call(myExports));//[object Object]


let myExports2 = {};
//为了更进一步区不同的Object对象类型
Object.defineProperty(myExports2,Symbol.toStringTag,{value:'Module2'});
console.log(Object.prototype.toString.call(myExports2));//[object Object]