// function Person() {

// }
// var persion = new Person()
// persion.name = 'Kevin'
// console.log(persion.name)
// console.log(123)
// console.log(Person)

// console.log(persion.__proto__ === Person.prototype)
// console.log(Person.prototype.constructor === Person)

const p1 = {
  firstName: 'lei',
  lastName: 'wang',
  get fullName() {
    return this.firstName + '' + this.lastName
  }
}

// console.log(p1.fullName)


// const p2 = Object.assign({}, p1)
// p2.firstName = 'zce'
// console.log(p2)

const descriptors = Object.getOwnPropertyDescriptors(p1)  // 获取对象属性的完整 描述信息

console.log(descriptors)

const p2 = Object.defineProperties({}, descriptors) // 将描述信息定义到一个新的对象
p2.firstName = 'zce'
console.log(p2.fullName)


