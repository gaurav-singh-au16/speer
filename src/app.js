const express = require('express')
const db = require('./helpers/db.helper')
const router = require('./routes')
const bodyParser = require('body-parser');


const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/', router);

// db connection
db.sync({alter: true}).then(() => {
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