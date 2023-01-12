import { action, autorun, computed, makeObservable, observable } from 'mobx'

// class A {
//     constructor(public value: any) {
//         makeObservable(this, {
//             value: observable
//         })
//     }

//     get double() {
//         return this.value * 3
//     }
// }

// const aInstance = new A(1)
// autorun(() => {
//     console.log('11111111', aInstance.value, aInstance.double)
// })

// aInstance.value = 233
class Doubler {
    constructor(public value: any) {
        makeObservable(this, {
            value: observable,
            double: computed,
            increment: action
        })
        this.value = value
    }
    get double() {
        return this.value * 2
    }
    
    increment() {
        this.value++
        this.value++
    }
}
const doubler = new Doubler(1)
autorun(() => {
    console.log(doubler.value)
    // console.log(doubler.double)
})

doubler.increment()