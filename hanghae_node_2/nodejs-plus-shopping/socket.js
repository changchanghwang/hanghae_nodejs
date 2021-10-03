const socketIo = require('socket.io');
const http = require('./app');
const io = socketIo(http);

// const socketIdMap = {};
// function emitSamePageViewersCount(){
//     const countByUrl = Object.values(socketIdMap).reduce((value,url)=>{
//         return {
//             ...value,
//             [url]: value[url] ? value[url] +1 : 1,
//         };
//     }, {});
//     for (const [socketId, url] of Object.entries(socketIdMap)){
//         const count = countByUrl[url];
//         io.to(socketId).emit('SAME_PAGE_VIEWER_COUNT', count);
//     }
// }

function initSocket(sock) {
    console.log('새로운 소켓이 연결됐어요!');

    // 특정 이벤트가 전달됐는지 감지할 때 사용될 함수
    function watchEvent(event, func) {
        sock.on(event, func);
    }

    // 연결된 모든 클라이언트에 데이터를 보낼때 사용될 함수
    function notifyEveryone(event, data) {
        sock.broadcast.emit(event, data);
    }

    return {
        watchBuying: () => {
            watchEvent('BUY', (data) => {
                const emitData = {
                    ...data,
                    date: new Date().toISOString(),
                };
                notifyEveryone('BUY_GOODS', emitData);
            });
        },
        watchChange: () => {
            watchEvent('CHANGED_PAGE', (data) => {
                // console.log(data);
                // socketIdMap[sock.id]=data;
                // emitSamePageViewersCount()
                sock.emit('SAME_PAGE_VIEWER_COUNT', io.engine.clientsCount);
            });
        },
        watchByebye: () => {
            watchEvent('disconnect', () => {
                console.log(sock.id, '연결이 끊어졌어요!');
                // emitSamePageViewersCount()
            });
        },
    };
}



io.on('connection', (socket) => {
    console.log('누군가 연겷랬다.');

    const { watchBuying, watchByebye, watchChange } = initSocket(socket);

    watchBuying();
    watchChange();
    watchByebye();
});