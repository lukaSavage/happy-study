const path = require('path');
const webpack = require('webpack');
//const bootstrap = path.resolve(__dirname,'node_modules/bootstrap/dist/css/bootstrap.css')
//const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
//让你知道每个阶段花了多少时间，然后可以有针对性的优化
//const smw = new SpeedMeasureWebpackPlugin();
//const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssWebpackPlugin = require('purgecss-webpack-plugin');
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');
//const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
//以前UglifyJS 不支持ES6 ，terser支持ES6
const TerserPlugin = require('terser-webpack-plugin');
const glob = require('glob');//按照文件匹配模式匹配文件列表的
const PATHS = {
    src:path.join(__dirname,'src')
}
//为什么生产环境和开发环境表示不一致，因为不同的mode下启用的插件不一样
module.exports = {
    mode:'development',
    devtool:false,
    entry:'./src/index.js',
   /*  entry:{
       page1:'./src/page1.js',
       page2:'./src/page2.js',
       page3:'./src/page3.js'
    }, */
    cache:{//不能使用cnpm了。不然会卡死
        type:'filesystem',
        cacheDirectory:path.resolve(__dirname,'node_modules/.cache/webpack')
    },
    optimization:{
       /*  minimize: true,//启动压缩
        minimizer: [//使用哪个插件压缩
          new TerserPlugin(),
        ], */
        splitChunks:{
            //import() import _ from 'lodash'
            //表示要分割哪些代码块 值可以是async(import('module')动态导入) initial all=async+inital
            chunks:'all',
            //表示分割出去的代码块的最小体积。默认是值是 20000 0表示不限制
            minSize:0,
            //表示一个模块至少被几个入口引用才会分割出代码块
            minChunks:2,
            //分割出去的代码块名称的连接符 默认值是 cacheGroup~代码块名称
            automaticNameDelimiter:'~',
            maxInitialRequests:50,//入口文件最多能拆成几个代码块
            maxAsyncRequests:30,
            //name:true,// false | string | function
            cacheGroups:{
                vendor:{
                    //属于此缓存组件的条件
                    test: /[\\/]node_modules[\\/]/,
                    //如果说一个模块同时可以归入多个缓存组，那么优无归于优先级比较高的
                    priority:-10,
                    name:'zhufengvendor',
                    /* name(module, chunks, cacheGroupKey) {
                        console.log('module',module);
                        let resoruce = module.resource;
                        //vendor-node_modules_jquery_dist_jquery_js.js
                        //moduleId ./node_modules/jquery/dist/jquery.js
                        return cacheGroupKey+'-'+module.id.replace(/[\/\.]/g,'_');
                    } */
                },
                common:{
                    minChunks:2,//最小被不同的入口引用2次
                    priority:-20,
                    name:'zhufengcommon',
                   /*  name(module, chunks, cacheGroupKey) {
                        let resoruce = module.resource;
                        //common-src_module1_js.js
                        return cacheGroupKey+'-'+chunks.map(chunk=>chunk.name).join('~')
                    } */
                }
            },
            /* cacheGroups:{
                chunk1:{
                    test(module){
                        let resource = module.resrouce;
                        return resource.endsWith('A.js')||resource.endsWith('B.js')||resource.endsWith('C.js')
                    }
                },
                chunk2:{
                    test(module){
                        let resource = module.resrouce;
                        return resource.endsWith('B.js')||resource.endsWith('C.js')
                    },
                    reuseExistingChunk:false
                }
            } */
        },
        //什么是运行时?什么是入口点?
       /*  runtimeChunk: {
            name: (entrypoint) => `runtime~${entrypoint.name}`,
        } */
    },
    output:{
        path:path.resolve('dist'),
        filename:'[name].js',
        //library:'calculator',//库的名字
        //libraryExport:'add',//指定导出的是哪个子模块
        //libraryTarget:'umd'//导出的方式 var 全局变量
    },
    /* resolve:{
        extensions:['.js','.jsx','.json'],
        alias:{//1 加快模块的查找速度 2. 你想加载的内容不是默认内容的
            bootstrap
        },
        modules:['node_modules'],
        //web
        mainFields:["entry","browser","module","main"],
        mainFiles:['main','index']
    },
    resolveLoader:{
        extensions:['.js','.jsx','.json'],
        alias:{//1 加快模块的查找速度 2. 你想加载的内容不是默认内容的
            bootstrap
        },
        modules:['node_modules'],
        //web
        mainFields:["entry","browser","module","main"],
        mainFiles:['main','index']
    }, */
    module:{
        //noParse:/jquery|lodash/  //这个表示哪些模块不需进行解析
        rules:[
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:[
                    {
                        loader:'thread-loader',
                        options:{
                            workers:3 //如果采用多进程 处理的话，几个进程？内核数-1
                        }
                    },
                    {
                        loader:'babel-loader',
                        options:{
                            cacheDirectory:true,//
                            presets:[//告诉babel-loader 不要编译 ES6 的模块化语法import export
                                ["@babel/preset-env",{modules:false}],
                                "@babel/preset-react"
                            ]
                        }
                    }
                ]
            },
            {
                test:/\.css$/,
                include:path.resolve(__dirname,'src'),
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }
        ]
    },
    plugins:[
        new htmlWebpackPlugin({
            template:'./src/index.html'
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        /* new htmlWebpackPlugin({
            template:'./src/index.html',
            filename:'page1.html',
            chunks:['page1'] //把page1这个入口的代码块和拆出去的代码插入page1.html里
        }),
        new htmlWebpackPlugin({
            template:'./src/index.html',
            filename:'page2.html',
            chunks:['page2']
        }),
        new htmlWebpackPlugin({
            template:'./src/index.html',
            filename:'page3.html',
            chunks:['page3']
        }), */
        new MiniCssExtractPlugin({
            filename:'[name].css'
        }),
        new PurgecssWebpackPlugin({
            paths:glob.sync(`${PATHS.src}**/*`,{nodir:true})
        }),
        new PreloadWebpackPlugin()
       /*  new webpack.IgnorePlugin({
            contextRegExp:/moment/,
            resourceRegExp:/^\.\/locale/
        }),
        new BundleAnalyzerPlugin() */
    ]
}