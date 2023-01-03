const express=require('express');
const app=express();

/* app.use((req,res,next)=>{
    // (告诉浏览器该请求可以不可以跨域)
    // 允许跨域的网址
    res.set('Access-Control-Allow-Origin', '*'); // 允许所有地址
    // 允许跨域的请求方式
    res.set('Access-Control-Allow-Method', 'GET, POST, PUT, DELETE');
    // 允许跨域的请求头
    res.set('Access-Control-Allow-Headers', 'Content-Type, token');
    // 预检请求缓存时间
    res.set('Access-Control-Max-Age', '86400');

    if (req.method.toUpperCase() === 'OPTIONS') {
        // 预检请求
        // 快速返回响应
        res.end();
        return;
    }

    next();   
})

app.post('/cors',(req,res)=>{
    // res.set('Access-Control-Allow-Origin','*');
    const data={
        name:'jack',
        age:18
    }
    res.json(data);
}) */


app.post('/cors',(req,res)=>{
    res.set('Access-Control-Allow-Origin','*');
    const dataBase={
        name:'jack',
        age:18
    }

    res.json(dataBase);
})




app.listen(3000,(err)=>{
    if(!err)console.log('服务器启动成功，http://localhost:3000');
    else console.log(err);
})