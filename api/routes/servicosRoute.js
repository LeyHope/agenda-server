const { Router } = require('express')
const ServicosController = require('../controllers/ServicosController.js')

const router = Router()

router.post('/servicos', ServicosController.criaServico)
router.get('/servicos', ServicosController.pegaTodosOsServicos)
router.delete('/servicos/:id', ServicosController.deletaServico)

module.exports = router