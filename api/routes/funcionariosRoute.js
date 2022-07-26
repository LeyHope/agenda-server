const { Router } = require('express')
const FuncionarioController = require('../controllers/FuncionarioController.js')

const router = Router()


router.post('/funcionario', FuncionarioController.criaFuncionario)
router.get('/funcionario', FuncionarioController.pegaTodosOsFuncionarios)
router.delete('/funcionario/:id', FuncionarioController.deletaFuncionario)

module.exports = router