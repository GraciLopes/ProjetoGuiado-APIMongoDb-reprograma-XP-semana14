const express = require("express")
const router = express.Router()
const controller = require("../controller/contatosController")

//@route GET /contatos 
//@query ou params --- não foi utilizado
//@desc Retornar todos os contatos
//@access public
//@endpoint http://localhost:3030/contatos
router.get("/", controller.getAll)

//@route POST /criar 
//@query ou params --- não foi utilizado
//@desc Criar um novo contato
//@access public
//@endpoint http://localhost:3030/contatos/criar
router.post("/criar", controller.addContato)

//@route GET /contatos 
//@params nome
//@desc Retornar todos os contatos
//@access public
//@endpoint http://localhost:3030/contatos/nome/
router.get("/nome/:nome", controller.getByName)

//@route GET /id 
//@params id
//@desc Retorna o contato id
//@access public
//@endpoint http://localhost:3030/contatos/id/
router.get("/id/:id", controller.getById)

//@route DELETE /deletar 
//@query id
//@desc Exclui um telefone por id especifico
//@access public
//@endpoint http://localhost:3030/contatos/deletar?_id=
router.delete("/deletar", controller.deleteById)

//@route PATCH /atualizar/telefone
//@query telefone
//@desc Atualiza apenas o contato
//@access public
//@endpoint http://localhost:3030/contatos
router.patch("/atualizar/telefone", controller.updateTel)

//@route PUT /atualizar 
//@query id
//@desc Atualiza completamente o contato
//@access public
//@endpoint http://localhost:3030/contatos
router.put("/atualizar", controller.contatoUpdate)

module.exports = router