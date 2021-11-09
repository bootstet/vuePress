JavaScript基础
### 1、new操作符的实现原理
new操作符的执行过程：
（1）首先创建了一个新的空对象
（2）设置原型，将对象的原型设置为函数的 prototype 对象。
（3）让函数的 this 指向这个对象，执行构造函数的代码（为这个新对象添加属性）
（4）判断函数的返回值类型，如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象。
```js
  function objectFactory() {
    let newObject = null;
    let constructor = Array.prototype.shift.call(arguments);
    let result = null;
    // 判断参数是否是一个函数
    if (typeof constructor !== "function") {
      console.error("type error");
      return;
    }
    // 新建一个空对象，对象的原型为构造函数的 prototype 对象
    newObject = Object.create(constructor.prototype);
    // 将 this 指向新建对象，并执行函数
    result = constructor.apply(newObject, arguments);
    // 判断返回对象
    let flag = result && (typeof result === "object" || typeof result === "function");
    // 判断返回结果
    return flag ? result : newObject;
  }
  // 使用方法
  objectFactory(构造函数, 初始化参数);
```
### 2、map和Object的区别
||Map|Object|
|--|--|--|
|意外的键|Map默认情况不包含任何键，只包含显式插入的键。|Object 有一个原型, 原型链上的键名有可能和自己在对象上的设置的键名产生冲突。|
|键的类型|Map的键可以是任意值，包括函数、对象或任意基本类型。|Object 的键必须是 String 或是Symbol。|
|键的顺序|Map 中的 key 是有序的。因此，当迭代的时候， Map 对象以插入的顺序返回键值。|Object 的键是无序的|
|Size|Map 的键值对个数可以轻易地通过size 属性获取|Object 的键值对个数只能手动计算|
|迭代|Map 是 iterable 的，所以可以直接被迭代。|迭代Object需要以某种方式获取它的键然后才能迭代。|
|性能|在频繁增删键值对的场景下表现更好。|在频繁添加和删除键值对的场景下未作出优化。|

### 3、map和weakMap的区别
#### （1）Map
map本质上就是键值对的集合，但是普通的Object中的键值对中的键只能是字符串。而ES6提供的Map数据结构类似于对象，但是它的键不限制范围，可以是任意类型，是一种更加完善的Hash结构。如果Map的键是一个原始数据类型，只要两个键严格相同，就视为是同一个键。

实际上Map是一个数组，它的每一个数据也都是一个数组，其形式如下：
```js
  const map = [
     ["name","张三"],
     ["age",18],
  ]
```

Map数据结构有以下操作方法：
+ size： map.size 返回Map结构的成员总数。
+ set(key,value)：设置键名key对应的键值value，然后返回整个Map结构，如果key已经有值，则键值会被更新，否则就新生成该键。（因为返回的是当前Map对象，所以可以链式调用）
+ get(key)：该方法读取key对应的键值，如果找不到key，返回undefined。
+ has(key)：该方法返回一个布尔值，表示某个键是否在当前Map对象中。
+ delete(key)：该方法删除某个键，返回true，如果删除失败，返回false。
+ clear()：map.clear()清除所有成员，没有返回值。

Map结构原生提供是三个遍历器生成函数和一个遍历方法

+ keys()：返回键名的遍历器。
+ values()：返回键值的遍历器。
+ entries()：返回所有成员的遍历器。
+ forEach()：遍历Map的所有成员。
```js
  const map = new Map([
     ["foo",1],
     ["bar",2],
  ])
  for(let key of map.keys()){
      console.log(key);  // foo bar
  }
  for(let value of map.values()){
      console.log(value); // 1 2
  }
  for(let items of map.entries()){
      console.log(items);  // ["foo",1]  ["bar",2]
  }
  map.forEach( (value,key,map) => {
      console.log(key,value); // foo 1    bar 2
  })
```
#### (2)WeakMap
WeakMap 对象也是一组键值对的集合，其中的键是弱引用的。**其键必须是对象**，原始数据类型不能作为key值，而值可以是任意的。

该对象也有以下几种方法：
+ set(key,value)：设置键名key对应的键值value，然后返回整个Map结构，如果key已经有值，则键值会被更新，否则就新生成该键。（因为返回的是当前Map对象，所以可以链式调用）
+ get(key)：该方法读取key对应的键值，如果找不到key，返回undefined。
+ has(key)：该方法返回一个布尔值，表示某个键是否在当前Map对象中。
+ delete(key)：该方法删除某个键，返回true，如果删除失败，返回false。
 其clear()方法已经被弃用，所以可以通过创建一个空的WeakMap并替换原对象来实现清除。

WeakMap的设计目的在于，有时想在某个对象上面存放一些数据，但是这会形成对于这个对象的引用。一旦不再需要这两个对象，就必须手动删除这个引用，否则垃圾回收机制就不会释放对象占用的内存。

而WeakMap的键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内。因此，只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。也就是说，一旦不再需要，WeakMap 里面的键名对象和所对应的键值对会自动消失，不用手动删除引用。

总结：
+ Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。
+ WeakMap 结构与 Map 结构类似，也是用于生成键值对的集合。但是 WeakMap 只接受对象作为键名（ null 除外），不接受其他类型的值作为键名。而且 WeakMap 的键名所指向的对象，不计入垃圾回收机制。



### 4、Javascript 有哪些内置对象
全局的对象（ global objects ）或称标准内置对象，不要和 "全局对象（global object）" 混淆。这里说的全局的对象是说在
全局作用域里的对象。全局作用域中的其他对象可以由用户的脚本创建或由宿主程序提供。

