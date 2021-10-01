const socketIo = require('socket.io');
const Http = require("http");
const express = require('express');

const app = express();
const http = Http.createServer(app);

const io = socketIo(http,{
    cors: {
        origin:"*",
        methods:["GET","POST"]
    },
});

app.get("/test",(req,res)=>{
    res.send("익스프레스가 잘 켜져있습니다.")
})

http.listen(3000, ()=>{
    console.log('서버가 켜졌습니다!');
})

io.on("connection", (socket)=>{
    console.log("연결됐습니다.");

    socket.send("연결 잘됨!");

    socket.emit("customEventName", "이것이커스텀");
})

