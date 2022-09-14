const express = require('express');
const app = express();

app.use(express.static(__dirname));


app.listen(3000,(err)=>{
    if(!err) {
        console.log('A server run success~ please call on：localhost:3000');
    }
});