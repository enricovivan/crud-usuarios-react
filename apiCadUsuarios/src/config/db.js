
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mysql = require('mysql2')


const app = express()

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'prova_comercio_enrico'
})

connection.connect((err)=>{
    if (err) {
        console.log("Erro ao conectar ao banco de dados", err)
        return
    }
    console.log("Conexão com banco de dados estabelecida com sucesso")
})

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

module.exports = {app, connection}