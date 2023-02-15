/*
 * @Descripttion: 
 * @Author: lukasavage
 * @Date: 2022-03-08 20:56:49
 * @LastEditors: lukasavage
 * @LastEditTime: 2022-03-09 16:56:46
 */

export function add (a: any, b) {
    return a + b;
}
export function minus (a, b) {
    return a - b;
}
export function multiply (a, b) {
    return a * b;
}
export function division (a, b) {
    return a / b;
}

module.exports = {
    add,
    minus,
    multiply,
    division
}