const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
module.exports = {
    mode: 'development',
    devtool: false,
    output:{
        //产出资源的在HTML里面引入的时候的引入路径
        publicPath:'http://localhost:8080/'
    },
    devServer:{
        port:8080//配置本地启动的开发服务器的端口号
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
            name:'remote',//必传值，即输出的模块名
            exposes:{//被远程引用时可暴露的资源路径及其别名
                './RemoteList':'./src/RemoteList'
            },
            shared:{
                'react':{singleton:true},
                'react-dom':{singleton:true}
            }
        })
    ]
}