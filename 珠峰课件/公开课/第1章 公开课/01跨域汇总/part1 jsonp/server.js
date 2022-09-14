const express = require('express');
const app = express();

app.get('/test', (req,res)=>{
    console.log(req.query);
    const { callback } = req.query;
    const obj = {
        code: 0,
        msg: 'jsonp ok!'
    }
    res.send(`${callback}(${JSON.stringify(obj)})`);
})


app.listen(3000,(err)=>{
    if(!err) {
        console.log('服务器启动成功~请访问：localhost: 3000');
    }
});