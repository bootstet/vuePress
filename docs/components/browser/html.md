## 一、JavaScript

### 1、常见的DOM操作有哪些？

#### 1）DOM节点的获取
  ```js
    document.getElementById('id')  // 通过id获取
    document.getElementByClassName('name')  // 通过name获取
    document.getElementByTagName('tagname') // 通过标签获取
    document.querySelector('.leixing')  // 通过选择器获取一个元素
    document.querySelectorAll('leixing')  // 通过选择器获取一组元素
    document.body
    document.documentElement
  ```
#### 2）DOM节点的创建
  ```js
    var targetSpan = document.createElement('span')
    targetSpan.innerHTML = 'span'
    parentNode.appendChild(targetSpan)
  ```
#### 3）DOM节点的删除
  ```js
    dang1.removeChild(dang1)
  ```
#### 4）修改DOM元素
  ```js
    // 获取父元素
    var container = document.getElementById('container')   
    
    // 获取两个需要被交换的元素
    var title = document.getElementById('title')
    var content = document.getElementById('content')
    // 交换两个元素，把 content 置于 title 前面
    container.insertBefore(content, title)
  ```