## call apply

### 每个函数都包含两个非继承而来的方法：call() apply()

### 相同点：这两个方法的作用是一样的，都是在特定的作用域中调用函数，刚与设置函数体内的this对象的值，以扩充函数依赖运行的作用域，一般来说，this总是指向调用某个方法的对象，但是使用call和apply方法时，就会改变this的指向。

### call()方法的使用示例：
```javascript
        // 例1：
        window.color = 'red'
        document.color = 'yellow'
        var s1 = {
            color:'blue'
        }
        function changeColor(){
            console.log(this.color)
        }
        changeColor.call()          // red
        changeColor.call(window)    // red
        changeColor.call(document)  // yellow
        changeColor.call(this)      // red
        changeColor.call(s1)        // blue
        //例2
        var Pet = {
            word:'...',
            speak:function(say){
                console.log(say + '' + this.words)
            }
        }
        Pet.speak('Speak')          // Speak...
        var Dog = {
            words:'Wang'
        }
        Pet.Speak.call(Dog,'Speak') // SpeakWang
```

### apply()方法的使用示例：
```javascript
        // 例1
        window.number = 'one'
        document.number = 'two'
        var s1 = {
            number:'three'
        }
        function changeColor(){
            console.log(this.number)
        }
        changeColor.apply()         // one
        changeColor.apply(window);  // one
        changeColor.apply(document);// two
        changeColor.apply(this);    // one
        changeColor.apply(s1);      // three
        // 例 2
        function Pet(words){
            this.words = words;
            this.speak = function () {
                console.log( this.words)
            }
        }
        function Dog(words){
            // Pet.call(this, words); // 结果： Wang
            Pet.apply(this, arguments); // 结果： Wang
        }
        var dog = new Dog('Wang');
        dog.speak();
```

### 不同点：接受参数的方式不同
    apply()方法接受两个参数，一个是函数运行的作用域（this），另一个是参数数组
    call()可以接受多个参数，第一个参数是函数运行的作用域（this），后面的参数需要一个一个列举出来

### 区别示例：
```javascript
    <script>
        // 例1：
        function add(c, d){
            return this.a + this.b + c + d
        }
        var s = {
            a:1,
            b:2
        }
        console.log(add.call(s, 3, 4))      // 10
        console.log(add.apply(s,[3, 4]))    // 10
        // 例2：
        window.firstName = "Cynthia"; 
        window.lastName = "_xie";
        var myObject = {firstName:'my', lastName:'Object'};
        function getName(){
            console.log(this.firstName + this.lastName);
        }
        function getMessage(sex,age){
            console.log(this.firstName + this.lastName + " 性别: " + sex + " age: " + age );
        }
        getName.call(window); // Cynthia_xie
        getName.call(myObject); // myObject
        getName.apply(window); // Cynthia_xie
        getName.apply(myObject);// myObject
        getMessage.call(window,"女",21); // Cynthia_xie 性别: 女 age: 21
        getMessage.apply(window,["女",21]); // Cynthia_xie 性别: 女 age: 21
        getMessage.call(myObject,"未知",22); // myObject 性别: 未知 age: 22
        getMessage.apply(myObject,["未知",22]); // myObject 性别: 未知 age: 22
    </script>
```

### 手动实现call
```javascript
        Function.prototype.mycall = function(context){
            let obj = context || window
            obj.fn = this
            let args = []
            for(let i = 1; i < arguments.length; i++){
                args.push(arguments[i])
            }
            const result = obj.fn(...args)
            return result
        }
        function add(c, d) {
            return this.a + this.b + c + d;
        }
        const obj = { a: 1, b: 2 };
        console.log(add.myCall(obj, 3, 4)); // 10  
        console.log(add.myCall({ a: 3, b: 9 }, 3, 4)); // 19
        console.log(add.myCall({ a: 3, b: 9 }, { xx: 1 }, 4)); // 12[object Object]4
```

### 手动实现apply
```javascript
    Function.prototype.myApply = function (object, arr) {
        let obj = object || window
        obj.fn = this
        let result
        if (!arr) {
            return obj.fn()
        }
        if (!(arr instanceof Array)) {
            throw new Error('params must be array')
        }
        result = obj.fn(...arr)
        delete obj.fn
        return result
    }
    // test
    function add(c, d) {
        return this.a + this.b + c + d;
    }
    const obj = { a: 1, b: 2 };
    console.log(add.myApply(obj)); // NaN
    console.log(add.myApply(obj, [3, 4])); // 10 
    console.log(add.myApply(obj, [1, 'abc', '2'])); // 4abc
```