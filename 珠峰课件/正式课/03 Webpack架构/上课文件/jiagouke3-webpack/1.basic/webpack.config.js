const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FilemanagerPlugin = require('filemanager-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtarctPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack');
module.exports = {
  mode: 'development',
  //生成单独的 source-map,但是不在main.js建立关联
  devtool: false,//不生成sourcemap 关掉内部生成sourcemap的逻辑，我要自已精细化控制生成的过程
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'), // 会成为默认的静态文件根目录
    filename: 'main.js',
    //publicPath:'/'//加载 插入产出文件的时候的路径前缀
  },
  /* watch:true,//默认值是false,监听文件的变化，
  watchOptions:{
    ignored:/node_modules/,//忽略文件，不监听此目录里的文件变化 
    aggregateTimeout:300,//防抖  
    poll:1000//原理是轮询，是每隔一段时间监控文件的变化，文件变化之后重新打包。 每秒问1000次
  }, */
  //devServer内部就是一个express服务器
  devServer: {
    port: 8080, // 配置http服务预览的端口号，如果不设置，默认就是8080
    open: true, // 编译成功后会自动打浏览器进行预览
    compress: true, // 是否启动压缩
    static: path.resolve(__dirname, 'public'), // 额外的静态文件的根目录
    onBeforeSetupMiddleware(devServer){// express()
      devServer.app.get('/api/users', (req, res) => {
        res.json([{ id: 1 }, { id: 2 }]);
      });
    }
    /* proxy:{
      "/api":{
        target:"http://localhost:3000",
        pathRewrite:{"^/api":""}
      }
    } */
  },
  //配置外部模块 key模块名 value全局变量名
  externals:{
    'jquery':'jQuery',
    'lodash':'_'
  },
  resolve:{
    alias:{
      '@':path.resolve('src')
    }
  },
  module: {
    rules: [
      /* {
        test: /\.js$/,
        loader: 'eslint-loader', // 可以进行代码的检查
        enforce: 'pre', // loader的分类
        options: { fix: true }, // 如果发现有问题的可以自动修复
        exclude: /node_modules/,
      }, */
     //expose-loader可以把一个变量放在全局对象上
      /* {
        test:/lodash/,
        loader:'expose-loader',
        options:{
          exposes:{
            globalName:'_',//放的全局变量名
            override:true//如果原来这个变量有值的话是否要覆盖
          }
        }
      }, */
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              // 如果你使用的装饰器，就配插件，如果没使用就不用配了
              plugins: [
                ["@babel/plugin-proposal-decorators", { legacy: true }],
                ["@babel/plugin-proposal-private-property-in-object", { "loose": true }],
                ["@babel/plugin-proposal-private-methods", { "loose": true }],
                ["@babel/plugin-proposal-class-properties", { loose: true }],
              ],
            },
          }],
      },
      // use的意思是使用哪些loader进行转换，转换顺序从右向左的
      // 最右边的loader接收源文件，最左侧的loader返回一个JS脚本
      // 为什么不用一个loader干所有的事情，而是把几个小loader串联起来使用，loader有一个单一原则，每个loader只做单 一一件 事情
      {
        test: /\.css$/,
        use: [
          MiniCssExtarctPlugin.loader,
         {
           loader: "css-loader",
           options:{
             modules:false,
             url:true,
             import:true
           }
         }
        ],
      }, // 数组倒序执行
      // less-loader less转成css css-loader处理import url的 style-loader 把CSS变成JS脚本的
      { test: /\.less$/, use: [MiniCssExtarctPlugin.loader, "css-loader", 'postcss-loader', 'less-loader'] },
      { test: /\.scss$/, use: [MiniCssExtarctPlugin.loader, "css-loader", 'postcss-loader', "sass-loader"] },
      {
        test: /\.(jpg|png|gif|bmp|svg)$/,
        //type:'asset/resource'//替代以前的file-loader
        //type:'asset/inline'//替代以前的url-loader
        type:'asset',
        parser: {
            dataUrlCondition: {
              maxSize: 4 * 1024 // 4kb
            }
        }
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ['**/*'] }),
    /* new CopyWebpackPlugin({
      patterns:[
        {
          from:path.resolve(__dirname,'public'),
          to:path.resolve(__dirname,'dist/public')
        }
      ]
    }), */
    new MiniCssExtarctPlugin({
      filename:'main.css'
    })
    //自动向模块内注入一个第三方模块 import _ from 'lodash';
   /*  new webpack.ProvidePlugin({
      _:'lodash'
    }) */
    //由此插件来生成sourcemap
   /*  new webpack.SourceMapDevToolPlugin({
      //向输出文件里添加的映射文本
      //\n//# sourceMappingURL=http://127.0.0.1:8081/main.js.map
      append:`\n//# sourceMappingURL=http://127.0.0.1:8081/[url]`,
      filename:`[file].map` // main.js  sourcemap文件叫 main.js.map
    }), */
    //将要发要测试环境，
    //生成sourcemap文件。但是sourcemap只放在本机，并不布署到测试环境 
    /* new FilemanagerPlugin({
     events:{
       onEnd:{
         copy:[
           {
             source:'./dist//.map',
             destination:path.resolve(__dirname,'maps')
           }
         ],
         delete:['./dist/*.map']
       }
     }
    })
 */
    /*  new webpack.DefinePlugin({
             "process.env.NODE_ENV":"\"development\"",
             //"process.env.NODE_ENV":JSON.stringify(process.env.NODE_ENV)//'"development"'
         }) */
  ],
};
/**
 * 1. --mode process.env.NODE_ENV只是在模块内可用，在node环境不可用
 * 2. --env  node取不到 模块内也取不到，只能在配置文件的参数中取到
 * 在window linux mac都可以设置环境变量
 * cross-env NODE_ENV 真正的操作系统的环境变量了
 * node里可以取到，其它地方都以不到 配置文件参数 模块内都取不到
 *
 */
