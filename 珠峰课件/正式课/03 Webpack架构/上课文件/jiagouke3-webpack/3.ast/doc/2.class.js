class Person {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}
//编译成ES5

function Person(name) {
  this.name = name;
}
Person.prototype.getName = function(){
    return this.name;
}
