/**
 * 1.冒泡排序
 * @param {array} array 冒泡传递的数组
 */
function bubbleSort(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - 1 - i; j++) {
      array[j] > array[j + 1] && ([array[j], array[j + 1]] = [array[j + 1], array[j]])
    }
  }
}

/* ----------------------------------------------------分割线-------------------------------------------- */
/**
 * 2.快速排序
 * @param {arr} 需要快排的数组
 */
function quickSort(arr) {
  if (arr.length <= 1) return arr
  const i = Math.floor(arr.length / 2)
  const middle = arr.splice(i, 1)[0]
  let left = [],
    right = []
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
 * 3.手写call方法
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
 * 4.手写bind方法
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
 * 5.手写防抖(单位时间内最后一次生效)
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
 * 6.手写节流(单位时间内第一次生效)
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
 * 7.手写深度克隆
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
 * 8.手写flat
 * @param {*} array
 */
function myFlat(arr) {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}

/* ----------------------------------------------------分割线-------------------------------------------- */

/**
 * 9.手写TolocaleString
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
 * 10.给定一个字符串，请你找出不含有重复字符的最长子串
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
 * 11.给定一个只包括‘{’、‘}’、‘[’、‘]’、‘(’、‘)’的子串，判断是否有效。有效的字符需要满足以下两个条件
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
// console.log(valid('{[]}'))

/* ----------------------------------------------------分割线-------------------------------------------- */

/**
 * 12.反转二叉树
 * @param {object} tree 传入的二叉树
 */
function invertTree(tree) {
  if (!tree) return
  ;[tree.left, tree.right] = [tree.right, tree.left]
  // 递归操作
  invertTree(left)
  invertTree(right)
}

/* ----------------------------------------------------分割线-------------------------------------------- */

/**
 * 13.实现函数组合方法
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
    return args => args
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
 * 14.co函数
 * @param {Function*} gen generator函数
 * @returns
 */
function co(iterator) {
  return new Promise((resolve, reject) => {
    function step(data) {
      const { value, done } = iterator.next()
      if (!done) {
        Promise.resolve(value)
          .then(data => {
            step(data)
          })
          .catch(e => {
            reject(e)
          })
      } else {
        resolve(value)
      }
    }
    step()
  })
}

/* ----------------------------------------------------分割线-------------------------------------------- */

/**
 * 15.手写parse，要求满足以下所有条件
    console.log(parse('a=1&b=&c=5&f=hello'))
    console.log(parse('a&b&c'))
    console.log(parse('a[name]=fox&a[company]=tecent&b=why'))
    console.log(parse('color=Deep%20Blue'))
    console.log(parse('a[0]=1&a[1]=2'))
 * 
 * @param {string} str 类似a=xxx&b=123&c=['2','b']
 */
function parse(str) {
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

  return str.split('&').reduce((res, item) => {
    const [key, value] = item.split('=')
    if (!value) return res
    deep_set(
      res,
      key.split(/[\[\]]/g).filter(i => i),
      value
    )
    return res
  }, {})
}

/* ----------------------------------------------------分割线-------------------------------------------- */
/**
 * 16.给定一个不重复的正整数集合A，从中取N个数字，使他们的和为M，写一个函数，求这个N个数字。如果有多个，只需要返回一个
 * 举例：https://juejin.cn/post/6844903792555589639?searchId=202307132358251F0550E958D472BF4C54#heading-16
    search([1,3,8,5,2], 2, 11)        // [3, 8]
    search([1,3,8,5,2], 4, 3)         // null
 * @param {Array} A  代表正整数集合
 * @param {Number} n  代表N
 * @param {Number} m  代表M
 */
function search(A, N, M) {
  const n = num => {
    let count = 0
    while (num) {
      num &= num - 1
      count++
    }
    return count
  }

  let res = [],
    len = A.length,
    bit = 1 << len

  for (let i = 1; i < bit; i++) {
    if (n(i) === N) {
      let s = 0,
        temp = []
      for (let j = 0; j < len; j++) {
        if ((i & (1 << j)) !== 0) {
          s += A[j]
          temp.push(A[j])
        }
      }
      if (s === M) res.push(temp)
    }
  }
  return res
}

/* ----------------------------------------------------分割线-------------------------------------------- */

/**
 * 17.重复的最长子串
 * @param {*} s
 * @returns
 */
function longStr2(s) {
  // 存储最长子串
  let maxStr = ''
  // 滑动窗口遍历字符串
  for (let i = 0; i < s.length; i++) {
    // 窗口宽度为当前子串长度
    for (let j = i + maxStr.length + 1; j < s.length; j++) {
      // 截取当前窗口内子串
      let curStr = s.slice(i, j)
      // 查询左指针后面是否存在相同子串
      if (s.indexOf(curStr, i + 1) > -1) maxStr = curStr
      // 左指针后面不存在相同子串则跳出循环
      else break
    }
  }
  // 返回结果
  return maxStr
}

console.log(longStr2('banana'))
