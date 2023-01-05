/*
 * @Descripttion: 
 * @Author: lukasavage
 * @Date: 2022-09-14 22:45:45
 * @LastEditors: lukasavage
 * @LastEditTime: 2023-01-04 18:12:39
 * @FilePath: \happy-study\珠峰课件\正式课\01 Node架构\练习\2021年6月13日\01before函数的使用.js
 */
// Function.prototype.before = function (callback) {
//     return (...args) => {     // 注意：这里的箭头函数(不能使用普通函数，不然this指向不对)代表下面的newFn
//         callback();    // 这里的callback代表下面传入的回调
//         this(args);        // this指向coreFn
//     }
// }

// function coreFn(args) {
//     console.log(args);
//     console.log('我是coreFn函数');
// }

// let newFn = coreFn.before(() => {
//     console.log('我是before函数');
// });
// newFn(1,2,3);

Function.prototype.before = function (callback) {
    return (...args) => {
        callback(); 
        this(args);
    };
};

function coreFn(args) {
    console.log('我是core函数的参数:', args);
    console.log('coreFn执行了')
}

const newFn = coreFn.before(() => {
    console.log('before函数被执行了');
})

newFn('1111')