import { observer } from 'mobx-react'
import react from 'react'
import { createRoot } from 'react-dom/client'
import { useStore } from './store'

const Child = observer(() => {
    const { counter } = useStore()
    return (
        <div>
            <h1>当前的值：{counter.count}</h1>
            <button onClick={counter.fetch}>点我+1</button>
        </div>
    )
})

const App = () => {
    return <Child />
}
createRoot(document.getElementById('root') as Element).render(<App />)
