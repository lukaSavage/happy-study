import { useRef, useState } from 'react'
import OpenAI from 'openai'
import { Msg, Role } from './types'
import { TextField, Button } from '@mui/material'
import './app.less'
import Robat from './assets/robat.svg'

function App() {
  const msgQueue = useRef<Msg[]>([])
  const [currentQueue, setcurrentQueue] = useState<Msg[]>(msgQueue.current)
  const [inputValue, setInputValue] = useState('')
  // 检测键盘输入拼音
  const [isComposing, setIsComposing] = useState(false)
  // 是否正在回答
  const [isAnswering, setIsAnswering] = useState(false)
  // 当前api key
  const [apiKey, setApiKey] = useState('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')
  // apikey是否处于编辑中
  const [isEdit, setIsEdit] = useState(false)

  async function main(txt: string = '', key: string = apiKey) {
    setIsAnswering(true)
    const openai = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: key,
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
      setcurrentQueue(tempMsg)
    }
    setIsAnswering(false)
  }
  const handleSend = async () => {
    if (!inputValue) return
    let str = inputValue.substring(0)
    const userObj = {
      role: Role.USER,
      content: str
    }
    msgQueue.current = [...msgQueue.current, userObj]
    setcurrentQueue([...currentQueue, userObj])
    setInputValue('')
    await main(str).catch(e=>{
      alert(e)
    }).finally(()=>{
      setIsAnswering(false)
    })
  }

  const handleReset = () => {
    setApiKey('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')
  }

  return (
    <div className="chat-box">
      <header>
        <div style={{ maxWidth: 768, margin: '0 auto', display: 'flex', width: '100%' }}>
          <TextField
            id="outlined-basic"
            label="apiKey"
            value={apiKey}
            onChange={e => {
              const val = e.target.value
              setApiKey(val)
            }}
            placeholder="请输入apiKey"
            size="small"
            disabled={!isEdit}
            style={{ flex: 1 }}
          />
          <Button
            variant="contained"
            onClick={() => {
              setIsEdit(!isEdit)
            }}
            style={{ margin: '0 12px' }}
          >
            {isEdit ? '保存' : '编辑'}
          </Button>
          <Button variant="outlined" onClick={handleReset}>
            重置
          </Button>
        </div>
      </header>
      <div className="chat-context">
        {/* <h1>下面是对话列表</h1> */}
        <div className="msg-queue">
          {currentQueue.map((item, index) => (
            <div className={`talk-box ${item.role === Role.USER ? 'user-box' : ''}`} key={index}>
              {item.role === Role.ASSISTANT && (
                <div className="avatar">
                  <img src={Robat} alt="" />
                </div>
              )}
              <span className={`txt ${item.role === Role.USER ? 'user-txt' : ''}`}>{item.content}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="search-box">
        <input
          value={inputValue}
          onChange={e => {
            const value = e.target.value
            setInputValue(value)
          }}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
              e.preventDefault()
              handleSend()
            }
          }}
          className="input-value"
          type="text"
          placeholder="请输入问题，支持enter键提问"
          disabled={isAnswering}
          style={{ cursor: isAnswering ? "not-allowed" : 'auto' }}
        />
        <div className="btn" style={{ background: !inputValue || isAnswering ? '#d7d7d7' : '#000' }} onClick={handleSend}>
          <svg
            // style={{ color: !inputValue || isAnswering ? '#fff' : '#000' }}
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="none"
            viewBox="0 0 32 32"
            className="icon-2xl"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M15.192 8.906a1.143 1.143 0 0 1 1.616 0l5.143 5.143a1.143 1.143 0 0 1-1.616 1.616l-3.192-3.192v9.813a1.143 1.143 0 0 1-2.286 0v-9.813l-3.192 3.192a1.143 1.143 0 1 1-1.616-1.616z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default App
