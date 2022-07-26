// const passport = require("passport");
// const BearerStrategy = require('passport-http-bearer')

// const database = require('../models/index')

// const jwt = require('jsonwebtoken');

// const UsuarioController = require('../controllers/UsuarioController')


// passport.use(
//     new BearerStrategy(
//         async (token, done) => {

//             try {
//                 const payload =  jwt.verify(token, process.env.CHAVE_JWT)
//                 const usuario = await UsuarioController.buscaUsuarioPorId(payload.id)
//                 done(null, usuario)

//             } catch (erro) {
//                 done(erro)
//             }
//         }
//     )
// )