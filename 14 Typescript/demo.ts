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
// 尝试一下获取函数的返回值

// type Constructor = new (...args: any[]) => any;
// type ConstructorParameters<T extends Constructor> = T extends new (...args: infer P) => any ? P : never;
// type InstanceType<T extends Constructor> = T extends new (...args: any[]) => infer R ? R : any;
interface Person {
    name: string;
    age: number;
    married: boolean
}
type A = Overw<string, string>
let eg: A = {
    name: '战三',
    age: 22, // 报错，不是string类型
    married: 1 // 报错，不是string类型
}

