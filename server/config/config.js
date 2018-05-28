// =========================================
// Puerto
process.env.PORT = process.env.PORT || 3000;
// =========================================


// =========================================
// Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
// =========================================

// =========================================
// Vencimiento del Token
// 60 segundos
// 60 minutos
// 24 horas
// 30 dias
process.env.TOKEN_EXP = 60 * 60 * 24 * 30;
// =========================================

// =========================================
// Semilla del Token
process.env.TOKEN_SEED = process.env.TOKEN_SEED || 'este-es-el-seed-de-desarrollo';
// =========================================

// =========================================
// Base de Datos

let urlDB

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/test'
} else {
    urlDB = process.env.MLAB_URL
}
// =========================================


process.env.DB_URL = urlDB