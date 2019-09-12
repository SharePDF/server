const Router = require('express').Router()

// ! Test
Router.get('/', (req, res) => {
    res.status(200).json({
        message: "connected"
    })
})

// * Routes


module.exports = Router
