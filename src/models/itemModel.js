const connectDB = require("../data/database");

// O Model só sabe conversar com o banco de dados.
// Ele não sabe nada sobre req, res, status HTTP, etc.
// Isso é papel do Controller.

class ItemModel {

    // Busca todos os itens
    static async findAll() {
        const db = await connectDB();
        return db.all("SELECT * FROM itens");
    }

    // Busca um único item pelo id
    static async findById(id) {
        const db = await connectDB();
        return db.get("SELECT * FROM itens WHERE id = ?", [id]);
    }

    // Cria um novo item
    static async create(nome, valor) {
        const db = await connectDB();
        return db.run(
            "INSERT INTO itens (nome, valor) VALUES (?, ?)",
            [nome, valor]
        );
    }

    // Atualiza um item existente
    static async update(id, nome, valor) {
        const db = await connectDB();
        return db.run(
            "UPDATE itens SET nome = ?, valor = ? WHERE id = ?",
            [nome, valor, id]
        );
    }

    // Remove um item
    static async remove(id) {
        const db = await connectDB();
        return db.run("DELETE FROM itens WHERE id = ?", [id]);
    }
}

module.exports = ItemModel;