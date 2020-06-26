const connection = require("../config/connection");

module.exports = {
  async index(req, res) {
    const { fkGestor } = req.params;

    const maquinas = await connection("maquina").select("*");
    const funcionarios = await connection("funcionario")
      .select("*")
      .where("fkGestor", fkGestor);

    const maquinasFiltradas = maquinas.filter((maquina) => {
      return funcionarios.find(
        (funcionario) => funcionario.idFuncionario === maquina.fkFuncionario
      );
    });

    const response = maquinasFiltradas.map((maquina) => {
      const { fkFuncionario, ...resto } = maquina;
      const { nomeFuncionario } = funcionarios.find(
        (funcionario) => funcionario.idFuncionario === fkFuncionario
      );

      return { ...resto, nomeFuncionario };
    });

    return res.json(response);
  },

  async show(req, res) {
    const { idMaquina } = req.params;

    const response = await connection("maquina").select("*").where({
      idMaquina,
    });

    return res.json(response);
  },
};
