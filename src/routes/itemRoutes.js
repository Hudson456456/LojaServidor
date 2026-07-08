const express = require("express");
const itemController = require("../controllers/itemController");

// A rota não tem lógica nenhuma.
// Ela só diz: "esse endereço + esse método vai para essa função do Controller".

const router = express.Router();

router.get("/itens", itemController.list);
router.post("/itens", itemController.create);
router.put("/itens/:id", itemController.update);
router.delete("/itens/:id", itemController.remove);

module.exports = router;