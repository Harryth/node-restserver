// =========================================
// Verificación del Token
// =========================================

const jwt = require('jsonwebtoken')

let verifyToken = (req, res, next) => {

    let token = req.get('token')

    jwt.verify(token, process.env.TOKEN_SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            })
        }

        req.user = decoded.user
        next()
    })
}


// =========================================
// Verificación del rol de administrador
// =========================================

let verifyAdminRole = (req, res, next) => {

    let user = req.user

    if (user.role === 'ADMIN_ROLE') {
        next()
    } else {
        return res.status(401).json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        })
    }
}

module.exports = {
    verifyToken,
    verifyAdminRole
}