const sql = require('mssql')
const sqlConfig = require('../db.js')




const Centrocusto = function (centrocusto) {
  this.nome = centrocusto.nome;
  this.id = centrocusto.id;
};




// INICIO

module.exports = {

  // =====================================
  // Resgatar todos usuarios
  // ====================================
  async selecionar(req, res) {

    try {

      await sql.connect(sqlConfig)
      const resposta = await sql.query`SELECT *  FROM centrocusto`

      console.log(resposta)
      res.status(200).send(JSON.stringify(resposta.recordset));

    } catch (err) {

      res.status(500).send({
        message:
          err.message || "Alguem erro aconteceu"
      });
    }


  },

  // =====================================
  // Inserir Usuario
  // ====================================
  async inserir(req, res) {

    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    const novoCentrocusto = new Centrocusto({
      nome: req.body.nome,
     
    });

    try {
      await sql.connect(sqlConfig)
      const resposta = await sql.query`INSERT INTO Centrocusto (nome) values (${novoCentrocusto.nome})`
      res.status(200).send({ message: `Cadastrado.` });
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Algum erro aconteceu"
      });
    }
  },

  // =====================================
  // DELETAR USUARIO
  // ====================================
  async deletar(req, res) {


    try {
      await sql.connect(sqlConfig)

      const resposta = await sql.query`DELETE FROM Centrocusto where id = ${req.params.id}`

      res.status(200).send({ message: `Deletado!` });

    } catch (err) {


      if (err.id === "not_found") {
        res.status(404).send({
          message: `Usuario não encontrado com id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Não foi possível excluir id " + req.params.id
        });
      }
    }
  },

 // =====================================
  // BUSCAR UM USUARIO
  // ====================================

  async buscar(req, res) {

    try {
      await sql.connect(sqlConfig)
      const resposta = await sql.query`select * FROM Centrocusto where id = ${req.params.id}`
      res.status(200).send(JSON.stringify(resposta.recordset[0]));

    } catch (err) {

      console.log(err)
      res.status(500).send(err)
    }

  },

 // =====================================
  // ATUALIZAR UM USUARIO
  // ====================================

  async update(req, res) {

    if (!req.body) {
      res.status(400).send({
        message: "Valor não pode ser vazio"
      });
    }
    const novoCentrocusto = new Centrocusto({
        nome: req.body.nome,
        id:req.body.id
       
      });
    try {
      await sql.connect(sqlConfig)
      const resposta = await sql.query`UPDATE Centrocusto set nome = ${novoCentrocusto.nome}  where id = ${novoCentrocusto.id}`
      res.status(200).send({
        message: 'Dado  Atualizado'

      })
      sql.close(sqlConfig)
    } catch (err) {
      res.status(500).send(err)
    }
  }

// FIM

}
