const database = require('../models/index')
const bcrypt = require('bcrypt')
const passport = require('passport')
const tokens = require('../Tokens/tokens')
const { EmailVerificacao } = require('../Emails/emails')


class UsuarioController {
    static async criaUsuario(req, res) {

    const {nome, email, senhaHash, confirmaSenha} = req.body

    if(!nome) {
        return res.status(422).json({msg: 'O nome é obrigatório'})
    }

    if(!email) {
        return res.status(422).json({msg: 'O email é obrigatório'})
    }

    if(!senhaHash) {
        return res.status(422).json({msg: 'A senha é obrigatório'})
    }

    if(!confirmaSenha) {
        return res.status(422).json({msg: 'A confimação de senha é obrigatório'})
    }

    if(senhaHash !== confirmaSenha) {
        return res.status(422).json({msg: 'As senhas não conferem'})
    }

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
        "senhaHash": novaSenhaHash,
        "emailVerificado": false
    }

    try {
        const usuarioCriado = await database.Usuarios.create(novoUsuario)
        const token = tokens.verificacaoEmail.cria(usuarioCriado.id)
        const endereco = "localhost:5000/usuario/verifica_email/"+token
        const emailVerificacao = new EmailVerificacao(usuarioCriado, endereco)
        emailVerificacao.enviaEmail().catch(console.log)

        
        return res.status(201).json(usuarioCriado)
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
            const usuarioConsultado = await database.Usuarios.findOne({
                where: {
                    id:id
                }
            })

            console.log(usuarioConsultado.id)

            const usuarioNovo = {
                id: usuarioConsultado.id,
                nome: usuarioConsultado.nome,
                email: usuarioConsultado.email
                
            }

            return res.status(200).json(usuarioConsultado)
        } catch {
            res.status(500).json({msg: 'Id não encontrado'})
        }
    }


    

    static async deleteUsuario (req, res) {
        const { id } = req.params

        console.log(id)
        console.log(typeof(id))

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

        try {
            const accesstoken = tokens.access.cria(req.user.id)
            const refreshToken = await tokens.refresh.cria(req.user.id)
    
            res.set('Authoziration', accesstoken)
            res.status(200).send({refreshToken})

        } catch (erro) {
            res.status(500).json({erro:erro.menssage})

        }

    }

    static async logout (req, res) {

        try {
            const token = req.token

            await tokens.access.invalida(token)
            res.status(204).send()


        } catch (erro) {
            res.status(500).json({erro:erro.message})

        }

    }


    static async verificaEmail(req, res) {
        try {
            const usuario = req.user
            usuario.emailVerificado = true
            await usuario.save()

            res.status(200).json()
        } catch (erro) {
            res.status(500).json({erro: erro.message})
        }
    }




}

module.exports = UsuarioController