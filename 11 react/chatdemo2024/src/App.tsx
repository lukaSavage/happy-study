import { useEffect, useRef, useState } from 'react'
import OpenAI from 'openai'
import { flushSync } from 'react-dom'
import { Msg, Role } from './types'
import { TextField, Button } from '@mui/material'

const initMsg: Msg = {}

function App() {
  const msgQueue = useRef<Msg[]>([])
  const [currentQueue, setcurrentQueue] = useState<Msg[]>(msgQueue.current)
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    // main()
  }, [])

  async function main(txt: string = '') {
    console.log('执行了main')

    const openai = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: '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',
      dangerouslyAllowBrowser: true
      // defaultHeaders: {
      //   'HTTP-Referer': $YOUR_SITE_URL, // Optional, for including your app on openrouter.ai rankings.
      //   'X-Title': $YOUR_SITE_NAME // Optional. Shows in rankings on openrouter.ai.
      // }
    })
    const stream = await openai.chat.completions.create({
      // model: 'mistralai/mistral-7b-instruct:free',
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: txt }],
      stream: true
    })

    const robatObj = {
      role: Role.ASSISTANT,
      content: ''
    }
    msgQueue.current = [...msgQueue.current, robatObj]

    for await (const chunk of stream) {
      let tempMsg = [...msgQueue.current, robatObj]
      const propObj = tempMsg.pop() || robatObj
      propObj.content += chunk.choices[0].delta.content || ''
      // msgQueue.current.splice(-1, 1, robatObj)
      // tempMsg.push(propObj)
      setcurrentQueue(tempMsg)
      console.log(chunk.choices[0].delta)
    }
  }
  const handleSend = async () => {
    let str = inputValue.substring(0)
    const userObj = {
      role: Role.USER,
      content: str
    }
    msgQueue.current = [...msgQueue.current, userObj]
    setcurrentQueue([...currentQueue, userObj])
    setInputValue('')
    await main(str)
    console.log(111)
  }

  return (
    <div>
      <TextField
        placeholder="请输入问题"
        value={inputValue}
        onChange={e => {
          const value = e.target.value
          setInputValue(value)
        }}
      />
      <Button variant="outlined" onClick={handleSend}>
        发送
      </Button>
      <hr />
      <div>
        <h1>下面是对话列表</h1>
        <div className="msg-queue">
          {currentQueue.map((item, index) => (
            <div className="talk-box" key={index}>
              <span style={{ color: item.role === Role.ASSISTANT ? '#f00' : '#08e' }}>
                {item.role === Role.ASSISTANT ? '机器人' : '我'}
              </span>
              ：<span>{item.content}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
