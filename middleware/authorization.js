const PDF = require('../models/PDF')

module.exports = (req, res, next) => {
    const PDFId = req.params.PDFId
    const userId = req.decode.id
    PDF.findById(PDFId)
        .then((PDF) => {
            if (PDF) {
                if (PDF.owner == userId) {
                    next()
                } else {
                    let err = new Error('You have no authorization on this PDF')
                    err.name = 'AuthorizationError'
                    next(err)
                }
            } else {
                let err = new Error('PDF does not exist')
                err.name = 'NotFound'
                next(err)
            }
        }).catch(next);
}