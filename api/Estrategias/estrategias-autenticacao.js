const passport = require('passport')
const LocalStrategy = require('passport-local')
const database = require('../models/index')
const bcrypt = require('bcrypt')

passport.use(
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'senhaHash',
        session: false
    }, async (email, senha, done)=>{

        try {
            const usuarioConsultado = await database.Usuarios.findOne({
                where: {
                    email:email
                }
            })

            if(!usuarioConsultado) {
                throw new Error('email nao encontrado')
            }
    
            const usuario = {
                id: usuarioConsultado.id,
                nome: usuarioConsultado.nome,
                email: usuarioConsultado.email,
                senhaHash: usuarioConsultado.senhaHash
            }

            const senhaValida = await bcrypt.compare(senha, usuario.senhaHash)
            if (!senhaValida) {
                throw new Error("Email ou senha inválidos")
            }

            done(null, usuario)

        } catch (erro) {
            done(erro)
        }


    })
)