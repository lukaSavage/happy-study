const express=require('express');
const app=express();

/* app.get('/jsonp',(req,res)=>{
    //  getData           {callback:'getData'}
    const {callback}=req.query;
    const dataBase={
        name:'jack',
        age:18
    }
    //返回字符串 getData({name:'jack,age:18})
    res.send(`${callback}(${JSON.stringify(dataBase)})`);
}) */





app.listen(3000,(err)=>{
    if(!err)console.log('服务器启动成功，http://localhost:3000');
    else console.log(err);
})