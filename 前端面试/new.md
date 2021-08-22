## new的过程中发生了什么，怎么实现

### 参考地址：https://www.cnblogs.com/echolun/p/10110839.html  https://www.cnblogs.com/echolun/p/10903290.html

### 发生了什么
    1、创建了一个空对象，将他的引用赋值给this，集成函数的原型
    2、通过this将属性和方法添加至这个对象
    3、最后返回this指向的新对象，也就是实例

```javascript
    let parent = function(name, age){
        // 1、创建一个新对象，赋予this,这一步操作是隐形的
        // let this. = {}
        // 2、给this指向新的对象赋予构造属性
        this.name = name
        this.age = age
        // 3、如果没有手动返回对象，则默认返回this指向的这个对象，也是隐式的
        // 如果返回的不是对象，则会自动忽略这个返回值，返回隐式this指向的对象
        return this
    }
```

### 自己如何实现一个new
```javascript
    // 1、构造器函数
    let Parent = function(name, age){
        this.name = name
        this.age = age
    }

    Parent.sayName = function(){
        console.log(this.name)
    }

    // 2、自定义new方法

    let newMethod = function(ctr, ...rest){
        // 一构造器的prototype属性为原型，创建新对象
        let child = Object.create(ctr.prototype)
        // 将this和条用参数传给构造器执行
        let result = ctr.apply(child, rest)
        // 如果构造器没有手动返回对象，则返回第一步的对象
        return typeof result === 'object' ? result : child
    }
    const child = newMethod(Parent, '张三', 18)
    child.sayName() // '张三'

    //最后检验，与使用new的效果相同
    child instanceof Parent//true
    child.hasOwnProperty('name')//true
    child.hasOwnProperty('age')//true
    child.hasOwnProperty('sayName')//false
```