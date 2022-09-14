const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
module.exports = {
    mode:'development',
    devtool:false,
    entry:{
        //入口一般正常来说应该是个对象 key入口的名称，值是一个入口的模块路径
        //webpack从入口模块出发，分析出口模块的依赖，找到所有的模块，最后会把这些模块放到一个代码块里，代码块的名称就叫main
        main:'./src/index.js',
        //vendors:['react','react-dom']
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'main.js',
        //library:'calculator',
        //libraryTarget:'var'
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        })
    ]
}