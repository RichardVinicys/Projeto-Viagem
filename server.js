require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo');
const session = require('express-session')

mongoose.connect(process.env.CONNECTIONSTRING)
.then(()=> 
    app.emit('pronto')
)
.catch((e)=> 
    console.log(e)
)

const sessionOption = session({
    secret: process.env.SECRETSTRING,
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave:false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
})

const path = require('path');
const routes = require('./routes')
const flash = require('connect-flash')
const { msgMiddleware } = require('./src/middlewares/middleware')

app.use(express.urlencoded({ extended: true }))

app.use(sessionOption)
app.use(flash())
app.use(msgMiddleware)
app.use(routes);
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.json())


app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.on('pronto', () =>{
    app.listen(3000, ()=>{
        console.log('Servidor rodando na porta 3000')
        console.log('Acessar http://localhost:3000')
    });
})