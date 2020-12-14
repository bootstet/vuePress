// 字面量

// let str = 'my name is chenyouzeng'
// let reg = new RegExp('A', 'i')
// let res = reg.test(str)

// console.log(res)

// match

// let str="132dfdf465gaer465fgds654gfa";
// let reg=/\d+/;
// let res=str.match(reg);
// console.log(res)

// replace

// let str="SymbolLu";
// let reg=/Lu/;
// let res=str.replace(reg,"卢");
// console.log(res)//Symbol卢

let str='521Symbol卢2121';//自恋一下，哈哈😄
//再回顾一下，创建正则的两种方法，大家根据喜好自行选择哈
//let regExp=new RegExp('[0-9]+','g');
let regExp =/[0-9]+/g;
//再回顾一下，加深印象  math 方法以数组的形式返回  满足正则表达式匹配的内容
// console.log(str.match(regExp));
//结果为["521", "2121"]

let str1 = '123jkhlk12ljjbh34lkj12'
let regExp1 = /12{1,5}/g
// console.log(str1.match(regExp1))

let phone = '13243433434'
// let phoneReg = /^1[3456789]\d{9}/g
// let phoneReg = /^1[3456789][0-9]{9}/g
// let phoneReg = /^1[3456789][0-9]{8}[^8]/g
let phoneReg = /^1[3456789][0-9]{8}[8]/g


// [0-9]  ==  \d
// [^0-9] ==  \D
// [A-Za-z0-9_] == \w 
// [^A-Za-z0-9_] == \W


//  /[\u4e00-\u9fa5]/ 正则只能匹配中文，匹配汉字是不正确;

//  /\p{Unified_Ideograph}/u 是正确的，不需要维护，匹配所有汉字。

let emailText = 'zhoudf@hua-cloud.com.cn'
let emailText1 = 'zhoudf@hua-cloud.com'
let emailText2 = 'zhoudf@huacloud.com'
let emailReg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9-_.]+\.([a-zA-Z]{2,4})$/

let abcReg = /^\?_\d{4}|^\d{4}_$/g

// console.log(/(^_[0-9]{4}|^\d{4}_$){0}/.test('3333'))

// console.log(/(^[^3])/.test('12'))

console.log(!/[\u4e00-\u9fa5。，、]/.test('sdfas.d..,.dfsf，'))
console.log(/\w+/.test('dfasfdhk  ..。。大沙雕'))
