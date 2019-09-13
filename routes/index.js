const Router = require('express').Router()
const users = require('./users')
const PDF = require('./PDF')

// ! Test
Router.get('/', (req, res) => {
    res.status(200).json({
        message: "connected"
    })
})

// * Routes
Router.use('/users', users);
Router.use('/pdfs', PDF)

module.exports = Router
