//필요한 모듈 및 연결
const express = require('express');
const app = express();
const Http = require('http');
const logger = require('./winston');
const morgan = require('morgan');
const { sequelize } = require('./models/index');
const cookieParser = require('cookie-parser');
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output");


app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));
const http = Http.createServer(app);
// const connect = require('./models/index');
// connect();

// sequelize 초기화
sequelize.sync({force:false})
    .then(()=>console.log('데이터베이스 연결 성공!'))
    .catch((err)=>console.error(err));

//라우팅
const homeRouter = require('./routers/home');
const submitRouter = require('./routers/submit');
const detailRouter = require('./routers/detail');
const editRouter = require('./routers/edit');
const signRouter = require('./routers/user');
const errorHandler = require('./middlewares/errorHandler');
const commentRouter = require('./routers/comment');

//세팅
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
//로거
const combined =
    ':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"';
// 기존 combined 포멧에서 timestamp만 제거
const morganFormat = process.env.NODE_ENV !== 'production' ? 'dev' : combined; // NOTE: morgan 출력 형태 server.env에서 NODE_ENV 설정 production : 배포 dev : 개발
app.use(morgan(morganFormat, { stream: logger.stream })); // morgan 로그 설정

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
app.use(errorHandler.routeError);
app.use(errorHandler.errorHandler);

module.exports = http;
