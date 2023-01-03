const express=require('express');
const app=express();

app.use(express.static('public'));
app.get('/ajax',(req,res)=>{
    res.send(JSON.stringify({
        name:'jack',
        age:18
    }));
})




app.listen(3000,(err)=>{
    if(!err)console.log('服务器启动成功,请访问http://localhost:3000');
    else console.log(err);
})