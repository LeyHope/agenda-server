const { Router } = require('express')
const PessoaController = require('../controllers/PessoaController.js')

const router = Router()

router.get('/pessoas', PessoaController.pegaTodosAsPessoas)
router.get('/pessoas/:id', PessoaController.pagaUmaPessoa)
router.post('/pessoas', PessoaController.criaPessoa)
router.delete('/pessoas/:id', PessoaController.apagaPessoa)

module.exports = router