const express = require('express')
const bcrypt = require('bcrypt')
const _ = require('underscore')
const User = require('../models/user')
const { verifyToken, verifyAdminRole } = require('../middlewares/authentication')
const app = express()

app.get('/user', verifyToken, (req, res) => {

    let from = Number(req.query.from) || 0
    let page = Number(req.query.page) || 5

    User.find({ state: true }, 'name email role state google img')
        .skip(from)
        .limit(page)
        .exec((err, users) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            User.count({ state: true }, (err, count) => {

                res.json({
                    ok: true,
                    users,
                    count
                })
            })
        })
})

app.post('/user', [verifyToken, verifyAdminRole], (req, res) => {

    let body = req.body

    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    })

    user.save((err, userDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            user: userDB
        })
    })
})

app.put('/user/:id', [verifyToken, verifyAdminRole], (req, res) => {

    let id = req.params.id
    let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'state'])

    User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado en la base de datos'
                }
            })
        }

        res.json({
            ok: true,
            user: userDB
        })
    })

})

app.delete('/user/:id', [verifyToken, verifyAdminRole], (req, res) => {

    let id = req.params.id
    let delUser = { state: false }

    //User.findByIdAndRemove(id, (err, userDel) => {
    User.findByIdAndUpdate(id, delUser, { new: true }, (err, userDel) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if (!userDel) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            })
        }

        res.json({
            ok: true,
            user: userDel
        })
    })
})

module.exports = app