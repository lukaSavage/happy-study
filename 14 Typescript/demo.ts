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
  name: string
  age: number
  married: boolean
}

type Arr = Array<string | number>
type get<T> = T extends Array<infer U> ? U : T
// type B = get<Arr>

type A = 'a' | 'b'
type B = 'b' | 'c'

type C = A & B

type TrimLeft<T extends string> = T extends `${infer R} ` ? TrimLeft<R> : T
type TrimRight<T extends string> = T extends ` ${infer R}` ? TrimRight<R> : T

type Trim<T extends string> = TrimLeft<TrimRight<T>>

type Test = Trim<'   hello  '>

type MyPick<T extends unknown, R extends keyof T> = {
  [K in R]: T[K]
}
const person = { name: 'zhangsan', age: 12 }
type XXX = Pick<typeof person, 'age'>

type YourPick<T extends unknown, R extends keyof T> = {
  [K in R]: T[K]
}

type YourExclude<T, U> = T extends U ? never : T

type D = YourExclude<1 | 2 | 3, 1 | 3>

type YourPick<T, U extends keyof T> = {
  [K in U]: T[k]
}

type AA = YourPick<{ name: string; age: number }, 'age'>
