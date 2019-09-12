const User = require('../models/User');
const { compare } = require('../helpers/bcryptjs')
const { createToken } = require('../helpers/jwt')

class UserController {
    static read(req, res, next) {
        // * Filter should be placed here as well
        User.find({})
            .then((Users) => {
                res.status(200).json(Users)
            })
            .catch(next);
    };

    static create(req, res, next) {
        const { email, password } = req.body
        User.create({ email, password })
            .then((newUser) => {
                let token = createToken({ id: newUser._id })
                res.status(201).json({ email, token })
            })
            .catch(next);
    };

    static update(req, res, next) {
        // * Change the fields and delete this line
        const { fields, id } = req.body
        // * Change the fields and delete this line
        User.updateOne({ _id: id }, { fields }, { runValidators: true })
            .then((updatedUser) => {
                res.status(200).json(updatedUser)
            })
            .catch(next);
    };

    static delete(req, res, next) {
        // * Change the fields and delete this line
        const { id } = req.body
        User.delete({
            _id: id
        })
            .then((deletedUser) => {
                res.status(200).json(deletedUser)
            })
            .catch(next);
    };

    static login(req, res, next) {
        const { email, password } = req.body
        User.findOne({ email })
            .then((user) => {
                if (user && compare(password, user.password)) {
                    let token = createToken({ id: user._id })
                    res.status(200).json({ email, token })
                } else {
                    let err = new Error('Wrong Email / Password')
                    err.name = 'AuthenthicationError'
                    next(err)
                }
            }).catch(next);
    }

}

module.exports = UserController