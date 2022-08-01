const { Router } = require('express')
const AgendamentoController = require('../controllers/AgendamentoController.js')

const router = Router()

router.post('/agendamento', AgendamentoController.criaAgendamento)


router.delete('/agendamento', AgendamentoController.excluiAgendamento)



module.exports = router