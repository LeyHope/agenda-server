const database = require('../models/index')

class FuncionarioController {

    static async criaFuncionario(req, res) {
        const novoFuncionario = req.body
        try {
            const novoFuncionarioCriado = await database.Funcionarios.create(novoFuncionario)
            return res.status(200).json(novoFuncionarioCriado)
          } catch (error) {
            return res.status(500).json(error.message)
          }

    }


    static async pegaTodosOsFuncionarios(req, res) {

        try{
            const todosOsFuncionarios = await database.Funcionarios.findAll()
            return res.status(200).json(todosOsFuncionarios)
        }   catch (error) {
            return res.status(500).json(error.message)
        }
    }



    static async deletaFuncionario(req, res) {
        const { id } = req.params
        try {
            await database.Funcionarios.destroy({where: {id: Number(id)}})
            return res.status(200).json({ mensagem: `id ${id} deletado` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = FuncionarioController