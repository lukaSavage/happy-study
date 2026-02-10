/*
 * @Descripttion: 
 * @Author: lukasavage
 * @Date: 2026-02-09 23:38:19
 * @LastEditors: lukasavage
 * @LastEditTime: 2026-02-10 00:07:23
 * @FilePath: \happy-study\11 react\my-next\app\temps\page.tsx
 */
'use client';

import { useContext, useState } from 'react';
import { saveDataToServer } from '../anything';



export default function Page() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {
    const result = await saveDataToServer(input); // 调用 serverAction
    console.log('%c [ result ]-22', 'font-size:13px; background:#70d24f; color:#b4ff93;', result)
    setResponse(result);
  };

  return (
    <div>
      <h1>Server Action 示例</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="输入一些数据"
      />
      <button onClick={handleSubmit}>提交</button>
      {response && <p>{response}</p>}
    </div>
  );
}
