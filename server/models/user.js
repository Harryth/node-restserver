const mongoose = require('mongoose')
const validator = require('mongoose-unique-validator')

let Schema = mongoose.Schema

let validRoles = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
}

let userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: validRoles
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

userSchema.methods.toJSON = function() {

    let user = this

    let userObject = user.toObject()
    delete userObject.password

    return userObject
}

userSchema.plugin(validator, { message: '{PATH} debe ser único' })

module.exports = mongoose.model('user', userSchema)