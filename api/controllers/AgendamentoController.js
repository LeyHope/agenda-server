const database = require('../models/index')

class AgendamentoController {

    static async criaAgendamento(req, res) {
        const {data_agendamento, cliente_id, funcionario_id, servico_id} = req.body;

        const cliente = await database.Pessoas.findOne({
            where: {
                id: cliente_id
            }
        })

        if(!cliente) {
            return res.status(400).json('cliente inválido')
        }

        const funcionario = await database.Funcionarios.findOne({
            where: {
                id: funcionario_id
            }
        })

        if(!funcionario) {
            return res.status(400).json('Funcionario inválido')
        }

        const servico = await database.Servicos.findOne({
            where: {
                id: servico_id
            }
        })

        if(!servico) {
            return res.status(400).json('Serviço inválido')
        }

        try {
            const agendamento = await database.Agendamento.create({
                data_agendamento,
                cliente_id,
                funcionario_id,
                servico_id
            })
            return res.status(200).json(agendamento)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }


    static async excluiAgendamento (req, res) {
        const {id} = req.body

        const agendamento = await database.Agendamento.findByPk(id)
        console.log(agendamento)

        if (!agendamento) {
            return res.status(400).json('Agendamento inválido')
        }


        try {
            await database.Agendamento.destroy({
                where: {
                    id: id
                }
            })
            return res.status(200).json({ mensagem: `Agendamento ${id} deletado` })

        } catch (error) {
            return res.status(500).json(error.message)

        }
    }



}

module.exports = AgendamentoController