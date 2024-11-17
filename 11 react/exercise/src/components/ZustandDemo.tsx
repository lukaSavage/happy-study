import useStore from '../store'
const ZustandDemo = () => {
    const count = useStore(state => state.count)
    const increase = useStore(state => state.increase)
    const asyncIncrease = useStore(state => state.asyncIncrease)

    return (
        <div>
            <h1>zustandDemo...</h1>
            <hr />
            <div>当前store中的值：</div>
            <div style={{ color: '#f00' }}>
                =={'>'} {count}
            </div>
            <hr />
            <button onClick={() => increase()}>点我加1</button>
            <button onClick={() => asyncIncrease()}>异步加1</button>
        </div>
    )
}

export default ZustandDemo
