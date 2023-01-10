/*
 * @Descripttion:
 * @Author: lukasavage
 * @Date: 2021-07-19 09:31:34
 * @LastEditors: lukasavage
 * @LastEditTime: 2022-04-29 09:32:35
 * @FilePath: \15 TypeScript\demo.ts
 */
/**
 * 为class添加一个属性
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// interface A {
//     age: string;
//     name: unknown;
// }
// interface B {
//     name: number;
//     sex: '男' | '女'
// }
// type C = A & B;
// const d: C = {
//     age: '234',
//     sex: '女',
//     name: 234,
// }
function aa(tag) {
    // 这里的tag指向的是class A
    console.log(tag);
}
var A = /** @class */ (function () {
    function A() {
        this.name = 'zhangsan';
        this.age = 23;
    }
    A = __decorate([
        aa
    ], A);
    return A;
}());
// Symbol('key') === Symbol('key')
// console.log(hell);
// console.log(d);
