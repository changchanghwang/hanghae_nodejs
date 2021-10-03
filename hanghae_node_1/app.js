//필요한 모듈 및 연결
const express = require('express');
const app = express();
const port = 3000;
const cookieParser = require('cookie-parser');
const connect = require('./models/index');
connect();

//라우팅
const homeRouter = require('./routers/home');
const submitRouter = require('./routers/submit');
const detailRouter = require('./routers/detail');
const editRouter = require('./routers/edit');
const signRouter = require('./routers/user');
const errorHandler = require('./routers/controllers/errorHandler');
const commentRouter = require('./routers/comment');

//세팅
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//parser 및 static파일
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

//라우팅
app.use('/', homeRouter);
app.use('/detail', detailRouter);
app.use('/edit', editRouter);
app.use('/card', submitRouter);
app.use('/user', signRouter);
app.use('/comment', commentRouter);

//에러 핸들러
app.use(errorHandler);

//server listen
app.listen(port, () => {
    console.log(`app listening localhost:${port}`);
});
