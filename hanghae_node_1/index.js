const express = require('express');
const app = express();
const port = 3000;
const connect = require('./schemas/index');
connect();

const homeRouter = require('./routes/home');
const cardsRouter = require('./routers/card');
const detailRouter = require('./routes/detail');
const editRouter = require('./routes/edit');
const signRouter = require('./routes/user');

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static('public'));

app.use('/', homeRouter);
app.use('/detail', detailRouter);
app.use('/edit', editRouter);
app.use('/api', cardsRouter);
app.use('/user',signRouter);

app.listen(port, ()=>{
    console.log(`app listening localhost:${port}`)
})
