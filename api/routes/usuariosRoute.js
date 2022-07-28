const { Router } = require('express')
const UsuarioController = require('../controllers/UsuarioController')
const passport = require('passport')
const jwt = require('jsonwebtoken');


function checkToken(req, res, next) {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if(!token) {
        return res.status(401).json({ msg: 'Acesso negado' })
    }

    try {

        const secret = process.env.CHAVE_JWT

        jwt.verify(token, secret)

        next()

    } catch (error) {
        res.status(400).json(error)
    }

}




const router = Router()


router.post('/usuario', UsuarioController.criaUsuario)
router.post('/usuario/login', UsuarioController.login)
router.get('/usuario', UsuarioController.listaUsuarios)
router.get('/usuariobusca', UsuarioController.buscaUsuarioPorEmail)
router.get('/usuariobuscaid', UsuarioController.buscaUsuarioPorId)

// router.delete('/usuario/:id', UsuarioController.deleteUsuario)

router.delete('/usuario/:id', checkToken ,UsuarioController.deleteUsuario)

router.get('/test', UsuarioController.test)



module.exports = router