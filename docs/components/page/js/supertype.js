// function SuperType () {
//   this.colors = ['red', 'blue', 'green']
//   this.age = 18
// }

// function SubType () {}

// // 继承 superType
// SubType.prototype = new SuperType()

// var instance1 = new SubType()
// instance1.colors.push('black')
// instance1.age = 20
// console.log(instance1.colors)
// console.log(instance1.age)

// var instance2 = new SubType()
// console.log(instance2.colors)
// console.log(instance2.age)

// function sum(num1, num2) {
//   return num1 + num2
// }
// console.log(sum(10, 10))

// var anotherSum = sum
// console.log(anotherSum(10, 10))

// sum = null
// console.log(anotherSum(10, 10))

// setTimeout(function(){
//   console.log('定时器开始啦')
// });

// new Promise(function(resolve){
//   console.log('马上执行for循环啦');
//   for(var i = 0; i < 10000; i++){
//       i == 99 && resolve();
//   }
// }).then(function(){
//   console.log('执行then函数啦')
// });

// console.log('代码执行结束');

// ----------------------------

// console.log('1');

// setTimeout(function() {
//     console.log('2');
//     process.nextTick(function() {
//         console.log('3');
//     })
//     new Promise(function(resolve) {
//         console.log('4');
//         resolve();
//     }).then(function() {
//         console.log('5')
//     })
// })
// process.nextTick(function() {
//     console.log('6');
// })
// new Promise(function(resolve) {
//     console.log('7');
//     resolve();
// }).then(function() {
//     console.log('8')
// })

// setTimeout(function() {
//     console.log('9');
//     process.nextTick(function() {
//         console.log('10');
//     })
//     new Promise(function(resolve) {
//         console.log('11');
//         resolve();
//     }).then(function() {
//         console.log('12')
//     })
// })

console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});
