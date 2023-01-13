import { makeAutoObservable } from 'mobx'

class Cart {
    list = [1, 2, 3]
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }
}

const cart = new Cart()
export default cart