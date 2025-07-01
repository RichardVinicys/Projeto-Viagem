require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo');
const session = require('express-session')

mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() =>
        app.emit('pronto')
    )
    .catch((e) =>
        console.log(e)
    )

const sessionOption = session({
    secret: process.env.SECRETSTRING,
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
})

const path = require('path');
const routes = require('./routes')
const helmet = require('helmet')
const flash = require('connect-flash')
const { msgMiddleware, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware')
const csrf = require('csurf')



app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "https://unpkg.com"],
            styleSrc: ["'self'", "https://unpkg.com"],
            imgSrc: [
                "'self'",
                "data:",
                "https://a.tile.openstreetmap.org",
                "https://b.tile.openstreetmap.org",
                "https://c.tile.openstreetmap.org",
                "https://unpkg.com"
            ]
        }
    }
}));
app.use(sessionOption)
app.use(flash())

app.use(csrf())

app.use(msgMiddleware)
app.use(checkCsrfError)
app.use(csrfMiddleware)
app.use(routes);
app.use(express.static(path.resolve(__dirname, 'public')));


app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.on('pronto', () => {
    app.listen(3000, () => {
        console.log('Servidor rodando na porta 3000')
        console.log('Acessar http://localhost:3000')
    });
})