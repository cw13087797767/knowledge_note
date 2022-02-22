# vue组件间通信的6种方式

## 参考地址：https://segmentfault.com/a/1190000019208626

## 1、props/$emit
父组件传入props，子组件$emit


## 2、$emit/$on
注册全局EventBus, $on 监听了自定义事件 data-a和data-b，因为有时不确定何时会触发事件，一般会在 mounted 或 created 钩子中来监听。
```javascript
    var Event=new Vue();
    Event.$emit(事件名,数据);
    Event.$on(事件名,data => {});
```

## 3、vuex

## 4、$attrs/$listeners
$attrs：包含了父作用域中不被 prop 所识别 (且获取) 的特性绑定 (class 和 style 除外)。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定 (class 和 style 除外)，并且可以通过 v-bind="$attrs" 传入内部组件。通常配合 interitAttrs 选项一起使用。
$listeners：包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。它可以通过 v-on="$listeners" 传入内部组件

简单来说：$attrs与$listeners 是两个对象，$attrs 里存放的是父组件中绑定的非 Props 属性，$listeners里存放的是父组件中绑定的非原生事件。

## 5、provide/inject
这个可以解决多个子组件props的问题，父组件挂载provide，在这个父组件下的所有子组件都可以通过inject来获取挂载的数据。子孙层的provide会覆盖祖父层provide中相同的key。并且provide注入的数据不是响应式的。常用于为高阶插件/组件库提供用例。
参考地址：https://segmentfault.com/a/1190000021216039

## 6、$parent / $children与 ref
