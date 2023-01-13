import { createContext, useContext } from 'react'
import cart from './Cart'
import counter from './counter'

class RootStore {
    cart = cart
    counter = counter
}

const store = new RootStore()

const context = createContext(store)

// 自定义一个hook
export function useStore() {
    return useContext(context)
}