require('dotenv').config()
const cors = require('cors')
const express = require('express')
const compression = require('compression')
const path = require('path')
const helmet = require('helmet')
const app = express()

//Require routes
const main = require('./routes/app')
const users = require('./routes/users')

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
                'https://cdn.jsdelivr.net'
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



app.listen(process.env.port || 3000)