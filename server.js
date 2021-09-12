require('dotenv').config()
const cors = require('cors')
const express = require('express')
const compression = require('compression')
const path = require('path')
const helmet = require('helmet')
const app = express()
var session = require('express-session')

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
                'https://cdn.jsdelivr.net'
            ],
            styleSrc: [
                "'self'",
                'https://cdn.jsdelivr.net',
                'https://cdnjs.cloudflare.com/'
            ],
            fontSrc: [
                'https://cdnjs.cloudflare.com/'
            ]
        }
    },
}))
app.use(compression())
app.use(express.json())
app.use(helmet.hidePoweredBy());
app.set('views', path.join(__dirname,"views"))
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,"public")));

//Re-route
app.use('/', main)
app.use('/api/users', users)
app.use('/auth', auth)



app.listen(process.env.port || 3000)