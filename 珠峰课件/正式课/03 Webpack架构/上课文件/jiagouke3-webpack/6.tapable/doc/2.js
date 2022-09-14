function sum(a,b){
    return a+b;
}
let minus = new Function('a,b','return a-b;');
console.log(minus(3,2));
console.log(sum instanceof Function);
console.log(minus instanceof Function);