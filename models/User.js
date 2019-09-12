const mongoose = require('mongoose');
const Schema = mongoose.Schema
const { hash } = require('../helpers/bcryptjs')
const uniqueValidator = require('mongoose-unique-validator')

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email required'],
        match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Invalid email format'],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password required"],
        minlength: [6, 'Minimum password length is 6 characters']
    }
})

UserSchema.pre('save', function (next) {
    this.password = hash(this.password)
    next()
})

UserSchema.plugin(uniqueValidator, { message: 'Email is already taken.' });

const User = mongoose.model('User', UserSchema)

module.exports = User