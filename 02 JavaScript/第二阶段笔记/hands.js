/**
 * 冒泡排序
 * @param {array} array 冒泡传递的数组
 */
function bubbleSort(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - 1 - i; j++) {
      array[j] > array[j + 1] && ([array[j], array[j + 1]] = [[array[j + 1]], array[j]])
    }
  }
}

/* ----------------------------------------------------分割线-------------------------------------------- */
/**
 * 快速排序
 * @param {arr} 需要快排的数组
 */
function quickSort(arr) {
  if (arr.length <= 1) return arr
  const i = Math.floor(arr.length / 2)
  const middle = arr.splice(i, 1)[0]
  let left = []
  let right = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < middle) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  const leftArr = quickSort(left)
  const rightArr = quickSort(right)
  return leftArr.concat([middle], rightArr)
}

/* ----------------------------------------------------分割线-------------------------------------------- */
/**
 * 手写call方法
 * @param {*} tag 目标this对象
 * @param  {...any} args 参数
 */
Function.prototype.myCall = function (tag = window, ...args) {
  tag.__proto__._fn = this
  const result = tag._fn(...args)
  delete tag.__proto__._fn
  return result
}
/* ----------------------------------------------------分割线-------------------------------------------- */
/**
 * 手写bind方法
 * @param {*} tag
 * @param  {...any} args
 */
Function.prototype.myBind = function (tag = window, ...args) {
  const _this = this
  return function (...arg) {
    return _this.call(tag, ...args, ...arg)
  }
}

/* ----------------------------------------------------分割线-------------------------------------------- */
/**
 * 手写防抖(单位时间内最后一次生效)
 * @param {*} fn
 * @param {*} time
 */
function debounce(fn, time) {
  let timer = null
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.call(this, ...args)
    }, time)
  }
}

/* ----------------------------------------------------分割线-------------------------------------------- */

/**
 * 手写节流(单位时间内第一次生效)
 * @param {*} fn
 * @param {*} time
 */
function throttle(fn, time) {
  let start = 0
  return function (...args) {
    let end = Date.now()
    if (end - start < time) return
    fn.call(this, ...args)
    start = end
  }
}

/* ----------------------------------------------------分割线-------------------------------------------- */

/**
 * 手写深度克隆
 * @param {*} target
 */
function deepClone(target) {
  const type = Object.prototype.toString.call(target).slice(8, -1)
  let res = null
  if (type === 'Object') {
    res = {}
  } else if (type === 'Array') {
    res = []
  } else {
    return target
  }
  for (const i in target) {
    res[i] = deepClone(target[i])
  }
  return res
}
/* ----------------------------------------------------分割线-------------------------------------------- */

/**
 * 手写flat
 * @param {*} array
 */
function myFlat(arr) {
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}

/* ----------------------------------------------------分割线-------------------------------------------- */

/**
 * 手写TolocaleString
 * @param {*} n 表示要传入的数字
 */
function myToLocaleString(n) {
  if (typeof n !== 'number') throw new Error(n + ' is not a number')
  var b = parseInt(n).toString()
  var len = b.length
  if (len <= 3) {
    return b
  }
  var r = len % 3
  // 23,435,678
  return r > 0 ? b.slice(0, r) + ',' + b.slice(r, len).match(/\d{3}/g).join(',') : b.slice(r, len).match(/\d{3}/g).join(',')
}
/* ----------------------------------------------------分割线-------------------------------------------- */

/**
 * 给定一个字符串，请你找出不含有重复字符的最长子串
 * @param {string} str 传入的字符串
 * @returns max:传入的最长子串数目，maxStr:传入的最长子串
 */
function longStr(str) {
  let temp = [],
    max = 0,
    maxStr = ''
  for (let i = 0; i < str.length; i++) {
    const index = temp.indexOf(str[i])
    if (index !== -1) {
      temp.splice(0, index + 1)
    }
    temp.push(str[i])
    if (temp.length > maxStr.length) {
      maxStr = temp.join().replace(/,/g, '')
    }
    max = Math.max(max, temp.length)
  }
  return {
    max,
    maxStr
  }
}
/* ----------------------------------------------------分割线-------------------------------------------- */
/**
 * 给定一个只包括‘{’、‘}’、‘[’、‘]’、‘(’、‘)’的子串，判断是否有效。有效的字符需要满足以下两个条件
 * 1.左括号必须以相同类型的括号闭合
 * 2.左括号必须以正确的顺序闭合
 * @param {string} str
 */
function valid(str) {
  const map = {
    '{': '}',
    '[': ']',
    '(': ')'
  }
  let temp = []
  for (let i = 0; i < str.length; i++) {
    if (map[str[i]]) {
      temp.push(str[i])
    } else if (str[i] !== map[temp.pop()]) {
      return false
    }
  }
  return temp.length === 0
}
console.log(valid('{[]}'))

/* ----------------------------------------------------分割线-------------------------------------------- */
/**
 * 给定一个不重复的正整数集合，从中取N个数字，使他们的和为M，写一个函数，求这个N个数字。如果有多个，只需要返回一个
 * 举例：
    sumN([1,3,8,5,2], 2, 11)        // [3, 8]
    sumN([1,3,8,5,2], 4, 3)         // null
 * @param {Array} A  代表正整数集合
 * @param {Number} n  代表N
 * @param {Number} m  代表M
 */
function sumN(A, n, m, i = 0, decisions = []) {
  if (m === 0) {
    return decisions // 说明直接找到了，返回
  }
  if (i === A.length || n === 0 || m < 0) {
    return null
  }
  return sumN(A, n - 1, m - A[i], i + 1, decisions.concat(A[i])) || sumN(A, n, m, i + 1, decisions)
}

/* ----------------------------------------------------分割线-------------------------------------------- */

/**
 * 反转二叉树
 * @param {object} tree 传入的二叉树
 */
function invertTree(tree) {
  if (!tree) return
  ;[tree.left, tree.right] = [tree.right, tree.left]
  // 递归操作
  invertTree(left)
  invertTree(right)
}

/* 数的结构如下↓↓↓ */

/* ----------------------------------------------------分割线-------------------------------------------- */
/**
 * 求一个二叉树左边的轮廓
 * @param {object} tree 代表数的节点
 * @param {number} d 树的层数
 * @param {array} outline 结果值
 */
function leftTree(tree, d = 0, outline = []) {
  if (!tree) return
  if (!outline[d]) {
    outline[d] = value // 这里的value代表具体的树的值
  }
  // 递归操作
  leftTree(tree.left, d + 1, outline)
  leftTree(tree.right, d + 1, outline)
  return outline
}

class Tree {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}
const root = new Tree(1)
root.left = new Tree(2)
root.right = new Tree(3)
root.left.left = new Tree(4)

/* ----------------------------------------------------分割线-------------------------------------------- */

/**
 * 手写parse，要求满足以下所有条件
    console.log(parse('a=1&b=&c=5&f=hello'))
    console.log(parse('a&b&c'))
    console.log(parse('a[name]=fox&a[company]=tecent&b=why'))
    console.log(parse('color=Deep%20Blue'))
    console.log(parse('a[0]=1&a[1]=2'))
 * 
 * @param {string} str 类似a=xxx&b=123&c=['2','b']
 */
function parse(str) {
  return str.split('&').reduce((res, item) => {
    const [key, value] = item.split('=')
    if (!value) return res
    deep_set(
      res,
      key.split(/[\[\]]/g).filter((i) => i),
      value
    )
    return res
  }, {})
}

function deep_set(o, path, value) {
  let i = 0
  for (; i < path.length - 1; i++) {
    if (o[path[i]] === undefined) {
      if (path[i + 1].match(/^\d+$/)) {
        o[path[i]] = []
      } else {
        o[path[i]] = {}
      }
    }
    o = o[path[i]]
  }
  // { name: fox }
  o[path[i]] = decodeURIComponent(value)
}

/* ----------------------------------------------------分割线-------------------------------------------- */

/**
 * 实现函数组合方法
    // compose(f,g)(x) === f(g(x))
    // compose(f,g,m)(x) === f(g(m(x)))
    // compose(f,g,m)(x) === f(g(m(x)))
    // compose(f,g,m,n)(x) === f(g(m(n(x))))
 *
 * @param  {...Function} fns 一系列的聚合函数
 * @returns Function 聚合后的函数
 */
function compose(...fns) {
  if (fns.length === 0) {
    return (args) => args
  }
  if (fns.length === 1) {
    return fns[0]
  }
  return fns.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args))
  )
}

/* ----------------------------------------------------分割线-------------------------------------------- */

/**
 * 
 * @param {Function*} gen generator函数
 * @returns 
 */
function co(gen) {
  return new Promise((resolve, reject) => {
    function step(data) {
      const { value, done } = gen.next()
      if (!done) {
        Promise.resolve(value)
          .then((data) => {
            step(data)
          })
          .catch((e) => {
            reject(e)
          })
      } else {
        resolve(value)
      }
    }
    step()
  })
}
