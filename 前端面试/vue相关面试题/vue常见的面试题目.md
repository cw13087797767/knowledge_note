# 参考文档地址
https://blog.csdn.net/weixin_48200589/article/details/126534765
https://blog.csdn.net/weixin_55042716/article/details/115140931

## vue组件之间的通信方式
1、props和emit 传值方式
2、vuex 公共组建
3、provide和inject 跨层级传值
4、$children和$parent 通过this直接获取
5、ref 通过给子组件打标签获取到对应的子组件实例
6、$attrs 父组件中传递的值，但是子组件没有用props接受
7、eventbus 全局通信事件


## v-if和v-for那个优先级更高
v-for的优先级更高，在vue2中输出渲染函数中，会优先处理v-for的编译，然后才到v-if的编译。
最好不要把v-if和v-for同时使用


## 双向绑定的使用和原理
使用：常见的使用方式是：v-modal绑定给input输入框，在代码编译过后，实际还是转化为：value和@input这种形式
原理：


## vue中如何扩展一个组件
使用slot、mixins、extends
slot是html模板中预留对应的插槽位置，使用name去指定对应的预留插槽位置
mixins是拓展逻辑部分，通过mixins的方式拓展定义的属性、方法、监听事件等。使用的时候要注意定义的变量和方法名不要重复
extends一般使用的较少，用于继承某个组件的内容，和mixins相似


## 子组件可以直接改变父组件的数据么，说明原因
父组件一般以props的形式传递参数给子组件，在子组件中直接修改props的值会在控制台直接发出警告，虽然不能直接修改一个传入对象或者数组类型的prop，但还是可以直接改内嵌的对象或属性。
建议通过emit提交事件的方式来修改父组件传递下来的值，或者直接用this.$parent找到对应的值进行修改（不太建议）。


## Vue要做权限管理该怎么做？控制到按钮级别的权限怎么做？
权限管理分为页面权限和按钮权限

页面权限的实现方式如下：
1、进入页面前，先获取权限编码集合。
2、根据权限编码集合计算出用户可访问的路由地址。
3、可以用router.addRoutes(accessRoute)动态添加路由，也可以在对应路由组件的生命周期created中，判断是否存在对应的编码，不存在则直接跳转到对应的页面。

按钮级别权限控制实现方式如下：
1、定义自定义指令dirative，全局绑定，如v-permission。
2、在对应按钮添加v-permission="权限编码"
3、在自定义指令中，初始化时查询是否存在该编码，不存在则直接删除对应按钮，也可以定义一个全局mixins方法，通过v-if="handlePermission(权限编码)"的形式去处理。


## 说一说你对vue响应式理解？
vue的响应式就是数据变化后自动做出响应，vue的框架是mvvm，数据层、视图层、视图模型层。在初始化时通过对对象用Object.defineProperty进行get、set劫持，以达到监听的目的。这样做的好处是，开发人员只用关心数据层面的处理，不需要手动去修改dom的值，以提高开发的效率，降低开发难度。


## 说说你对虚拟 DOM 的理解？
虚拟dom其实就是vue在内存中创建了一个类似于dom数的结构，真实的dom树是根据这个虚拟dom进行渲染的。虚拟dom的好处是减少我们直接对dom树的操作，并且还可以跨平台。
虚拟dom的生成是通过编写的vue模板文件经过编译后，生成一个render函数，render函数返回的就是一个虚拟dom。


## 你了解diff算法吗？
### diff的作用是什么？
diff算法是用来比对新旧两个虚拟dom之间的差异的。

### diff的必要性？
vue的每个组件中只有一个watcher进行监听，此时需要引入diff算法进行精确查找发生变化的地方，从而进行高效的维护。

### diff的触发时机？
diff的触发时机是组件内的数据变更触发响应式时触发的。

### diff算法的实现方式？
diff算法是拿新旧两个虚拟dom进行比对。比对是只会在同层级中进行。整体的策略是深度优先，同层比较。
在同层对比的时候，如果相同的，才会对比他们下面的子节点，并进行核心的diff算法。
参考文章地址：https://blog.csdn.net/weixin_46831501/article/details/126031613


## 父子组件生命周期函数执行顺序
### 加载渲染过程：
父 beforeCreate、created、beforMount
子 beforeCreate、created、beforMount
父 mounted
子 mounted

### 子组件更新过程
父 beforUpdate
子 beforeupdate
子 updated
父 updated

### 销毁过程
父 beforeDistory
子 baforeDistory
子 distoryed
父 distoryed


## computed和watch的差异
### computed
computed是计算属性，只有依赖的数据发生变化时才会重新计算，计算出来的结果具有缓存。直接调用computed的值是缓存的值。computed不支持异步操作。

### watch
watch不支持缓存，每次监听的对象发生变更时都会触发，它支持异步操作。


## vue中的data为什么必须是函数
data值不能为对象类型，因为对象是引用类型。当有多个vue组件初始化时，修改data的值就会影响其他的组件数据。data如果是一个函数，则每个函数都有其自己的作用域，修改时不会影响到其他的组件数据。


## vue中的key有什么做用？
渲染时打上唯一标示，用于给diff算法进行遍历判断。


## vue-router的路由模式有几种？
### hash路由
在地址栏会有#标识。当hash发生变化时会被浏览器会自动记录下来。

### history路由
利用html5的History中的pushState、replaceState方法，实现了对历史记录进行修改的功能

### abstract路由
abstract路由是针对没有浏览器环境的情况，比如weex客户端开发，内部是没有浏览器api的。
如果当前环境不支持浏览器API，则会强制切换到abstract模式。


## 为什么说VUE是一个渐进式的javascript框架, 渐进式是什么意思?
渐进式框架的意思是我们使用vue框架时，不强求我们一次性使用完vue中所有的功能特性。我们只用其中的一部分，而不是所有。举个简单的例子，一些简单的应用并不需要引入vuex、vue-router等。但随着项目的逐渐变大，那么将会逐步的引入进来。