标准内置对象的分类：
（1）值属性，这些全局属性返回一个简单值，这些值没有自己的属性和方法。
例如 Infinity、NaN、undefined、null 字面量
（2）函数属性，全局函数可以直接调用，不需要在调用时指定所属对象，执行结束后会将结果直接返回给调用者。
例如 eval()、parseFloat()、parseInt() 等
（3）基本对象，基本对象是定义或使用其他对象的基础。基本对象包括一般对象、函数对象和错误对象。
例如 Object、Function、Boolean、Symbol、Error 等
（4）数字和日期对象，用来表示数字、日期和执行数学计算的对象。
例如 Number、Math、Date
（5）字符串，用来表示和操作字符串的对象。
例如 String、RegExp
（6）可索引的集合对象，这些对象表示按照索引值来排序的数据集合，包括数组和类型数组，以及类数组结构的对象。例如 Array
（7）使用键的集合对象，这些集合对象在存储数据时会使用到键，支持按照插入顺序来迭代元素。
例如 Map、Set、WeakMap、WeakSet
（8）矢量集合，SIMD 矢量集合中的数据会被组织为一个数据序列。
例如 SIMD 等
（9）结构化数据，这些对象用来表示和操作结构化的缓冲区数据，或使用 JSON 编码的数据。
例如 JSON 等
（10）控制抽象对象
例如 Promise、Generator 等
（11）反射
例如 Reflect、Proxy
（12）国际化，为了支持多语言处理而加入 ECMAScript 的对象。
例如 Intl、Intl.Collator 等
（13）WebAssembly
（14）其他
例如 arguments

总结：
js 中的内置对象主要指的是在程序执行前存在全局作用域里的由 js 定义的一些全局值属性、函数和用来实例化其他对象的构造函数对象。一般经常用到的如全局变量值 NaN、undefined，全局函数如 parseInt()、parseFloat() 用来实例化对象的构造函数如 Date、Object 等，还有提供数学计算的单体内置对象如 Math 对象。

### 5、常用的正则表达式有哪些？
```js
  // （1）匹配 16 进制颜色值
  var regex = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/g;

  // （2）匹配日期，如 yyyy-mm-dd 格式
  var regex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

  // （3）匹配 qq 号
  var regex = /^[1-9][0-9]{4,10}$/g;

  // （4）手机号码正则
  var regex = /^1[34578]\d{9}$/g;

  // （5）用户名正则
  var regex = /^[a-zA-Z\$][a-zA-Z0-9_\$]{4,16}$/;
```

### 6、对JSON的理解
JSON 是一种基于文本的轻量级的数据交换格式。它可以被任何的编程语言读取和作为数据格式来传递。

在项目开发中，使用 JSON 作为前后端数据交换的方式。在前端通过将一个符合 JSON 格式的数据结构序列化为 
JSON 字符串，然后将它传递到后端，后端通过 JSON 格式的字符串解析后生成对应的数据结构，以此来实现前后端数据的一个传递。

因为 JSON 的语法是基于 js 的，因此很容易将 JSON 和 js 中的对象弄混，但是应该注意的是 JSON 和 js 中的对象不是一回事，JSON 中对象格式更加严格，比如说在 JSON 中属性值不能为函数，不能出现 NaN 这样的属性值等，因此大多数的 js 对象是不符合 JSON 对象的格式的。

在 js 中提供了两个函数来实现 js 数据结构和 JSON 格式的转换处理，
+ JSON.stringify 函数，通过传入一个符合 JSON 格式的数据结构，将其转换为一个 JSON 字符串。如果传入的数据结构不符合 JSON 格式，那么在序列化的时候会对这些值进行对应的特殊处理，使其符合规范。在前端向后端发送数据时，可以调用这个函数将数据对象转化为 JSON 格式的字符串。
+ JSON.parse() 函数，这个函数用来将 JSON 格式的字符串转换为一个 js 数据结构，如果传入的字符串不是标准的 JSON 格式的字符串的话，将会抛出错误。当从后端接收到 JSON 格式的字符串时，可以通过这个方法来将其解析为一个 js 数据结构，以此来进行数据的访问。

### 7、JavaScript脚本延迟加载的方式有哪些？
延迟加载就是等页面加载完成之后再加载 JavaScript 文件。 js 延迟加载有助于提高页面加载速度。

一般有以下几种方式：
+ defer 属性：给 js 脚本添加 defer 属性，这个属性会让脚本的加载与文档的解析同步解析，然后在文档解析完成后再执行这个脚本文件，这样的话就能使页面的渲染不被阻塞。多个设置了 defer 属性的脚本按规范来说最后是顺序执行的，但是在一些浏览器中可能不是这样。
+ async 属性：给 js 脚本添加 async 属性，这个属性会使脚本异步加载，不会阻塞页面的解析过程，但是当脚本加载完成后立即执行 js 脚本，这个时候如果文档没有解析完成的话同样会阻塞。多个 async 属性的脚本的执行顺序是不可预测的，一般不会按照代码的顺序依次执行。
+ 动态创建 DOM 方式：动态创建 DOM 标签的方式，可以对文档的加载事件进行监听，当文档加载完成后再动态的创建 script 标签来引入 js 脚本。
+ 使用 setTimeout 延迟方法：设置一个定时器来延迟加载js脚本文件
+ 让 JS 最后加载：将 js 脚本放在文档的底部，来使 js 脚本尽可能的在最后来加载执行。

