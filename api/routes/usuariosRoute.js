const { Router } = require('express')
const UsuarioController = require('../controllers/UsuarioController')
const passport = require('passport')
const jwt = require('jsonwebtoken');

const midlewaresAutenticacao = require('../Midlewares/midlewares-autenticacao');


const router = Router()


router.post('/usuario', UsuarioController.criaUsuario)

router.post('/usuario/login', midlewaresAutenticacao.local, UsuarioController.login)

router.get('/usuario', UsuarioController.listaUsuarios)
router.get('/usuariobusca', UsuarioController.buscaUsuarioPorEmail)
router.get('/usuariobuscaid', UsuarioController.buscaUsuarioPorId)

router.delete('/usuario/:id', 
midlewaresAutenticacao.bearer, 
UsuarioController.deleteUsuario)

router.post('/usuario/logout', 
[midlewaresAutenticacao.bearer, midlewaresAutenticacao.refresh], 
UsuarioController.logout)

router.post('/usuario/atualiza_token', 
midlewaresAutenticacao.refresh,
UsuarioController.login)



module.exports = router