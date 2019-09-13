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
    owner: {
        type: ObjectId,
        ref: "User"
    },
    language : {
        type : String
    }
}, { timestamps: true })

PDFSchema.pre('save', function (next) {
    if (this.url && !this.title) {
        this.title = this.url.split('/').pop()
    }
    next()
})

const PDF = mongoose.model('PDF', PDFSchema)

module.exports = PDF
