# vue2基础语法

## 1、数据绑定 
···
    <img v-bind:src="imageSrc">
···
    v-bind:value="msg" 简写为 :value="msg" 插值表达式写法 {{ msg }}
    动态绑定一个或多个属性在dom元素或者自定义组件上

## 2、条件渲染 
···
    <div v-show="true"></div>
    <div v-if="true"></div>
    <div v-else-if="true"></div>
    <div v-else></div>
···
    v-show="msg" 如果为true, 则展示dom元素，否则隐藏 
    v-if="msg" 如果为true，则创建dom渲染，否则销毁dom
    v-else和v-if组合使用，类似于if else形式，用来创建/销毁dom元素
    v-else-if和v-if组合使用，类似于else if形式，用来创建/销毁dom元素
    v-show和v-if的区别：v-if会创建/销毁dom元素，而v-show只会控制dom是否显示出来 通过display来控制

## 3、列表渲染
    <div v-for="(item, index) in items"></div>
    <div v-for="(val, name, index) in object"></div>
    遍历一个数组或者对象，可以获取两个参数 item => 数据源， index => 当前下标，val => 值， name => 键名
    v-for需要指定一个key，作用是提升渲染的效率，同时可以避免数据混乱的问题
    v-for和v-if最好不要同时使用，v-for的执行效率优先级高于v-if，如果v-if="false",则会非常消耗性能

## 4、事件处理器、
···
    <button v-on:click="func()"></button>
    <button @click="func()"></button>
    <my-comp @change="func"></my-comp>
···
    通过v-on给dom元素添加绑定事件监听器，语法糖是@符号
    用在原生html标签上时，绑定的是原生dom事件，用在自定义组件上时，绑定的是自定义事件
    使用时，可以添加修饰符用于一些事件的控制，具体如下：
        .stop - 调用 event.stopPropagation()。停止冒泡
        .prevent - 调用 event.preventDefault()。阻止默认行为
        .capture - 添加事件侦听器时使用 capture 模式。
        .self - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
        .{keyCode | keyAlias} - 只当事件是从特定键触发时才触发回调。
        .native - 监听组件根元素的原生事件。
        .once - 只触发一次回调。
        .left - (2.2.0) 只当点击鼠标左键时触发。
        .right - (2.2.0) 只当点击鼠标右键时触发。
        .middle - (2.2.0) 只当点击鼠标中键时触发。
        .passive - (2.3.0) 以 { passive: true } 模式添加侦听器 

## 5、表单控件绑定
···
    <input v-modal="val" type="text" />
···
    双向绑定一个数据源给dom元素

## 6、插槽
···
    <base-layout>
        <template v-slot:header>
            Header content
        </template>
        <span>Default slot content</span>
        <template v-slot:footer>
            Footer content
        </template>
    </base-layout>
    ================================
    <div>
        <slot></slot>
        <slot name="header"></slot>
        <slot name="footer"></slot>
    </div>
···
    用于自定义组件上，传入组件或dom元素用于父组件上渲染
    v-slot可以指定名称，将传入的dom元素或者自定义组件替换到插槽中

## 7、ref
···
    <p ref="p">hello</p>
···
    ref绑定在dom元素或者自定义组件上，通过this.$refs['p']获取到指定的dom或者自定义组件

## 8、动态组件
···
    <component v-bind:is="currentView"></component>
···
    通过is来绑定对应的组件来渲染，常用在tab栏切换中
    也可以使用其他API实现这个功能，如v-if v-else等

## 9、过渡动画
···
    <transition name="fade" mode="out-in" appear>
        <component :is="view"></component>
    </transition>
···
    用于元素切换时的动画效果，通过name指定对应的class类名，会将其自动拓展为 .fade-enter，.fade-enter-active等

## 10、keep-alive
···
    <keep-alive include="a,b">
        <component :is="view"></component>
    </keep-alive>
···
    keep-alive会缓存不活动的组件，而不是将其销毁
    当组件在keep-alive内被切换时，会触发activated、deactivated这两个生命周期函数，
    被包裹在keep-alive内的组件，只会触发一次created、mounted 这些生命周期函数
    通过include来指定对应的组件进行缓存

## 11、属性监听 watch
···
watch:{
    'val':function(newVal, oldVal){
        <!-- TODO -->
    },
    msg:{
        handler:function(newVal, oldVal){
            TODO
        },
        deep: true,
        immediate: true
    }
}
···
    观察vue实例上的一个表达式或者一个函数计算结果的变化，返回更新后的值和更新前的值

## 12、计算属性 computed
···
computed:{
    newVal:function(){
        return this.a + this.b
    }
}
···
    当计算属性的依赖发生响应式变化时才会触发，计算的结果会被缓存起来
    和watch的区别在于：
        1、computed不支持异步操作，watch支持
        2、computed支持缓存，只有依赖数据发生变化时才会重新计算。watch不支持缓存，会直接出发相应的操作

## 13、传入属性 props
···
    Vue.component('my-comp', {
        props: ['val', 'myMessage']
    })
    <my-comp :val="val" :myMessage="[1,2,3]"></my-comp>
···
    通过自定义组件内通过props来接受父组件传递至的数据

## 14、data
···
    data: function () {
        return { a: 1 }
    }
···
    data必须是一个具有返回数值对象的函数，因为组件可能被用来创建多个实例。
    具体原因： object是引用数据类型，如果不是通过function来返回，
    则每个组件内部的data都指向同一个地址，一个变了其他也会变

## 15、nextTick
···
    this.$nextTick(() => {
        <!-- TODO -->
    })
···
    等待dom元素刷新后出发内部的回调方法

## 16、set
···
    this.$set(obj,'msg','abc')
···
    向响应式的对象添加一个property，用于保证改对象更新后是处于响应式的状态
    常见的不能触发相应的操作 比如 this.a[1] = 1  this.obj.a = 'a' 等


## 17、生命周期
    1、beforeCreate 数据初始化前，无法获取到data内的数据
    2、created 示例创建完成，可以获取到data内的数据，但是dom元素还未渲染
    3、beforeMount 在挂载dom元素前被调用，相关的render函数首次被调用
    4、mounted dom元素挂载完成，可以获取到页面上的dom元素
    5、beforeUpdate 数据更新前被调用，可以访问到现有的dom之类的
    6、updated 数据更新导致的dom元素发生变化，可以获取到更新后的dom元素
    7、 beforeDestory 实例销毁前调用，此时还可以获取到data内的数据，可以执行一些定时器销毁等方法
    8、destoryed 实例销毁后调用，此时对该组件绑定的所有指令都被解绑了
    9、activated keep-alive内的组件被激活时调用
    10、deactived keep-alive内的组件被停用是调用