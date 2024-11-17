import { create } from 'zustand'

const useStore = create((set, get) => ({
    count: 0,
    increase: () => {
        console.log(`111111111111`)

        set((state: { count: number }) => ({ count: state.count + 1 }))
    },
    asyncIncrease: () => {
        setTimeout(() => {
            set((state: { count: number }) => ({ count: state.count + 1 }))
        }, 1000)
    }
}))

export default useStore
