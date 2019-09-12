const Router = require('express').Router();
const PDFController = require('../controllers/PDF');
const Authenthication = require('../middleware/authenthication')
const Authorization = require('../middleware/authorization')
const { sendUploadToGCS, multer } = require("../middleware/uploadPdf")

Router.use(Authenthication)
Router.get('/', PDFController.readAll)
Router.get('/user', PDFController.read)
Router.post('/', multer.single("pdf"), sendUploadToGCS, PDFController.create)

// ! Require Authorization
Router.use('/:id', Authorization)
Router.put('/:id', PDFController.update)
Router.delete('/:id', PDFController.delete)

module.exports = Router;
