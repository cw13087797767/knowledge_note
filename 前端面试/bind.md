# bind

## 一、arguments的含义

```javascript
  // arguments 是一个对应于传递给函数的参数的类数组对象
  function a(){
    console.log(arguments);
  }
  a(); // Arguments [callee: ƒ, Symbol(Symbol.iterator): ƒ]
  a(1,2,3); // Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
```

## 二、Function.prototype.bind()
bind()方法主要就是将函数绑定到某个对象，bind()会创建一个函数，函数体内的this对象的值会被绑定到传入bind()中的第一个参数的值，例如：f.bind(obj)，实际上可以理解为obj.f()，这时f函数体内的this自然指向的是obj；

```javascript
  // 使用bind方法一
  var a = {
    b: function() {
      var func = function() {
        console.log(this.c);
      }.bind(this);
      func();
    },
    c: 'hello'
  }
  a.b(); // hello
  console.log(a.c); // hello

// 使用bind方法二
  var a = {
    b: function() {
      var func = function() {
        console.log(this.c);
      }
      func.bind(this)();
    },
    c: 'hello'
  }
  a.b(); // hello
  console.log(a.c); // hello
```

## 三、原生js实现bind方法

```javascript
  // 方法一，只可绑定，不可传参
  Function.prototype.my_bind = function(context){
    var self = this;
    return function(){
      self.apply(context,arguments);
    }
  }
  function a(){
    console.log(this.name);
  }
  a();  // ''
  var b = {
    name: 'apple'
  };
  a.bind(b)(); // apple
  a.my_bind(b)(); // apple

  // 方法二
  Function.prototype.my_bind2 = function() {
    var self = this, // 保存原函数
      context = Array.prototype.shift.call(arguments), // 保存需要绑定的this上下文
      // 上一行等价于 context = [].shift.call(arguments);
      args = Array.prototype.slice.call(arguments); // 剩余的参数转为数组
    return function() { // 返回一个新函数
      self.apply(context, Array.prototype.concat.call(args, Array.prototype.slice.call(arguments)));
    }
  }

  function a(m, n, o) {
    console.log(this.name + ' ' + m + ' ' + n + ' ' + o);
  }

  var b = {
    name: 'kong'
  };

  a.my_bind2(b, 7, 8)(9); // kong 7 8 9
```