const express = require("express");
const connectDB = require("./data/database");

const router = express.Router();


// GET - Mostrar todos os itens
router.get("/itens", async (req, res) => {

    const bancoDeDados = await connectDB();

    const itens = await bancoDeDados.all("SELECT * FROM itens");

    return res.status(200).json({
        itens
    });

});


// POST - Criar um item
router.post("/itens", async (req, res) => {

    const { nome, valor } = req.body;

    if (!nome || !valor) {
        return res.status(400).json({
            mensagem: "Nome e valor são obrigatórios"
        });
    }

    const bancoDeDados = await connectDB();

    await bancoDeDados.run(
        "INSERT INTO itens (nome, valor) VALUES (?, ?)",
        [nome, valor]
    );

    return res.status(201).json({
        mensagem: "Item criado com sucesso"
    });

});


// PUT - Atualizar um item
router.put("/itens/:id", async (req, res) => {

    const { id } = req.params;
    const { nome, valor } = req.body;

    const bancoDeDados = await connectDB();

    const item = await bancoDeDados.get(
        "SELECT * FROM itens WHERE id = ?",
        [id]
    );

    if (!item) {
        return res.status(404).json({
            mensagem: "Item não encontrado"
        });
    }

    await bancoDeDados.run(
        "UPDATE itens SET nome = ?, valor = ? WHERE id = ?",
        [nome, valor, id]
    );

    return res.status(200).json({
        mensagem: "Item atualizado com sucesso"
    });

});


// DELETE - Remover um item
router.delete("/itens/:id", async (req, res) => {

    const { id } = req.params;

    const bancoDeDados = await connectDB();

    await bancoDeDados.run(
        "DELETE FROM itens WHERE id = ?",
        [id]
    );

    return res.status(200).json({
        mensagem: "Item removido"
    });

});

module.exports = router;