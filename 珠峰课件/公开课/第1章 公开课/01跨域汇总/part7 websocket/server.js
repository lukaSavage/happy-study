const express = require('express');
const app = express();

const WebSocket = require('ws');
const Wss = new WebSocket({port: 3000});
Wss.on('oncollection',function(ws){
    ws.on('message',function(e){
        console.log(e.data);
        ws.send('但我不喜欢你')
    })
})
