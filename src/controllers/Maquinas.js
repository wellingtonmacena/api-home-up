const connection = require("../config/connection");

module.exports = {
  async byFuncionario(req, res) {
    const { idFuncionario } = req.params;

    const maquinas = await connection("maquina")
      .select("*")
      .where("fkFuncionario", Number(idFuncionario));

    const idsMaquinas = maquinas.map(function (maquina) {
      const { idMaquina } = maquina;

      return idMaquina;
    });

    return res.json(idsMaquinas);
  },

  async show(req, res) {
    const { idsMaquinas } = req.params;
    const ids = idsMaquinas.split(";");

    const maquinas = await connection("maquina").select("*");

    const response = maquinas.filter((maquina) => {
      return ids.includes(maquina.idMaquina + "");
    });

    return res.json(response);
  },

  async countMaquinas(req, res) {
    const { fkGestor } = req.params;

    const funcionarios = await connection("funcionario")
      .select("*")
      .where("fkGestor", fkGestor);

    const idsFuncionarios = funcionarios.map(
      ({ idFuncionario }) => idFuncionario
    );

    const maquinas = await connection("maquina").select("*");

    const maquinasFiltradas = maquinas.filter(({ fkFuncionario }) =>
      idsFuncionarios.includes(fkFuncionario)
    );

    return res.json({ qtdMaquinas: maquinasFiltradas.length });
  },
};
