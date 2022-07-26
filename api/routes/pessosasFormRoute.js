const { Router } = require('express')
const PessoaFormController = require('../controllers/PessoaFormController.js')


const router = Router()

router.post('/novocad', PessoaFormController.mostraPessoa)



module.exports = router