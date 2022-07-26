const { Router } = require('express')
const AgendamentoController = require('../controllers/AgendamentoController.js')

const router = Router()

router.post('/agendamento', AgendamentoController.criaAgendamento)



module.exports = router