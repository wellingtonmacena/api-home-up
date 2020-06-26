const connection = require("../config/connection");

module.exports = {
  async create(req, res) {
    const {
      nomeFuncionario,
      cpfFuncionario,
      cargo,
      salario,
      expediente,
      emailFuncionario,
      senhaFuncionario,
      fkGestor,
    } = req.body;
    try {
      await connection("funcionario").insert({
        nomeFuncionario,
        cpfFuncionario,
        cargo,
        salario,
        expediente,
        emailFuncionario,
        senhaFuncionario,
        fkGestor,
      });

      return res.json({ message: "Registro inserido com sucesso" });
    } catch (error) {
      return res.json({ message: "Ocorreu um erro: " + error });
    }
  },

  async index(req, res) {
    const { fkGestor } = req.params;

    const funcionarios = await connection("funcionario")
      .select("*")
      .where("fkGestor", fkGestor);

    const response = funcionarios.map((funcionario) => {
      const {
        cpfFuncionario,
        senhaFuncionario,
        fkGestor,
        salario,
        ...resto
      } = funcionario;

      return { ...resto };
    });

    return res.json(response);
  },

  async show(req, res) {
    const { idFuncionario } = req.params;
    const response = await connection("funcionario")
      .select("*")
      .where("idFuncionario", idFuncionario)
      .first();

    return res.json(response);
  },
};
