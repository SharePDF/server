const PDF = require('../models/PDF');
const ISO6391 = require('iso-639-1')
class PDFController {
    static read(req, res, next) {
        const { id: userId } = req.decode
        // * Filter should be placed here as well
        PDF.find({ owner: userId })
            .then((PDFs) => {
                res.status(200).json(PDFs)
            })
            .catch(next);
    };
    
    static readAll(req, res, next){

        PDF.find().sort({createdAt:"desc"}).populate("owner")
        .then(allpdf=>{
            res.status(200).json(allpdf)
        })
        .catch(next)
    }

    static create(req, res, next) {

        let language = null
        if (req.body.language){
            let code = req.body.language
            language = ISO6391.getName(code)
        }
        
        const { id: userId } = req.decode
        let url = null
        if (req.file){
            url = req.file.cloudStoragePublicUrl
        }
        const {title, description} = req.body
        PDF.create({ title, url, owner: userId ,description,language})
            .then((newPDF) => {
                res.status(201).json(newPDF)
            })
            .catch(next);
    };

    static update(req, res, next) {
        const { id } = req.params
        const { title, description } = req.body
        PDF.update({ _id: id }, { $set: { title, description } }, { runValidators: true })
            .then((updatedPDF) => {
                res.status(200).json(updatedPDF)
            })
            .catch(next);
    };

    static delete(req, res, next) {
        // * Change the fields and delete this line
        const { id } = req.params
        console.log(id)
        PDF.findByIdAndDelete(id)
        .then(deletedPdf=>{
            res.status(200).json(deletedPdf)
        })
        .catch(next)
    };

}

module.exports = PDFController
