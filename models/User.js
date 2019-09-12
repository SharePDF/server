const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email required'],
        validate: {
            validator: function (email) { return email ? false : true },
            message: "Email needs to be unique"
        }
    },
    password: {
        type: String,
        required: [true, "Password required"],
        minlength: 6
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = User