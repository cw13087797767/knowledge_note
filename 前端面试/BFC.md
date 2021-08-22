4、call 和 apply
5、有没有写过一些webpack插件，或者用webpack做了哪些功能
6、this指针问题
7、vue中computed 和 watch的差异

## BFC

### 参考地址：https://blog.csdn.net/sinat_36422236/article/details/88763187

### 定义：
    BFC(block formatting context) 块级格式上下文，是一个独立渲染的的区域，只有block-level box参与，它规定了内部的block-level box如何布局，并且与这个区域外部毫不相干。
    BFC是一个独立的布局环境，其中的元素布局是不受外界的影响，并且在一个BFC中，块盒与行盒（行盒由一行中所有的内联元素所组成）都会垂直的沿着其父元素的边框排列。
### Box：css布局的基本单位：
    1、block-level box：display属性为block、list-item、table元素，会生成block-level box，并且参与block formatting context
    2、inline-level box：display属性为inline、inline-block、inline-table的元素，会生成inline-level box，并且参与inline formatting context
    3、run-in box：css3中才有

### formatting context定义：
    Formatting context 是 W3C CSS2.1 规范中的一个概念。它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。最常见的 Formatting context 有 Block fomatting context (简称BFC)和 Inline formatting context (简称IFC)。

### BFC的布局规则：
    1、内部的Box会在垂直方向，一个接一个地放置。
    2、Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠。
    3、每个盒子（块盒与行盒）的margin box的左边，与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
    4、BFC的区域不会与float box重叠。
    5、BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
    6、计算BFC的高度时，浮动元素也参与计算。

### 如何创建BFC：
    1、float的值不是none。
    2、position的值不是static或者relative。
    3、display的值是inline-block、table-cell、flex、table-caption或者inline-flex。
    4、overflow的值不是visible。

### BFC的作用：
    1、利用BFC避免margin重叠。（例如第一第二个容器发生margin合并，给第二个容器包上一层div并且添加overflow:hidden属性）
    2、自适应两栏布局。（假设左侧栏使用的float:left，右侧的要自适应宽度，则可以给右侧容器添加overflow:hidden属性）
    3、清除浮动（假设父元素不是BFC,没有设定高度，子元素用了float，则会发生高度塌陷。此时可以给父元素添加overflow:hidden属性，因为计算BFC高度时，会把浮动元素也添加进去计算）

### 总结：
    BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
