const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');
const path =require("path") 
const port = process.env.Port||4001;
const index = require('./routes/index');

const app = express()
app.use(index);
app.use(express.static('client/build'))
const server = http.createServer(app);

const io = socketIo(server);

let interval;
io.on ('connection', socket=>{
    console.log('New Client Now Connected')
    // if(interval){
    //     clearInterval(interval);
    // }
    // interval= setInterval(()=>getApiAndEmit(socket), 10000);
    socket.on('disconnect',()=>{
        console.log("buh bye")
    })

    socket.on('outgoingMsg',data=>{
        const msg= data.outgoingMsg
        const user= data.user
        console.log(data)
        socket.broadcast.emit('incomingMsg',{msg,user} )
    })
    socket.on('user', data=>{
        console.log("User"+data)
        const user= data.user
        
        socket.broadcast.emit('user',user)
    })
})
// const getApiAndEmit= (socket)=>{
//     console.log('Here Homie')
//     socket.emit('FromAPI', "heres johnny")
// };

server.listen(port, ()=> console.log(`Listening on port ${port}`))