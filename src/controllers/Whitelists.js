const connection = require("../config/connection");

module.exports = {
  async create(req, res) {
    const { aplicacao, fkFuncionario } = req.body;
    try {
      let response = await connection("whitelist")
        .where({
          fkFuncionario,
        })
        .where("aplicacao", aplicacao)
        .select("*");

      if (response.length > 0) {
        return res.json({
          message: "Funcionário já possui essa aplicação em sua whitelist",
        });
      } else {
        response = await connection("whitelist").insert({
          aplicacao,
          fkFuncionario,
        });

        return res.json({ message: "Registro inserido com sucesso" });
      }
    } catch (error) {
      return res.json({ message: "Ocorreu um erro: " + error });
    }
  },

  async index(req, res) {
    const response = await connection("whitelist").select("*");

    return res.json(response);
  },

  async show(req, res) {
    const { idFuncionario } = req.params;
    const apps = [];

    const response = await connection("whitelist")
      .select("aplicacao")
      .where("fkFuncionario", idFuncionario);

    response.map((app) => {
      const appValue = Object.values(app);
      apps.push(appValue[0]);
    });

    return res.json(apps);
  },

  async delete(req, res) {
    const { aplicacao, fkFuncionario } = req.body;

    try {
      const response = await connection("whitelist")
        .where({
          aplicacao,
        })
        .where({
          fkFuncionario,
        })

        .delete("*");

      return res.json({
        message: "Aplicação foi excluida da whitelist do funcionario",
      });
    } catch (err) {
      return res.json({ message: "Ocorreu um erro: " + err });
    }
  },
};
