const http = require('./app');
const socketIo = require('socket.io');
const io = socketIo(http);

io.on('connection',(socket) => {
    console.log('연결.')

    socket.on('disconnect', ()=>{
        console.log('나가');
    });
})