const express = require('express');
const app = express();

app.use(express.static(__dirname));

app.listen(4000,(err)=>{
    if(!err) {
        console.log('B server run success~ please call on：localhost:3000');
    }
});