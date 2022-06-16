const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;

//retorna todos os produtos
router.get("/", (req, res, next) => {
  // conexão com banco
  mysql.getConnection((error, conn) => {
    if (error) {
      //tratamento de erro
      return res.status(500).send({ error: error });
    }
    //usando linguagem sql para se comunicar com o banco
    conn.query("SELECT * FROM produtos;", (error, resultado, fields) => {
      if (error) {
        //tratamento de erro
        return res.status(500).send({ error: error });
      }
      return res.status(200).send({ response: resultado });
    });
  });
});

//insere um produto
router.post("/", (req, res, next) => {
  // conexão com banco de dados
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      //usando linguagem sql para se comunicar com o banco
      "INSERT INTO produtos (nome, preco) VALUES (?, ?)",
      [req.body.nome, req.body.preco],
      (error, resultado, field) => {
        conn.release();

        if (error) {
          //tratamento de erro
          res.status(500).send({
            error: error,
            response: null,
          });
        }
        res.status(201).send({
          mensagem: "produto inserido com sucesso",
          id_produto: resultado.insertId,
        });
      }
    );
  });
});

//retorna os dados deu um produto
router.get("/:id_produto", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "SELECT * FROM produtos WHERE id_produto = ?;",
      [req.params.id_produto],
      (error, resultado, fields) => {
        if (error) {
          return res.status(500).send({ error: error });
        }
        return res.status(200).send({ response: resultado });
      }
    );
  });
});

//modifica os dados do produto
router.patch("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {return res.status(500).send({ error: error });}
    conn.query(
      `UPDATE produtos 
        SET nome         = ?, 
        preco            = ? 
        WHERE id_produto = ?`,
        //as variaveis devem estar na mesma ordem que a de cima!!
      [
        req.body.nome, 
        req.body.preco, 
        req.body.id_produto
      ],
      (error, resultado, fields) => {
        //sempre colocar esse conn.realise() no post ou no update
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });}

          res.status(202).send({
            mensagem: "produto alterado com sucesso",
            id_produtos: resultado.insertId,
        });
      }
    );
  });
});

//deleta um produto
router.delete("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {return res.status(500).send({ error: error });}
    conn.query(
      `DELETE FROM produtos WHERE id_produto = ?`,
        //as variaveis devem estar na mesma ordem que a de cima!!
      [ 
        req.body.id_produto
      ],
      (error, resultado, fields) => {
        //sempre colocar esse conn.realise() no post ou no update
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });}

          res.status(202).send({
            mensagem: "produto removido com sucesso"
        });
      }
    );
  });
});

module.exports = router;
