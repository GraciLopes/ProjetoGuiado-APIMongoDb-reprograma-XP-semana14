const mongoose = require("mongoose")
const DB_URL = "mongodb://localhost:27017/ContatosReprograma"

const connect = () => {
    mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true }) // { useNewUrlParser: true } 
    const connection = mongoose.connection
    connection.on('error', () => console.error('erro ao se conectar'))
    connection.once('open', () => console.log("Conectamos ao MongoDB"))
}

module.exports = { connect }

//arquivo reporitory cria a conexao com o nosso banco de dados MongoDB