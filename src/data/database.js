const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

async function connectDB() {
    const db = await open({
        filename: "./database.db",
        driver: sqlite3.Database
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS itens (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            valor REAL NOT NULL
        )
    `);

    return db;
}

module.exports = connectDB;