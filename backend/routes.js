const routes = require("express").Router();
const UsuarioController = require("./controllers/usuarios");
const DepartamentoController = require("./controllers/Departamento");
const CentroCustoController = require("./controllers/CentroCusto");
const LoginController = require("./controllers/Login");



const jwt = require('jsonwebtoken');
const SECRET = 'abcde123456'



function verifyJWT(req, res, next){
    console.log("token: ", req.headers.authorization)
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, SECRET, function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      
      // se tudo estiver ok, salva no request para uso posterior
     
      next();
    });
}




                //  ===========================>
                //  Login 
                //  <===========================

routes.post("/login/",  LoginController.Login);


                //  ===========================>
                //  Importar Lista
                //  <===========================

routes.post("/importar/", UsuarioController.importarcsV );



                //  ===========================>
                //  Rota Usuario   
                //  <===========================


routes.get("/select", UsuarioController.selecionar );
routes.post("/inserir",  UsuarioController.inserir);
routes.post("/delete/:id",UsuarioController.deletar);
routes.post("/BuscarUsuario/:id",UsuarioController.buscar);
routes.post("/AtualizarUsuario/",UsuarioController.update);

                //  ===========================>
                //  Rota Departamento 
                //  <===========================




routes.get("/departamento/select", DepartamentoController.selecionar );
routes.post("/departamento/inserir",  DepartamentoController.inserir);
routes.post("/departamento/delete/:id",DepartamentoController.deletar);
routes.post("/departamento/Buscar/:id",DepartamentoController.buscar);
routes.post("/departamento/Atualizar/",DepartamentoController.update);

                 //  ===========================>
                //  Rota Centro Custo 
                //  <===========================

routes.get("/CentroCusto/select", CentroCustoController.selecionar );
routes.post("/CentroCusto/inserir",  CentroCustoController.inserir);
routes.post("/CentroCusto/delete/:id",CentroCustoController.deletar);
routes.post("/CentroCusto/Buscar/:id",CentroCustoController.buscar);
routes.post("/CentroCusto/Atualizar/",CentroCustoController.update);




module.exports = routes;