/**
 *    ["@babel/plugin-proposal-decorators",{legacy:true}],
       ["@babel/plugin-proposal-class-properties",{loose:true}]
 */

class Circle {
    PI = 3.14;
}
//转成ES5如何转的
let c1 = new Circle();
console.log(c1.PI);

//loose=true
function Circle(){
    this.PI = 3.15;
}
let c1 = new Circle();

//loose=false
function Circle(){
    Object.defineProperty(this,'PI',3.15);
}


@readonly
class Cirlce2{

}

/* class @readonly Cirlce3{

} */