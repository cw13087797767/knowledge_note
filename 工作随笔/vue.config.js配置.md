# 配置多页面

访问路径：http://localhost:8080/examination-management.html/#/

路由设置为hash模式

module.exports = {
    pages: {
        index: {
            entry: 'src/main.js',
            template: 'public/index.html',
            filename: 'examination-management.html',
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        }
    },
}