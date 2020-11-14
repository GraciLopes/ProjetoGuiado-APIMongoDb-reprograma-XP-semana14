const model = require("../models/contatoSchema")

//getAll retorna todos os contatos
const getAll = (req, res) => {
    console.log(req.url)
    model.find((error, contatos) => {
        if (error) {
            return res.status(500).send(error)
        } else {
            return res.status(200).json({
                mensagem: "Tudo certo com o GET",
                contatos
            })
        }
    })
}

//getByName retorna o contato por nome

const getByName = (req, res) => {
    const nomeParam = req.params.nome
    model.findOne({ "nome": nomeParam }, (error, contato) => {
        if (error) {
            return res.status(500).send(error)
        } else {
            if (contato) {
                return res.status(200).send(contato)
            } else {
                return res.status(404).send("Contato não encontrado")
            }
        }

    })

}



//getById retorna o contato por id especifico

const getById = (req, res) => {
    const idParam = req.params.id //buscando pelo id na url
    model.findById(idParam, (error, contato) => {
        if (error) {
            return res.status(500).send(error)
        } else {
            if (contato) {
                return res.status(200).send(contato)
            } else {
                return res.status(404).send("Contato não encontrado")
            }
        }
    })
}

//addContato cria um contato novo

const addContato = (req, res) => {
    const contatoDoBody = req.body //pegando o body que o usuario digitou
    const contato = new model(contatoDoBody) //criando um novo dado com o body

    contato.save((error) => { //essa função salva o que o usuario digitou 
        if (error) {
            return res.status(400).send(error)
        } else {
            return res.status(200).send({
                mensagem: "POST criado com sucesso",
                contato
            })
        }
    })
}

//deleteById exclui um contato por id especifico

const deleteById = (req, res) => {
    const idParam = req.query
    model.findByIdAndDelete(idParam, (error, contato) => {
        if (error) {
            return res.status(500).send(error)
        } else {
            if (contato) {
                return res.status(200).send("Contato deletado")
            } else {
                return res.sendStatus(404)
            }
        }
    })
}

//updateTel atualiza apenas o telefone do contato (metodo patch)

const updateTel = (req, res) => {
    const idParam = req.query
    const contatoTelefone = req.body
    const novo = { new: true } //informando que estamos efetuando a atualização

    model.findByIdAndUpdate(
        idParam,
        contatoTelefone,
        novo,
        (error, contato) => {
            if (error) {
                return res.status(500).send({ mensagem: "Infelizmente não foi possível atualizar o telefone!", error })
            } else {
                return res.status(200).send({ mensagem: "Telefone atualizado com sucesso!", contato })
            }
        })
}


//contatoUpdate atualiza todos os dados do contato 

const contatoUpdate = (req, res) => {
    const idParam = req.query
    const bodyDoContato = req.body
    const update = { new: true }

    model.findByIdAndUpdate(
        idParam,
        bodyDoContato,
        update,
        (error, contato) => {
            if (error) {
                return res.status(500).send({
                    mensagem: "Infelizmente não foi possível atualizar o contato.",
                    error
                })
            } else {
                return res.status(200).send({
                    mensagem: "Contato atualizado com sucesso!",
                    contato
                })
            }
        })
}


/*[*] "/" Retorna index com apresentação { mensagem: bem vinda a lista de contatinhos }
[*] "/contatos" Retorna todos os dados do banco de dados
[*] "/contatos/nome/[NOME]" Retorna contato por nome específico
[*] "/contatos/id/[ID]" Retorna contato por id específico
[*] "/contatos/criar" Cria novo contato e retorna mensagem amigável
[*] "/contatos/deletar/[ID]" Deleta contato por id específico e retorna mensagem amigável
[*] "/contatos/atualizar/telefone/[ID]" Atualiza somente telefone do contato por id específico e retorna mensagem amigável
[ ] "/contatos/atualizar/[ID]" Atualiza completamente contato e retorna mensagem amigável (id não pode ser modificado)*/


module.exports = {
    getAll,
    addContato,
    getByName,
    getById,
    deleteById,
    updateTel,
    contatoUpdate
}