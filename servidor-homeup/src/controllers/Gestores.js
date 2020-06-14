const connection = require("../config/connection")
const { create, index, show } = require("./Empresas")

module.exports = {

    async create(req, res) {

        try {
            const { nomeGestor, cpfGestor, fkEmpresa, emailGestor, senhaGestor } = req.body

            const response = await connection("gestor")
                .insert({
                    nomeGestor,
                    cpfGestor,
                    fkEmpresa,
                    emailGestor,
                    senhaGestor

                })
            return res.json({ message: "Registro inserido com sucesso" })
        }

        catch (err) {
            return res.json({ message: "Ocorreu um erro: " + err })
        }
    },

    async index(req, res) {

        const response = await connection("gestor")
            .select("*")

        return res.json(response)
    },

    async show(req, res) {

        const { idGestor } = req.params

        const response = await connection("gestor")
            .select("*")
            .where({
                idGestor
            })

        return res.json(response)
    }
}