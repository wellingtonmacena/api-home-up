const connection = require("../config/connection");

module.exports = {
  async create(req, res) {
    const { nomeEmpresa, cnpj, mercadoAtuacao } = req.body;

    try {
      const response = await connection("empresa").insert({
        nomeEmpresa,
        cnpj,
        mercadoAtuacao,
      });

      return res.json({ message: "Registro inserido com sucesso" });
    } catch (error) {
      return res.json({ message: "Ocorreu um erro: " + error });
    }
  },

  async index(req, res) {
    const response = await connection("Empresa").select("*");

    return res.json(response);
  },

  async show(req, res) {
    const { idEmpresa } = req.params;

    const response = await connection.select("*").from("Empresa").where({
      idEmpresa,
    });

    return res.json(response);
  },
};
