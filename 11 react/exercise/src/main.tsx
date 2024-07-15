import React from 'react'
import ReactDOM from 'react-dom/client'
import { atom, RecoilRoot, useRecoilState } from 'recoil'

const counter = atom({
    key: 'demo',
    default: 0
})

const App = () => {
    let [count, setCount] = useRecoilState(counter)
    return (
        <div>
            <h1>{count}</h1>
            <button
                onClick={() => {
                    setCount(++count)
                }}
            >
                点我加1
            </button>
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
