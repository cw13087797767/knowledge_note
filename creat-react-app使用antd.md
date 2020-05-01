## creat-react-app使用antd的一些常见问题和优化

### 首先我们全局安装 creat-react-app
```
    npm i create-react-app -g
```
### 安装完成后检查一下是否安装成功

```
    create-react-app --version
```

### 安装完成之后，创建一个react项目
比如说创建一个react-demo

```
    create-react-app react-demo
```

我项目中react的版本是 16.13.1

### 搭建好项目之后，安装antd
```
    npm i antd
```

我项目中的antd版本是 4.2.0

## 我们安装完成之后，运行项目，创建一个简单的react组件，引入一下antd组件，看看是否能正常运行
创建一个简单的示例，引入 Button 组件

```
import React from 'react'

import {Button } from 'antd'

export default class Home extends React.Component{
    render(){
        return(
            <>
                <Button type="primary">Primary</Button>
            </>
        )
    }
}

```

当我们页面运行起来之后，发现会报错,报错提示 Cannot find module './locale',使用moment时出现这个问题 原因是webpack.config.dev.js 中

```
    plugins: [
    .....省略
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
]

```

将上面的改为

```
    new webpack.ContextReplacementPlugin(
    // 需要被处理的文件目录位置
    /moment[\/\\]locale/,
    // 正则匹配需要被包括进来的文件
    /(en|zh-cn)\.js/
    ),
```

但我们发现 create-react-app 搭建出来的项目没有吧webpack配置暴露出来，需要我们去手动暴露

### 暴露 create-react-app 搭建项目的 webpack 配置

运行 npm run eject

把config文件夹暴露出来，在webpack.config.js 中修改即可

### 运行 npm run eject 报错时，我们将 代码修改的内容全部提交上去之后再次执行即可






## 关于打包优化，可以移步到官网查看如何配置

```
    https://ant.design/docs/react/use-with-create-react-app-cn
```