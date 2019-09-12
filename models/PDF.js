const mongoose = require('mongoose');
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const PDFSchema = new Schema({
    title: String,
    url: {
        type: String,
        // match: [/.+\.pdf$/i, "URL does not contain PDF"],
        // required: [true, 'URL is empty']
    },
    description: {
        type: String,
        default: "No Description"
    },
    owner: ObjectId
}, { timestamps: true })

PDFSchema.pre('save', function (next) {
    if (this.url && !this.title) {
        this.title = this.url.split('/').pop()
        this.title = this.title.substring(0, this.title.length - 4)
    }
})

const PDF = mongoose.model('PDF', PDFSchema)

module.exports = PDF