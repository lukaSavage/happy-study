function observe(obj) {
  if(typeof obj !== 'object' || obj === null) {
    return obj;
  }
  
  for (const key in obj) {
    handleTodo(obj, key, obj[key]);
  }

  function handleTodo(target, key, value) {
    Object.defineProperty(target, key, {
      get() {
        return value;
      },
      set(newValue) {
        update();
        value = newValue;
      }
    })
  }

}

function update() {
  console.log('更改属性了');
}


// 1.定义一个对象
const data = {
  name: '张三',
  age: 18
}
console.log('这是原来的值', data.name);
observe(data);
data.name = '李四';
console.log('更改后的值', data.name);

