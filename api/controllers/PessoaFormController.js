const database = require('../models/index')


const express = require('express')


const bodyParser = require('body-parser')
const session = require('express-session')
const hbs = require('express-handlebars')

const app = express()

app.engine('hbs', hbs.engine({
  layoutsDir: 'C:/Users/Wesley Maia/Desktop/Agendamento/api/controllers/views/layouts',
})); app.set('view engine', 'hbs')


app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))

app.use(session({
  secret: 'CriarUmaChaveQualquer',
  resave: false,
  saveUninitialized: true

}))


app.get('/form', (req, res)=>{
  if(req.session.errors){
      var arrayErros = req.session.errors
      req.session.errors = ''
      return res.render('index', {layout:'main'})
  }

  if(req.session.sucess){
      req.session.sucess = false
      res.render('index', {MsgSuccess:true})
  }
  res.render('index')
  
})




class PessoaForm {

    static mostraPessoa(req, res) {
      const novasInfos = req.body
      return console.log(novasInfos)   
    }
}

module.exports = PessoaForm