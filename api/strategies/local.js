const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const UsuarioController = require('../controllers/UsuarioController')

const bcrypt = require('bcrypt');

const database = require('../models/index')



passport.use(
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'senhaHash',
        session: false
    }, 
    
    async (email, senhaHash, done)=>{

        const buscaEmailnoBanco = await database.Usuarios.findOne({
            where : {
                email : email
            }
        })

        try {
            
            const usuario = await UsuarioController.buscaUsuarioPorEmail(email)
            verificaUsuario(usuario)
            await verificaSenha(senha, usuario.senhaHash)

            done(null, usuario)

        } catch (erro) {
            done(erro)

        }
    })
)
