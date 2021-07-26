const mongoose = require ('mongoose')

const Schema = new mongoose.Schema({
    nome:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    foto:{
        type: String,
        required: true,
    },
    dataCadastro:{
        type: Date,
        required: true,
    },
    dataAtualizacao:{
        type: Date,
        required: true,
        
    }
})

module.exports = mongoose.model('Clients', Schema)