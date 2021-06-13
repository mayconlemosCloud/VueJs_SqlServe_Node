const sql = require('mssql')
const sqlConfig = require('../db.js')

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const SECRET = 'abcde123456'



const Usuario = function (usuario) {
    this.nome = usuario.nome;
    this.cargo = usuario.cargo;
    this.departamento = usuario.departamento;
    this.senha = usuario.senha;
    this.id = usuario.id;
  };


module.exports = {
    async Login(req, res) {
       
        const usuario = new Usuario({
            nome: req.body.nome,
            senha: req.body.senha,        
      
          });
          console.log(usuario)

            try {
                await sql.connect(sqlConfig)
                const resposta = await sql.query`select * from usuarios where senha = ${usuario.senha} and nome= ${usuario.nome}`    
                      
               
                if (usuario.senha.toString() !== resposta.recordset[0].senha.trim()) {
                  
                    res.status(400).send('Senha ou usuario incorretos')
                    
                }


                //  ===========================>
                //  Token setado por 60 minutos   
                //  <===========================

                const token = jwt.sign( {nome: resposta.recordset[0].nome}, SECRET, { expiresIn: '60m' });

               

               

                res.status(200).json(token);
             

            } catch (err) {
                console.log(err)
                res.status(400).send(err)  
            }
        }
    }