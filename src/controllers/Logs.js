const dayjs = require("dayjs");

const connection = require("../config/connection");

module.exports = {
  async report(req, res) {
    const { startDate, endDate, idMaquina } = req.params;

    const logs = await connection("logs")
      .select("*")
      .where("dataHora", ">=", `${startDate}T00:00:00Z`)
      .where("dataHora", "<=", `${endDate}T00:00:00Z`)
      .where("fkMaquina", idMaquina);

    const logsMapeados = logs.map(
      ({
        fkMaquina,
        dataHora,
        porcentUsoCpu,
        porcentUsoHd,
        porcentUsoRam,
        ...resto
      }) => ({
        ...resto,
        porcentUsoCpu: porcentUsoCpu * 100,
        porcentUsoHd: porcentUsoHd * 100,
        porcentUsoRam: porcentUsoRam * 100,
        dataHora: dayjs(dataHora).format("DD/MM/YYYY - hh:mm:ss"),
      })
    );

    return res.json(logsMapeados);
  },

  async byMaquina(req, res) {
    const { idsMaquinas } = req.params;
    const ids = idsMaquinas.split(";");
    const logs = await connection("logs").select("*");
    const logsFiltrados = ids.reduce(function (acumulador, id) {
      return {
        ...acumulador,
        [id]: logs
          .filter(({ fkMaquina }) => fkMaquina + "" === id)
          .slice(0, 10)
          .map(
            ({
              fkMaquina,
              dataHora,
              porcentUsoCpu,
              porcentUsoHd,
              porcentUsoRam,
              ...resto
            }) => ({
              ...resto,
              porcentUsoCpu: porcentUsoCpu * 100,
              porcentUsoHd: porcentUsoHd * 100,
              porcentUsoRam: porcentUsoRam * 100,
              dataHora: dayjs(dataHora).format("DD/MM/YYYY - hh:mm:ss"),
            })
          ),
      };
    }, {});

    return res.json(logsFiltrados);
  },

  async index(req, res) {
    const response = await connection("logs").select("*");

    return res.json(response);
  },

  async show(req, res) {
    const { idLog } = req.params;

    const logs = await connection("logs").select("*").where({
      idLog,
    });

    const response = logs.map((log) => {
      const { fkMaquina, ...resto } = log;

      return { ...resto };
    });

    return res.json(response);
  },
};
