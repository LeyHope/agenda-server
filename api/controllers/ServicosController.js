const database = require('../models/index')

class ServicosController {
    static async criaServico(req, res) {
        const novoServico = req.body
        try {
            const novoServicoCriando = await database.Servicos.create(novoServico)
            return res.status(200).json(novoServicoCriando)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaTodosOsServicos(req, res) {

        try{
            const todosOsServicos = await database.Servicos.findAll()
            return res.status(200).json(todosOsServicos)
        }   catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async deletaServico(req, res) {
        const { id } = req.params
        try {
            await database.Servicos.destroy({where: {id: Number(id)}})
            return res.status(200).json({ mensagem: `Servico ${id} deletado` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }



}

module.exports = ServicosController