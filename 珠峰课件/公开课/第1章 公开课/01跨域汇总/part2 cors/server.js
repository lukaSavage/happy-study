const express = require('express');
const app = express();

app.get('/testCors', (req,res)=>{
    console.log('进来了');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({
        code: 0,
        msg: 'cors test success!'
    })
})


app.listen(4000,(err)=>{
    if(!err) {
        console.log('server run success~ please call on：localhost:3000');
    }
});