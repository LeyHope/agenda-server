const database = require('../models/index')

class AgendamentoController {

    static async criaAgendamento(req, res) {
        const novoAgendamento = req.body;

        try {
            const novoAgendamentoCriado = await database.Agendamento.create(novoAgendamento)
            return res.status(200).json(novoAgendamentoCriado)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }



}

module.exports = AgendamentoController