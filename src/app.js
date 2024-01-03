const express = require('express')
const db = require('./helpers/db.helper')
const router = require('./routes')
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');


const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10,
    message: 'Too many requests from this IP, please try again after a minute',
});

app.use(limiter);

app.use('/api/', router);

// db connection
db.sync({ alter: true }).then(() => {
    console.log('Database Connected!')
}).catch((err) => {
    console.log('Error => ', err)
})


// test route
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Working!'
    })
})

module.exports = app