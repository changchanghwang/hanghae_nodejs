const express = require('express');
const app = express();
const port = 3000;
const connect = require('./schemas/index');
connect();

const homeRouter = require('./routes/home');
const submitRouter = require('./routes/submit');
const cardsRouter = require('./routers/card');
const detailRouter = require('./routes/detail');
const editRouter = require('./routes/edit');

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static('public'));

app.use('/', homeRouter);
app.use('/', submitRouter);
app.use('/detail', detailRouter);
app.use('/edit', editRouter)
app.use('/api', cardsRouter);

app.listen(port, ()=>{
    console.log(`app listening localhost:${port}`)
})  