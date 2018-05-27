// =========================================
// Puerto
process.env.PORT = process.env.PORT || 3000
    // =========================================


// =========================================
// Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'
    // =========================================


// =========================================
// Base de Datos

let urlDB

// if (process.env.NODE_ENV === 'dev') {
//     urlDB = 'mongodb://localhost:27017/test'
// } else {
urlDB = 'mongodb://test-user:test11235@ds237660.mlab.com:37660/test-nodejs-rest'
    // }
    // =========================================


process.env.DB_URL = urlDB