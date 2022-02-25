const CompressionWebpackPlugin = require('compression-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production'
module.exports = {
    resolve: {
        alias: {
            '@': require('path').resolve(__dirname, 'src'),
        },
    },
    chainWebpack: function (config, { webpack }) {
        config.merge({
            optimization: {
                minimize: true,
                splitChunks: {
                    chunks: 'async',
                    minSize: 30000, //文件最小打包体积，单位byte，默认30000，若单个文件不满足会合并其他文件组成一个
                    minChunks: 2, //最小使用到次数，超过2次执行
                    automaticNameDelimiter: '.', //连接符
                    cacheGroups: {
                        vendors: {
                            // 基本框架
                            name: 'vendors',
                            test: /^.*node_modules[\\/](?!react|react-dom|antd).*$/,
                            chunks: 'all',
                            priority: 10,
                        },
                        echartsVenodr: {
                            // 异步加载echarts包
                            name: 'echartsVenodr',
                            test: /(echarts|zrender)/,
                            chunks: 'async',
                            priority: 10, // 高于async-commons优先级
                        },
                        'async-commons': {
                            // 其余异步加载包
                            chunks: 'async',
                            minChunks: 2,
                            name: 'async-commons',
                            priority: 9,
                        },
                        commons: {
                            // 其余同步加载包
                            chunks: 'all',
                            minChunks: 2,
                            name: 'commons',
                            priority: 8,
                        },
                    },
                },
            },
        });
        //过滤掉momnet的那些不使用的国际化文件
        config
            .plugin('replace')
            .use(require('webpack').ContextReplacementPlugin)
            .tap(() => {
                return [/moment[/\\]locale$/, /zh-cn/];
            });
        if (isProd) {
            // Gzip压缩
            config.plugin('compression-webpack-plugin').use(CompressionWebpackPlugin, [
                {
                    test: /\.(js|css|html)$/i, // 匹配
                    threshold: 10240, // 超过10k的文件压缩
                    deleteOriginalAssets: false, // 不删除源文件
                },
            ])
        }
    },
}