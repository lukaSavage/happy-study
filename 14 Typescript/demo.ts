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

function aa(tag: any) {
    // 这里的tag指向的是class A
    console.log(tag)
}

@aa
class A {
    name: string | undefined
    age: number | undefined
    constructor() {
        this.name = 'zhangsan'
        this.age = 23
    }
}
// Symbol('key') === Symbol('key')
// console.log(hell);
// console.log(d);
