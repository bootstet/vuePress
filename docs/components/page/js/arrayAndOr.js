const a = [1, 2, 3]
const b = [2, 4, 5]
const union = a.concat(b.filter(v => !a.includes(v)))

console.log(union)
const interserction = b.filter(v => a.includes(v))
const interserction1 = a.filter(v => b.includes(v))
console.log(interserction)
console.log(interserction1)

const difference = b.filter(v => !a.includes(v)).concat(a.filter(v => !b.includes(v)))
console.log(difference)

const s = new Set()
s.add(1).add(2).add(3)
s.forEach(i => console.log(i))

s.has()  // 是否包含某个值
s.delete(2) // 删除某一项
// s.clear()  // 清空
const dom= [...s] // 展开某个数组
console.log(dom)

const array = [ 1, 2, 3, 2, 2, 4 ]
console.log(new Set(array))