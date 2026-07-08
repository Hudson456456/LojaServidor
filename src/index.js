const express = require("express");
const app = express();
const rotas = require("./routes/itemRoutes");
const { middlewareDeAutenticacao } = require("./middleware/middle");

const connectDB = require("./data/database");

connectDB();

app.use(express.json());
app.use(middlewareDeAutenticacao);
app.use("/", rotas);

app.listen(3000, () => {
    console.log("Servidor rodando!");
});