const hello = (name: string) => {
  console.log(`hello,${name}`)
}
hello('bar')


const nums = [110, 1]

function creatNumberArray (length: number, value: number): number[] {
  const arr = Array<number>(length).fill(value)
  return arr
}

function creatStringArray (length: number, value: string): string[] {
  const arr = Array<string>(length).fill(value)
  return arr
}
function creatArray<T> (length: number, value: T): T[] {
  const arr = Array<T>(length).fill(value)
  return arr
}

const arr: Array<number> = [123, 'df']
const arr1:[number] =[13]
const arr3: number[] = [1]
const arr4:Array[number] =[2]

const res = creatNumberArray(3, 100)

// res => [100, 100, 100]