const express = require("express");
const { itens } = require("./data/memory")


const router = express.Router()

router.delete('/itens/:id', (req, res) => {
    const id = Number(req.params.id)
        const indice = itens.findIndex(item => item.id === id)

        if (indice === -1) {
            return res.status(404).json({
                mensagem: "Item não encontrado"
            });
        }

        itens.splice(indice, 1)
    return res.status(200).json({
        mensagem: "Item removido"
    })
})

router.put('/itens/:id', (req, res) => {
    const { nome, valor } = req.body
        const id = Number(req.params.id)
        const item = itens.find(item => item.id === id)

        if (!nome || !valor) {
            return res.status(400).json({
                mensagem: "Nome e valor são obrigatórios"
            });
        }

        if (!item) {
            return res.status(404).json({
                mensagem: "Item não encontrado"
            });
        }

        item.nome = nome
        item.valor = valor
    return res.status(200).json({
        mensagem: "Item atualizado",
        item
    })
})


router.get('/itens', async (req, res) => {
    return res.status(200).json({
        const conectarBancoDados =  await connectDB();
        const produtos = await conectarBancoDados.all("SELECT * FROM tarefas")
    })
})


router.post('/itens', (req, res) => {
    const { nome, valor } = req.body

    if (!nome || !valor) {
        return res.status(400).json({
            mensagem: "Nome e valor são obrigatórios"
        });
    }

    const maiorId = itens.reduce((maior, item) => {
        return item.id > maior ? item.id : maior;
    }, 0);

    const novoItem = {
        id: maiorId + 1,
        nome,
        valor
    }

    itens.push(novoItem)

    return res.status(201).json({
        mensagem: "Item criado",
        item: novoItem
    })
    
})

module.exports = router;