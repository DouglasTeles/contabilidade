const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require ('dotenv').config()
const path = require('path')
app.set('view engine', 'ejs')
const Client = require('./models/Clients')

//mongoose
const mongoConnection = process.env.MONGO_URI
mongoose.connect(mongoConnection,{
    useUnifiedTopology: true,
    useNewUrlParser: true
    },()=>  console.log('Conected Database!'))


//Public(static files)
app.use(express.static(path.join(__dirname,'')))
app.use(express.static(path.join(__dirname,'public')))
app.use(express.static(path.join(__dirname,'views')))
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended:true}))
app.use(bodyParser.json())
 

//Routes
const routes = require('./routes')
app.use(routes)


app.listen(process.env.PORT ||3000,()=>{
    console.log("Aplicação rodando")
})