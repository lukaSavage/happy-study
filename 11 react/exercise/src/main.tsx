import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { atom, RecoilRoot, useRecoilState } from 'recoil'
import ZustandDemo from './components/ZustandDemo'
import Flip from './components/Flip'

const counter = atom({
  key: 'demo',
  default: 0
})

const App = () => {
  // let [count, setCount] = useRecoilState(counter)
  const [count, setCount] = useState(0)
  return (
    <div>
      <h1>{count}</h1>
      <button
        onClick={() => {
          setCount(count + 1)
        }}
      >
        点我加1
      </button>
      {/* <ZustandDemo /> */}
      {/* <Flip /> */}
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>
)
