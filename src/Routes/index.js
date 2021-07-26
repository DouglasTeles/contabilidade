const {Router} = require('express')
const routes = Router()
const Client = require('../models/Clients')



function informs()
{
alert("Cadastro Realizado com sucesso!");
}

function confirmacao()
{
var x;
var r=confirm("Escolha um valor!");
if (r==true)
  {
  x="você pressionou OK!";
  }
else
  {
  x="Você pressionou Cancelar!";
  }
document.getElementById("demo").innerHTML=x;
}


routes.get('/cliente/novo', (req, res) => {
    res.render("RegisterClient")
})

//Cadastrar cliente
routes.post('/cliente/save', (req, res) => {
 
    const data = req.body
    const nome = data.nome
     const email = data.email
     const foto = data.foto
     const dataCadastro = data.dataCad
    const dataAtualizacao = data.dataupdate
    Client.create({
      nome,
      email,
      foto,
      dataCadastro,
      dataAtualizacao
     }).then(() =>{
      
      res.redirect("/cliente/novo")
     })
    })

//Listar todos os Clientes
  routes.get('/clientes', (req, res) => {
   Client.find().then(clientes =>{
      res.render("listClient",{clientes:clientes})
    })
    
  })
  
//Exibe formulario para edição do cliente
routes.get('/cliente/:clients_id/editar', (req, res)=>{
  const {clients_id} = req.params
  
  Client.findById(clients_id).sort({data: "desc"}).then(clientes=>{
    if(clientes != undefined){
      
      res.render("editClient",{clientes:clientes})
    }else{
      res.redirect("/clientes")
    }
  })
})

//Edita o clientes
routes.post('/saveupdate', (req, res)=>{
  const data = req.body
  const id = data.id
  const nome = data.nome
  const email = data.email
  const foto = data.foto
  const dataCadastro = data.dataCad
  const dataAtualizacao = data.dataupdate
 

   Client.findOneAndUpdate(id, {
     nome,
     email,
     foto,
     dataAtualizacao},
     {new:true}
   ).then(() =>{
     res.redirect("/clientes")
    })
})

//Deletar Cliente
routes.post('/delete', (req, res)=>{
 const id = req.body.id
 

 Client.findByIdAndRemove(id).then(() =>{
  res.redirect("/clientes")
 })
 
})


//Buscar um cliente no banco
routes.post('/buscar/:clients_id', (req, res)=>{
  const filter = req.body.busca
  const clients_id = filter

  Client.findOne({nome:clients_id}).then(clientes =>{
    if(!clientes){
      Client.findOne({email:clients_id}).then(clientes =>{
        if(!clientes){
          
          res.redirect("/clientes")
        }else{
          res.render("findClient",{clientes:clientes})
        }
      })
    }else{
      res.render("findClient",{clientes:clientes})
    }
  })
  
})
  



module.exports = routes