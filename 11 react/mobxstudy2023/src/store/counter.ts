import { makeAutoObservable } from 'mobx'
class Counter {
    count: number = 0
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }
    get double() {
        return this.count * 2
    }
    increment() {
        this.count++
        console.log(this.count);
        
    }
    *fetch(): Generator<any, any, any> {
        const response = yield new Promise((resolve) => setTimeout(() => resolve(5), 1000))
        this.count = response
    }
}
const counter = new Counter()
export default counter
