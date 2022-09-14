let express = require('express');
let webpack = require('webpack');
let webpackDevMiddleware = require('webpack-dev-middleware');
let webpackConfigs = require('./webpack.config');
let app = express();
//compiler代表webpack编译对象
let compiler = webpack(webpackConfigs);
app.use(webpackDevMiddleware(compiler,{}));
app.get('/api/users', (req, res) => {
    res.json([{ id: 1 }, { id: 2 }]);
});
app.listen(3000);


//其实本质上来说 webpack-dev-server 就是等于 express服务+webpackDevMiddleware