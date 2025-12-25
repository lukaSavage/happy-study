// 示例源代码
function add(a, b) {
  return a + b
}

function multiply(a, b) {
  return a * b
}

function greet(name) {
  return `Hello, ${name}!`
}

// 测试代码
console.log('2 + 3 =', add(2, 3))
console.log('4 * 5 =', multiply(4, 5))
console.log(greet('World'))

// 导出模块
module.exports = {
  add,
  multiply,
  greet
}