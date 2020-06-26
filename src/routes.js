const express = require("express");
const routes = express.Router();

const Funcionario = require("./controllers/Funcionarios");
const Empresa = require("./controllers/Empresas");
const Gestor = require("./controllers/Gestores");
const Log = require("./controllers/Logs");
const Maquina = require("./controllers/Maquinas");
const Whitelist = require("./controllers/Whitelists");

routes.get("/funcionarios/:fkGestor", Funcionario.index);
routes.get("/funcionarios/:idFuncionario", Funcionario.show);
routes.post("/funcionarios", Funcionario.create);

routes.get("/empresas", Empresa.index);
routes.get("/empresas/:idEmpresa", Empresa.show);
routes.post("/empresas", Empresa.create);

routes.get("/gestores", Gestor.index);
routes.get("/gestores/:idGestor", Gestor.show);
routes.post("/gestores", Gestor.create);

routes.get("/logs", Log.index);
routes.get("/logs/:idLog", Log.show);

routes.get("/maquinas/:fkGestor", Maquina.index);
routes.get("/maquinas/:idMaquina", Maquina.show);

routes.get("/whitelists", Whitelist.index);
routes.get("/whitelists/:idFuncionario", Whitelist.show);
routes.post("/whitelists", Whitelist.create);
routes.delete("/whitelists", Whitelist.delete);

module.exports = routes;
