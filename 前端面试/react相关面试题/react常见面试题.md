# 参考地址
https://blog.csdn.net/qq_60976312/article/details/125783396


## 什么是虚拟dom？
虚拟dom其实就是在内存中构建的一个和dom树结构一一对应的对象。优势在于可以跨平台，其次是减少了开发人员直接对dom修改的次数，提高了开发的效率。


## 类组件和函数组件之间的区别是什么？
###　类组件
类组件是用class定义的一个组件，需要被实例化后才能使用。类组件带有this指针和生命周期函数。

### 函数组件
函数组件是用function定义的一个函数，只能接受props渲染到页面当做，没有生命周期和this指针。

### 两者的差异
函数组件的性能要优于类组件，因为不需要被实例化就可以直接使用，函数组件直接取执行的返回结果即可。


## react中的refs是什么？
refs是react提供的一种访问render方法中创建dom元素或者react元素的方法。通过ref可以直接调用dom元素或者react元素的方法。


## 如何创建refs？
通过react.createRef()创建，并通过ref添加到react元素上。
## state和props的区别是什么？
### state
state是组件内部定义的数据，组建内部可以进行修改。

### props
由外部组件传入的数据，不可直接修改。

### 相同点
都是js对象，都可以拿来做渲染处理。

### 不同点
state是组件内部定义的数据，props是外部传入的，不可直接修改。


## 什么是高阶组件（HOC）？
高阶组件是接受一个组件并返回一个新组件的函数。高阶组件是react的组合特性下衍生出来的，他可以接受任何动态提供的子组件，但不会修改或复制输入组件的的任何行为。
它的作用是给传入的子组件附加额外的功能，如props的处理、state的抽象和操作、渲染劫持等。类似于vue中的mixins操作。


### 什么是jsx？
jsx就是将原本的html嵌入到js代码中。jsx不能被浏览器直接读取，只能通过babel和webpack等工具转换成js使用。


## 为什么不直接更新state？
如果直接对state进行赋值操作，就不会重新渲染组件。
state的更新需要用到setState方法，setState方法是将state需要更新的值推入到一个队列中，不会立刻更新，因为队列更新是一个异步的操作。当队列批量更新后，可以通过回调函数的方式进行获取修改后的值。


## react生命周期函数有哪些？
1、componentVillMount 在渲染之前
2、componentDidMount 在第一次渲染之后执行，可以在这里做dom的操作等。
3、componentWillReceiveProps 在初始化render的时候执行。
4、shouldComponentUpdate 确定是否更新组件。
5、componentWillUpdate 在shouldComponentUpdate执行返回true，确定要更新组件之前执行。
6、componentDidUpdate 主要用于更新dom以响应props或state更改。
7、componentWillUnmount 组件在销毁前执行，用来取消网络请求或者关闭定时器、监听器等。


## 使用后react Hooks的好处是什么？
Hooks是16.8中新加的内容。它的作用是允许不编写类组件的情况下，函数式组件也能使用state和react的其他特性。