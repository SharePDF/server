const PDF = require('../models/PDF');

class PDFController {
    static read(req, res, next) {
        // * Filter should be placed here as well
        PDF.find({})
            .then((PDFs) => {
                res.status(200).json(PDFs)
            })
            .catch(next);
    };

    static create(req, res, next) {
        const { _id: userId } = req.decode
        // * Change the fields and delete this line
        const { fields } = req.body
        // * Change the fields and delete this line
        PDF.create({ fields })
            .then((newPDF) => {
                res.status(201).json(newPDF)
            })
            .catch(next);
    };

    static update(req, res, next) {
        // * Change the fields and delete this line
        const { fields, id } = req.body
        // * Change the fields and delete this line
        PDF.updateOne({ _id: id }, { fields }, { runValidators: true })
            .then((updatedPDF) => {
                res.status(200).json(updatedPDF)
            })
            .catch(next);
    };

    static delete(req, res, next) {
        // * Change the fields and delete this line
        const { id } = req.body
        PDF.delete({
            _id: id
        })
            .then((deletedPDF) => {
                res.status(200).json(deletedPDF)
            })
            .catch(next);
    };

}

module.exports = PDFController