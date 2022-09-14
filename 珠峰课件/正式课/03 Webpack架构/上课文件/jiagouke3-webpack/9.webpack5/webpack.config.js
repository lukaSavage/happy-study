const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'production',
    devtool: false,
    optimization:{
        usedExports:true,
        moduleIds:'named',
        chunkIds:'named'
    },
    resolve:{
        fallback:{
            'crypto':require.resolve('crypto-browserify'),
            "stream": require.resolve("stream-browserify"),
            'buffer':require.resolve("buffer")
        }
       /*  fallback:{
            'crypto':false
        } */
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
            },
            {
                test:/\.png$/,
                type:'asset/resource' //向输出目录拷贝文件 file-loader
            },
            {
                test:/\.ico$/,
                type:'asset/inline' //内联 url-loader
            },
            {
                test:/\.txt$/,
                type:'asset/source' //原样输出 raw-loader
            },
            {
                test:/\.jpg$/,
                type:'asset',
                parser:{
                    dataUrlCondition:{
                        maxSize:8*1024
                    }
                }
            },
            {
                test:/\.css$/,
                use:[
                    "style-loader",
                    "css-loader"
                ]
            },
        ]
    },
    devServer:{},
    plugins:[
        new HtmlWebpackPlugin({
            template:'./public/index.html'
        })
    ]
}