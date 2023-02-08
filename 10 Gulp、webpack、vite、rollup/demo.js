let obj = {}
Object.defineProperty(obj, Symbol.toStringTag, { value: 'Module' })
console.log(obj)
