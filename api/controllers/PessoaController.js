const database = require('../models/index')

const bodyParser = require('body-parser')
const express = require('express')

const app = express()


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())




class PessoaController {

    static async criaPessoa(req, res) {
        const novaPessoa = req.body
        try {
          const novaPessoaCriada = await database.Pessoas.create(novaPessoa)
          return res.status(200).json(novaPessoaCriada)
        } catch (error) {
          return res.status(500).json(error.message)
        }
    }


    static async apagaPessoa(req, res) {
        const { id } = req.params
        try {
          await database.Pessoas.destroy({ where: { id: Number(id) }})
          return res.status(200).json({ mensagem: `id ${id} deletado` })
    
        } catch (error) {
          return res.status(500).json(error.message)
        }
      }


    static async pegaTodosAsPessoas(req, res) {

        try{
            const todosAsPessoas = await database.Pessoas.findAll()
            return res.status(200).json(todosAsPessoas)
        }   catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pagaUmaPessoa(req, res) {
        const {id} = req.params
        try{
            const umaPessoa = await database.Pessoas.findOne({
                where: {
                    id: Number(id)
                }
            })
            return res.status(200).json(umaPessoa)
            } catch (error) {
            return res.status(500).json(error.message)
        }
    }


}

module.exports = PessoaController