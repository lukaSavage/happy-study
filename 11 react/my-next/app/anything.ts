/*
 * @Descripttion: 
 * @Author: lukasavage
 * @Date: 2026-02-09 23:34:13
 * @LastEditors: lukasavage
 * @LastEditTime: 2026-02-10 00:06:14
 * @FilePath: \happy-study\11 react\my-next\app\anything.ts
 */

'use server'

export async function getMessage() {
  // Ensure we don't return before the value is assigned.
  const data = await new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve('hello world')
    }, 1000)
  })
  return data
}

// 定义一个 serverAction
export async function saveDataToServer(data: string) {
  console.log('服务器端接收到的数据:', data);
  // 这里可以执行数据库操作或其他逻辑
  return `数据已保存: ${data}`;
}