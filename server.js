require('dotenv').config()
const cors = require('cors')
const express = require('express')
const compression = require('compression')
const path = require('path')
const http = require('http')
const helmet = require('helmet')
const crypto = require('crypto')
var session = require('express-session')
const socketController = require('./controllers/socketController')

const app = express()
const server = http.createServer(app)
var io = require('socket.io')(server)
//Require routes
const main = require('./routes/app')
const users = require('./routes/users')
const auth = require('./routes/auth')

app.use(cors())
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: [
                "'self'",
                "'unsafe-inline'",
                'https://cdn.jsdelivr.net',
                'https://code.jquery.com'
            ],
            styleSrc: [
                "'self'",
                'https://cdn.jsdelivr.net',
                'https://cdnjs.cloudflare.com/',
            ],
            fontSrc: [
                'https://cdnjs.cloudflare.com/'
            ],
            imgSrc: [
                "'self'",
                "data:"
            ]
        }
    },
}))
var sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
})
io.use((socket,next)=> {
    sessionMiddleware(socket.request,{},next)
})
io.on("connection", socketController.onConnect);
app.use(compression())
app.use(express.json())
app.use(helmet.hidePoweredBy());
app.set('views', path.join(__dirname,"views"))
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,"public")));
app.use(sessionMiddleware)  

//Re-route
app.use('/', main)
app.use('/api/users', users)
app.use('/auth', auth)



server.listen(process.env.port || 3000)