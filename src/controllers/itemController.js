const ItemModel = require("../models/itemModel");

// O Controller é o "gerente".
// Ele pega o que o cliente pediu (req), pede pro Model fazer o trabalho,
// e devolve uma resposta (res).

// GET /itens
const list = async (req, res) => {
    try {
        const itens = await ItemModel.findAll();
        return res.status(200).json({ itens });
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro ao buscar itens" });
    }
};

// POST /itens
const create = async (req, res) => {
    const { nome, valor } = req.body;

    if (!nome || !valor) {
        return res.status(400).json({
            mensagem: "Nome e valor são obrigatórios"
        });
    }

    try {
        await ItemModel.create(nome, valor);
        return res.status(201).json({ mensagem: "Item criado com sucesso" });
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro ao criar item" });
    }
};

// PUT /itens/:id
const update = async (req, res) => {
    const { id } = req.params;
    const { nome, valor } = req.body;

    try {
        const item = await ItemModel.findById(id);

        if (!item) {
            return res.status(404).json({ mensagem: "Item não encontrado" });
        }

        await ItemModel.update(id, nome, valor);
        return res.status(200).json({ mensagem: "Item atualizado com sucesso" });
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro ao atualizar item" });
    }
};

// DELETE /itens/:id
const remove = async (req, res) => {
    const { id } = req.params;

    try {
        await ItemModel.remove(id);
        return res.status(200).json({ mensagem: "Item removido" });
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro ao remover item" });
    }
};

module.exports = { list, create, update, remove };