const obj = {a:1}
console.log(obj.hasOwnProperty('a'));

function has(obj,propertyName){
    return Object.prototype.hasOwnProperty.call(obj,propertyName);
  }
console.log(obj.hasOwnProperty === Object.prototype.hasOwnProperty);

console.log(has(obj,'a'));