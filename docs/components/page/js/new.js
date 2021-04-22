function test (name) {
  this.name = name
}

test.prototype.sayName = function() {
  console.log(this.name)
}

const t = new test('cyz')
// console.log(t.name)

// t.sayName()

function create(con, ...args) {
  let obj = {}
  Object.setPrototypeOf(obj, con.prototype)
  let result = con.apply(obj, args)
  return result instanceof Object ? result : obj
}

// function once (fn) {
//   let done = false
//   return function () {
//     if(!done) {
//       done = true
//       return fn.apply(this, arguments)
//       // return fn(arguments)
//     }
//   }
// }

// let pay = once(function (money) {
//   console.log(money[0])
//   console.log(`支付了${money} RMB`)
// })

// pay(5)
// pay(5)
// console.log( 213 instanceof Object)
function Test(name, age) {
  this.name = name
  this.age = age
}
Test.prototype.sayName = function() {
  console.log(this.name)
}
const a = create(Test, 'cyz11', 27)
console.log(a.name) // cyz
console.log(a.age)  // 27
a.sayName() // cyz