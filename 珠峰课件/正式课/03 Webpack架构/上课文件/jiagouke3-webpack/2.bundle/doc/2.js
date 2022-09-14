let obj = {};
let ageValue = 10;
Object.defineProperty(obj,'age',{
    get(){
        return ageValue;
    },
    set(newValue){
        ageValue = newValue;
    },
    enumerable:true,//for
    configurable:true//delete obj.age;
})
console.log(obj.age);
obj.age = 20;
console.log(obj.age);
