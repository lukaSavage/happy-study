import { observer } from 'mobx-react'
import { createRoot } from 'react-dom/client'
import { useStore } from './store'
import { observable } from 'mobx'

const Child = observer(() => {
    const { counter } = useStore()
    let obj = { name: '1' }
    return (
        <div>
            <h1>当前的值：{counter.count}</h1>
            <button onClick={counter.increment}>同步+1</button>
            <button onClick={counter.incrementAsync}>异步+1</button>
        </div>
    )
})

const App = () => {
    return <Child />
}
createRoot(document.getElementById('root') as Element).render(<App />)
