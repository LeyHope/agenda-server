require('dotenv').config()

const express = require('express');
const app = express()

const cors = require('cors')

const session = require('express-session')
const fileUpload = require('express-fileupload');
const fs = require('fs')


var path = require('path')
const routes = require('./routes/index')




app.use(cors())
app.use(express.json())



app.use(session({secret: '123'}));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, 'temp')
}))



const port = 5000
routes(app)

app.listen(port, ()=> console.log(`servidor está rodando na porta ${port}`))






module.exports = app