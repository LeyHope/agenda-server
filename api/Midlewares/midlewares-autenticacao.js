const passport = require('passport');
const database = require('../models/index')
const {InvalidArgumentError} = require('../erros')
const tokens = require('../Tokens/tokens')





module.exports = {
    local: (req, res, next) => {

        passport.authenticate(
            'local',
            {session: false}, 
            (erro, usuario, info) => {


                if (!usuario) {
                    return res.status(401).json()
                }

                req.user = usuario
                console.log(req.user)
                return next()
        }
        )(req, res, next);

    },


    bearer: (req, res, next) =>{
        passport.authenticate(
            'bearer',
            {session:false},
            (erro, usuario, info) => {
                if (erro && erro.name === 'JsonWebTokenError') {
                    return res.status(401).json({ erro: erro.message })
                }

                if (erro) {
                    return res.status(500).json({ erro: erro.message })
                }

                if (!usuario) {
                    return res.status(401).json()
                }


                req.token = info.token
                console.log(req.token)
                req.user = usuario
                return next()
            }

        )(req, res, next)
    },

    refresh: async (req, res, next) => {

        try {
            const { refreshToken } = req.body
            const id = await tokens.refresh.verifica(refreshToken)
            await tokens.refresh.invalida(refreshToken)
            const usuario = await database.Usuarios.findOne({
                where : {
                    id: id
                }
            })
            req.user = usuario
            return next()

        } catch (erro) {
            if (erro.name === 'InvalidArgumentError') {
                return res.status(401).json({erro: erro.message})
            }

            return res.status(500).json({erro: erro.message})

        }

    }

}