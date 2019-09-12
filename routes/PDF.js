const Router = require('express').Router();
const PDFController = require('../controllers/PDF');
const Authenthication = require('../middleware/authenthication')

Router.use(Authenthication)
Router.get('/', PDFController.read)

module.exports = Router;