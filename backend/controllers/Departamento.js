const sql = require('mssql')
const sqlConfig = require('../db.js')




const Departamento = function (departamento) {
  this.nome = departamento.nome;
  this.idcentrocusto = departamento.idcentrocusto;
  this.id = departamento.id;
};




// INICIO

module.exports = {

  // =====================================
  // Resgatar todos usuarios
  // ====================================
  async selecionar(req, res) {

    try {

      await sql.connect(sqlConfig)
      const resposta = await sql.query`      
      SELECT dep.nome, centro.nome as centrocusto, dep.id
      FROM departamentos dep
      inner join centrocusto as centro on centro.id = dep.idcentrocusto`

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


    const novoDepartamento = new Departamento({
      nome: req.body.nome,
      idcentrocusto: req.body.idcentrocusto
    });

    try {

      await sql.connect(sqlConfig)
      const resposta = await sql.query`INSERT INTO departamentos (nome, idcentrocusto) values (${novoDepartamento.nome},${novoDepartamento.idcentrocusto})`
      res.status(200).send({ message: `Cadastrado.` });

    } catch (err) {
     console.log(err)
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

      const resposta = await sql.query`DELETE FROM departamentos where id = ${req.params.id}`

      res.status(200).send({ message: ` Deletado!` });

    } catch (err) {


      if (err.id === "not_found") {
        res.status(404).send({
          message: `não encontrado com id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Não foi possível excluir o  " + req.params.id
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
      const resposta = await sql.query`SELECT dep.nome , centro.nome as centrocusto, dep.id, centro.id as idcentrocusto
      FROM departamentos dep
      inner join centrocusto as centro on centro.id = dep.idcentrocusto where dep.id = ${req.params.id}`
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
    console.log(req.body)
    if (!req.body) {
      res.status(400).send({
        message: "Valor não pode ser vazio"
      });
    }
   
    const novoDepartamento = new Departamento({
        nome: req.body.nome,
        idcentrocusto: req.body.idcentrocusto,
        id: req.body.id

      });

      console.log(novoDepartamento)
    try {
      await sql.connect(sqlConfig)
      const resposta = await sql.query`UPDATE departamentos set nome = ${novoDepartamento.nome} ,  idcentrocusto = ${novoDepartamento.idcentrocusto}   where id = ${novoDepartamento.id}`
      res.status(200).send({
        message: 'Dados  Atualizado'

      })
      sql.close(sqlConfig)
    } catch (err) {
      res.status(500).send(err)
    }
  }

// FIM

}
