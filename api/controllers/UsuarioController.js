const database = require('../models/index')
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')


const passport = require('passport')



function criaTokenJWT(id) {
    const payload = {
        id: id
    }
    const token = jwt.sign(payload, process.env.CHAVE_JWT, { expiresIn: '15m' })
    return token
}



class UsuarioController {
    static async criaUsuario(req, res) {

    const {nome, email, senhaHash} = req.body

    if(!nome) {
        return res.status(422).json({msg: 'O nome é obrigatório'})
    }

    if(!email) {
        return res.status(422).json({msg: 'O email é obrigatório'})
    }

    if(!senhaHash) {
        return res.status(422).json({msg: 'A senha é obrigatório'})
    }

    // adicionar senha de confirmaçao
    // if(senhaHash !== confirmeSenha) {
    //     return res.status(422).json({msg: 'As senhas não conferem'})
    // }

    const emailAConsultar = await database.Usuarios.findOne({
        where: {
            email: email
        }
    })

    //se essa variavel for preenchida por alguma coisa:
    if(emailAConsultar) {
        return res.status(422).json({msg: 'Email já cadastrado'})
    }


    const novaSenhaHash = await bcrypt.hash(senhaHash, 12)

    const novoUsuario = {
        "nome": nome,
        "email": email,
        "senhaHash": novaSenhaHash
    }

    try {
        const novoUsuarioCriado = await database.Usuarios.create(novoUsuario)
        return res.status(200).json(novoUsuarioCriado)
        } catch (error) {
            return res.status(500).json({msg: 'Erro ao cadastrar'})
        }
    }







    static async listaUsuarios(req, res) {

        try {
            const todosOsUsuarios = await database.Usuarios.findAll()
            return res.status(200).json(todosOsUsuarios)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }







    static async buscaUsuarioPorEmail (req, res) {
        const busca = req.body
        const email = busca.email
        try {
            const usuario = await database.Usuarios.findAll({
                where : {
                    email: email
                }
            })
            return res.status(200).json(usuario)
        } catch (error) {
            res.status(500).json(error.message)
        }

    }




    static async buscaUsuarioPorId  (req, res) {
        const { id } = req.body

        try {
            const usuario = await database.Usuarios.findOne({
                where: {
                    id:id
                }
            })
            return res.status(200).json(usuario)
        } catch {
            res.status(500).json({msg: 'Id não encontrado'})
        }
    }


    

    static async deleteUsuario (req, res) {
        const { id } = req.params

        try {
            await database.Usuarios.destroy({
                where: {
                    id : id
                }
            })
            return res.status(200).json({ mensagem: `id ${id} deletado` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }





    static async login (req, res) {

        const {id, email, senhaHash} = req.body

        if(!email) {
            return res.status(422).json({msg: 'O email é obrigatório'})
        }
    
        if(!senhaHash) {
            return res.status(422).json({msg: 'A senha é obrigatório'})
        }

        const user = await database.Usuarios.findOne({
            where: {
                email: email
            }
        })
    
        if(!user) {
            return res.status(404).json({msg: 'Usuário não encontrado!'})
        }

        const checaSenha = await bcrypt.compare(senhaHash, user.senhaHash)

        if(!checaSenha) {
            return res.status(422).json({msg: 'Senha inválida!'})
        }


        const token = criaTokenJWT(id)

        res.set('Authoziration', token)
        res.status(204).send()


    }



}

module.exports = UsuarioController