const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
module.exports = {
    mode: 'development',
    devtool: false,
    output:{
        //产出资源的在HTML里面引入的时候的引入路径
        publicPath:'http://localhost:8081/'
    },
    devServer:{
        port:8081//配置本地启动的开发服务器的端口号
    },
    module:{
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                "@babel/preset-react"
                            ]
                        },

                    }
                ],
                exclude:/node_modules/
            }
        ]
    },
    devServer:{},
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        }),
        new ModuleFederationPlugin({
            filename:'remoteEntry.js',//放着给别的host调用的remote组件
            name:'host',//必传值，即输出的模块名
            remotes:{//远程引用的应用名及其别名的映射，使用时以key值作为name
                remote:"remote@http://localhost:8080/remoteEntry.js"
            },
            shared:{
                'react':{singleton:true},
                'react-dom':{singleton:true}
            }
        }),
       
    ]
}