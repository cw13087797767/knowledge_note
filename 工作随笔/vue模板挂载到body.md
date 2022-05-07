# vue模板挂载到body

## 起因
今天开发业务的时候发现，弹窗时fixed布局，然后弹窗里面有一个查看详情的功能，打开后也是fixed布局。然后问题就来了，fixed布局时，是往父组件去寻找根节点，找到上一个fixed节点或者直到body节点。然后就产生了错位。

## 解决方案
需要把这个查看详情的功能挂载到body上，这样就可以让fixed布局去直接找body节点，从而避免问题的发生。
查看网上资源后，找到一个很nice的解决方案。

```javascript
mounted () {
    const body = document.querySelector('body')
    body.append ? body.append(this.$el) : body.appendChild(this.$el)
}
```
上面代码的作用是把当前渲染好的组件渲染到body上，非常nice的解决方案！！！