const express = require("express");
const router = express.Router();

//retorna todos os produtos
router.get("/", (req, res, next) => {
  res.status(200).send({
    mensagem: "Usando o Post dentro da rota de produtos",
  });
});

//insere um produto
router.post("/", (req, res, next) => {
  res.status(201).send({
    mensagem: "Usando o Post dentro da rota de produtos",
  });
});

//retorna os dados deu um produto
router.get("/:id_produtos", (req, res, next) => {
  const id = req.params.id_produtos;

  if (id === "especial") {
    res.status(200).send({
      mensagem: "voce descobril o ID Especial",
    });
  } else {
    res.status(200).send({
      mensagem: "você passou um ID",
    });
  }
});

//modifica os dados do produto
router.patch("/", (req, res, next) => {
  res.status(201).send({
    mensagem: "Usando o PATH dentro da rota produtos",
  });
});

//deleta um produto
router.delete("/", (req, res, next) => {
  res.status(201).send({
    mensagem: "Usando o DELETE dentro da rota produtos",
  });
});

module.exports = router;