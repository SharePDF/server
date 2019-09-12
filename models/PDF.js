const mongoose = require('mongoose');
const Schema = mongoose.Schema

const PDFSchema = new Schema({
    title: { type: String },
    url: {
        type: String,
        match: [/.+\.pdf$/i, "File is not a PDF"]
    },
    owner: { type: String }
}, { timestamps: true })

PDFSchema.pre('save', function (next) {
    if (!this.title) this.title = this.url.split('/').pop()
    next()
})

const PDF = mongoose.model('PDF', PDFSchema)

module.exports = PDF