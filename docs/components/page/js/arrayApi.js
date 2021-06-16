// filter
function filter (array, fn) {
	let result = []
	for (let i = 0; i < array.length; i++) {
		console.log(fn)
		// if(fn(array[i])) {
		// 	result.push(array[i]+2);
		// }
	}
	return result
}
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

let r = filter(arr, function (item) {
	return item % 5 === 0
})

Array.prototype.filter1 = filter

// console.log(r)
// console.log(filter(arr, item => item % 5 === 0))
console.log(arr.filter1(item => item % 5 === 0))

// some 
const some = (array, fn) => {
	let result = false
	for (let value of array) {
		result = fn(value)
		if (result) {
			break
		}
	}
	return result
}

let someArr = [1, 2, 3, 5, 7, 9]
console.log(some(someArr, v => v % 2 === 1))

// every
const every = (array, fn) => {
	let result = true
	for (let value of array) {
		result = fn(value)
		if (!result) {
			break
		}
	}
	return result
}
console.log(every(someArr, v => v % 2 === 1))

// map
const map = (array, fn) => {
	let result = []
	for (let value of array) {
		result.push(fn(value))
	}
	return result 
}

console.log(map(arr, v => v * v))


const demoArray = [1, 2, 3, 4, 5, 6, 7]

console.log([].concat(...demoArray).reduce((item, child) => {
	console.log('item', item)
	console.log('child', child)
	return item + child
},[]))