const bodyParser = require('body-parser')
const pessoas = require('./pessoasRoute.js')
const funcionarios = require('./funcionariosRoute.js')
const servicos = require('./servicosRoute.js')
const pessoasForm = require('./pessosasFormRoute.js')
const agendamento = require('./agendamentoRoute.js')
const usuarios = require('./usuariosRoute')


module.exports = app => {
    app.use(bodyParser.json())
    app.use(pessoas)
    app.use(funcionarios)
    app.use(servicos)
    app.use(pessoasForm)
    app.use(agendamento)
    app.use(usuarios)
}