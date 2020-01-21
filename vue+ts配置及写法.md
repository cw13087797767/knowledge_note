# vue+ts的配置及写法

今天一天都在踩vue+ts的坑，虽然之前开发过vue+ts的项目，但是今天自己重新搭了个框架出来弄一个项目练手的时候，还是遇到了不少的问题。下面我会把我踩的坑一一罗列下来，给自己日后复习用。

## ts静态编译检查警告
    这个东西就相当于的头疼了，快速码代码的时候，格式多多少少都不会太工整，不是多一个空格就是少一个分号之类的。
    当我写完了一小块功能的时候，一看控制台，我滴妈呀，全都是警告！！！代码能跑，但是一直有警告就真的很烦人，有强迫症的我就一直百度来解决如何能让他不报这些警告。找了好久，网上好多方法都试了，还是不得行呀！
    最终翻了tslint的配置，才搞定的他。

###    "defaultSeverity":"warning" 这个改成 "defaultSeverity":"none"
###    "defaultSeverity":"warning" 这个改成 "defaultSeverity":"none"
###    "defaultSeverity":"warning" 这个改成 "defaultSeverity":"none"

    重要的事情说三遍，设置了这个之后，就不会弹出一大堆的警告内容了，妈妈终于不用担心我的强迫症啦~~~

## vue文件怎么写
    在开发vue文件时，写法和不用ts简直就是天差地别啊，从最开始的export default开始，到data的写法，完全就是不一样的存在。废话不多说，直接上代码

···
    <script lang="ts">
    import {Vue, Component} from 'vue-property-decorator'
    import FooterComponent from '@/components/commom/footer/index.vue';
    import { State,Mutation,Action } from 'vuex-class';
    @Component({
        components:{
            FooterComponent
        }
    })
    export default class HomeComponent extends Vue {
        @State('headerModule') headerModule:any
        @Mutation('set_headerText') set_headerText:any;
        created() {
            this.set_headerText('主页');
        }
    }
    </script>
···
    1、在script标签中需要加上语言标记 lang="ts"
    2、需要引入 vue-property-decorator 这一个东西
    3、不是简单的 export default {} 就完事的了，需要换成类的写法类写
    4、 @Component 这这个一定要加！有引进组件的时候就写在里面
    5、使用 vuex需要引入 vuex-class 获取方法要用@Mutation这种方式来写


