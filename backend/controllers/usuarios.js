const sql = require('mssql')
const sqlConfig = require('../db.js')



const Usuario = function (usuario) {
  this.nome = usuario.nome;
  this.cargo = usuario.cargo;
  this.departamento = usuario.departamento;
  this.senha = usuario.senha;
  this.id = usuario.id;
};




// INICIO

module.exports = {
  // =====================================
  // Importar
  // ====================================

  async importarcsV(req, res) {


    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    const data = req.body

    sql.connect(sqlConfig)
    var resultado;

    for (const novoUsuario of data) {
    
    
    
      try {
        const resposta = await sql.query`INSERT INTO usuarios (nome,senha,departamento,cargo) values (${novoUsuario.nome},${novoUsuario.senha},${novoUsuario.departamento},${novoUsuario.cargo})`
        console.log(resposta)
        resultado = 'Cadastrado'

      } catch (error) {
        console.log(err)
        resultado = err
      }

     




    }


    res.status(200).send({ message: resultado });










  },





  // =====================================
  // Resgatar todos usuarios
  // ====================================
  async selecionar(req, res) {

    try {

      await sql.connect(sqlConfig)
      const resposta = await sql.query`select id,nome,departamento,cargo from usuarios`
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
    const novoUsuario = new Usuario({
      nome: req.body.nome,
      senha: req.body.senha,
      departamento: req.body.departamento,
      cargo: req.body.cargo
    });

    try {
      await sql.connect(sqlConfig)
      const resposta = await sql.query`INSERT INTO usuarios (nome,senha,departamento,cargo) values (${novoUsuario.nome},${novoUsuario.senha},${novoUsuario.departamento},${novoUsuario.cargo})`
      res.status(200).send({ message: `Usuario cadastrado.` });
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

      const resposta = await sql.query`DELETE FROM usuarios where id = ${req.params.id}`

      res.status(200).send({ message: `Usuario deletado!` });

    } catch (err) {


      if (err.id === "not_found") {
        res.status(404).send({
          message: `Usuario não encontrado com id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Não foi possível excluir o Usuario com id " + req.params.id
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
      const resposta = await sql.query`select id,nome,departamento,cargo FROM usuarios where id = ${req.params.id}`
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
    const usuario = new Usuario({
      nome: req.body.nome,
      senha: req.body.senha,
      id: req.body.id

    });
    try {
      await sql.connect(sqlConfig)
      const resposta = await sql.query`UPDATE usuarios set nome = ${usuario.nome}  where id = ${usuario.id}`
      res.status(200).send({
        message: 'Dados do Usuario Atualizado'

      })
      sql.close(sqlConfig)
    } catch (err) {
      res.status(500).send(err)
    }
  }

  // FIM

}
