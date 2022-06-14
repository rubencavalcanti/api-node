const express = require("express");
const router = express.Router();

//retorna todos os pedidos
router.get("/", (req, res, next) => {
  res.status(200).send({
    mensagem: "retorna um pedido",
  });
});

//insere um pedido
router.post("/", (req, res, next) => {
  res.status(201).send({
    mensagem: "o pedido foi criado",
  });
});

//retorna os dados deu um pedido
router.get("/:id_pedidos", (req, res, next) => {
  const id = req.params.id_pedidos;
  res.status(200).send({
    mensagem: "detalhes do pedido",
  });
});

//deleta um pedido
router.delete("/", (req, res, next) => {
  res.status(201).send({
    mensagem: "Pedido excluido",
  });
});

module.exports = router;
