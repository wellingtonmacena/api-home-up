const connection = require('../config/connection')

module.exports = {

    async create(req, res) {

        const {totalCpu,totalRam, totalHd, fkFuncionario} = req.body;
        try {
            const response = await connection('maquina')
                .insert({

                    totalCpu,
                    totalRam,
                    totalHd,
                    fkFuncionario  
                })

            return res.json({message: "Registro inserido com sucesso"})
        }
        catch(error){
            return res.json({message: "Ocorreu um erro: "+ error})
        }        
    },

    async index(req, res) {

        const response = await connection('maquina')
        .select('*')

        return res.json(response)
    },

    async show(req, res) {

        const { idMaquina} = req.params

        const response = await connection('maquina')
            .select('*')
            .where({
                idMaquina
            })

        return res.json(response)
    }
}